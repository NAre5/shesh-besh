import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Column } from 'models/Column';
import { Player } from 'models/enums/Player';
import { MapPlayerTo } from 'models/MapPlayerTo';
import { PossibleMove } from 'models/PossibleMove';
import { AppDispatch, StoreState } from 'redux/store';
import { addMove, GameState, swapDices } from 'redux/Game.slice';
import { columnsSplit, DiceIdx, diceIdxs, getOtherPlayer, isColumnInHome, isGameColumn, playerDirection } from 'utils/utils';

export const useGame = () => {
    //#region states
    // const [dicesDirection, setDicesDirection] = useState<1 | -1>(1);//TODO?
    const turnPlayer = useSelector<StoreState, GameState['turnPlayer']>(store => store.game.turnPlayer)
    const columns = useSelector<StoreState, GameState['columns']>(store => store.game.columns)
    const moves = useSelector<StoreState, GameState['moves']>(store => store.game.moves)
    const dices = useSelector<StoreState, GameState['dices']>(store => store.game.dices)
    //#endregion

    const dispatch: AppDispatch = useDispatch();

    const circlesEaten = useMemo<MapPlayerTo<number>>(() => ({
        [Player.PLAYER1]: columns[columnsSplit[Player.PLAYER2].hole].circles[Player.PLAYER1],
        [Player.PLAYER2]: columns[columnsSplit[Player.PLAYER1].hole].circles[Player.PLAYER2],
    }), [columns])


    const otherPlayer = useMemo<Player>(() => getOtherPlayer(turnPlayer), [turnPlayer]);

    const isDicesDouble = useMemo<boolean>(() => dices[0] === dices[1], [dices])

    const turnPlayerNeedToReturn = useMemo<boolean>(() => (
        circlesEaten[turnPlayer] > 0
    ), [circlesEaten, turnPlayer]);

    // const getMoveParams = useCallback((startIndex: number, diceIndex?: 0 | 1) => {
    //     const currentDice = (diceIndex !== undefined)
    //         ? dices[diceIndex]
    //         : (isDicesDouble ? dices[0] : dices[moves.length]);
    //     const endIndex = startIndex + playerDirection[turnPlayer] * currentDice;
    //     const otherPlayerCirclesInDestination =
    //         !isGameColumn(endIndex)
    //             ? undefined
    //             : columns[endIndex].circles[otherPlayer];

    //     return { endIndex, otherPlayerCirclesInDestination };
    // }, [isDicesDouble, dices, turnPlayer, otherPlayer, columns]);
    //TODO: maybe include useRefs like Ben Awad did

    const getTurnPlayerColumnsIdsFromColumns = (_columns: Column[]): number[] => (
        _columns
            .map((column, index) => ({ ...column, index }))
            .filter(column => column.circles[turnPlayer] > 0)
            .map(column => column.index)
    )

    const turnPlayerColumnsIds = useMemo<number[]>(() => (
        getTurnPlayerColumnsIdsFromColumns(columns)
    ), [columns, turnPlayer]);

    const currDiceIdx = useMemo<DiceIdx>(() => (
        Math.floor(moves.length / (dices[0] === dices[1] ? 2 : 1)) as DiceIdx
    ), [moves, dices]);

    const isEndPhase = useMemo<boolean>(() => (
        turnPlayerColumnsIds.every(turnPlayerColumnsId => isColumnInHome(turnPlayer, turnPlayerColumnsId))
    ), [turnPlayerColumnsIds, turnPlayer]);

    const gameEnded = useMemo<boolean>(() => (
        turnPlayerColumnsIds.length === 1 && turnPlayerColumnsIds[0] === columnsSplit[turnPlayer].hole
    ), [turnPlayerColumnsIds, turnPlayer]);



    const getColumnsAfterPossibleMove = (possibleMove: PossibleMove): Column[] => {
        let newColumns: Column[] = [...columns];
        const previousStartColumn = columns[possibleMove.startIndex];
        newColumns[possibleMove.startIndex] = {
            circles: {
                [turnPlayer]: previousStartColumn.circles[turnPlayer] - 1,
                [otherPlayer]: previousStartColumn.circles[otherPlayer],
            } as MapPlayerTo<number>
        };

        const previousEndColumn = columns[possibleMove.endIndex]
        newColumns[possibleMove.endIndex] = {
            circles: {
                [turnPlayer]: previousEndColumn.circles[turnPlayer] + 1,
                [otherPlayer]: previousEndColumn.circles[otherPlayer],
            } as MapPlayerTo<number>
        };

        if (possibleMove.circleEaten) {
            newColumns[possibleMove.endIndex] = {
                circles: {
                    [turnPlayer]: newColumns[possibleMove.endIndex].circles[turnPlayer],
                    [otherPlayer]: newColumns[possibleMove.endIndex].circles[otherPlayer] - 1,
                } as MapPlayerTo<number>
            };

            const turnPlayerHoleColumn = columns[columnsSplit[turnPlayer].hole]
            newColumns[columnsSplit[turnPlayer].hole] = {
                circles: {
                    [turnPlayer]: turnPlayerHoleColumn.circles[turnPlayer],
                    [otherPlayer]: turnPlayerHoleColumn.circles[otherPlayer] + 1,
                } as MapPlayerTo<number>
            }
        }
        return newColumns;
    }

    const getPossibleMovesFromColumns = (_columns: Column[], availableDiceIdxs: DiceIdx[]): PossibleMove[] => {
        return getTurnPlayerColumnsIdsFromColumns(_columns)
            .reduce<PossibleMove[]>((currPossibleMoves, columnId) => {
                availableDiceIdxs
                    .forEach(diceIdx => {
                        if (columnId === columnsSplit[turnPlayer].hole)
                            return currPossibleMoves;

                        if (turnPlayerNeedToReturn && columnId !== columnsSplit[otherPlayer].hole)
                            return currPossibleMoves;

                        const endIndex = columnId + playerDirection[turnPlayer] * dices[diceIdx];
                        const otherPlayerCirclesInDestination =
                            !isGameColumn(endIndex)
                                ? undefined
                                : columns[endIndex].circles[otherPlayer];

                        if (isEndPhase) {
                            if (endIndex === columnsSplit[turnPlayer].hole) {
                                currPossibleMoves.push({
                                    startIndex: columnId,
                                    endIndex,
                                    diceIdx,
                                    circleEaten: false
                                });
                            } else if (otherPlayerCirclesInDestination === undefined
                                && (columnId === (
                                    (playerDirection[turnPlayer] === 1
                                        ? Math.min(...turnPlayerColumnsIds)
                                        : Math.max(...turnPlayerColumnsIds)
                                    )
                                ))
                            ) {
                                currPossibleMoves.push({
                                    startIndex: columnId,
                                    endIndex: columnsSplit[turnPlayer].hole,
                                    diceIdx,
                                    circleEaten: false
                                });
                            }
                        }

                        if (otherPlayerCirclesInDestination !== undefined && otherPlayerCirclesInDestination <= 1) {
                            currPossibleMoves.push({
                                startIndex: columnId,
                                endIndex,
                                diceIdx,
                                circleEaten: otherPlayerCirclesInDestination === 1
                            });
                        }
                    })
                return currPossibleMoves;
            }, [])
    }

    const possibleMoves = useMemo<PossibleMove[]>(() => {

        //TODO: include double situation
        // check again double
        // 
        const allPossibleMoves = getPossibleMovesFromColumns(columns, diceIdxs.slice(currDiceIdx));

        if (moves.length > 0 || isDicesDouble || allPossibleMoves.length <= 1)
            return allPossibleMoves;

        const allPossibleMovesAfterMoves = allPossibleMoves
            .reduce<{ [PossibleMoveIndex: number]: PossibleMove[] }>(
                (currPossibleMovesAfterMoves, currPossibleMove, currPossibleMoveIndex) => {
                    const newColumns = getColumnsAfterPossibleMove(currPossibleMove);
                    const possibleMovesAfterMove = getPossibleMovesFromColumns(newColumns, [(currPossibleMove.diceIdx + 1) % 2 as DiceIdx]);
                    // return [...currPossibleMovesAfterMoves, ...possibleMovesAfterMove];
                    currPossibleMovesAfterMoves[currPossibleMoveIndex] = possibleMovesAfterMove;
                    return currPossibleMovesAfterMoves;
                }, []
            );

        if (Object.values(allPossibleMovesAfterMoves).every(
            allPossibleMovesAfterMove => allPossibleMovesAfterMove.length === 0)
        ) {
            const maxDiceValue = Math.max(...dices);
            return allPossibleMoves
                .filter(possibleMove => dices[possibleMove.diceIdx] === maxDiceValue);
        }
        //if move block future and others dont, remove blocking
        return allPossibleMoves
            .filter((_, possibleMoveIndex) => allPossibleMovesAfterMoves[possibleMoveIndex].length !== 0);//

    }, [turnPlayerColumnsIds, turnPlayer, dices, currDiceIdx, isEndPhase]);

    // const possibleEndColumns = useMemo<number[]>(() => (
    //     possibleMoves.map(possibleMove => possibleMove.endIndex)
    // ), [possibleMoves]);

    // const  possibleStartColumnsToMove = useMemo<

    // const myTurn = useMemo<boolean>(()=>turnPlayer === Players[myUserId])

    // maybe useCallback
    const onCircleClick = (selectedColumnIndex: number, diceIndex?: DiceIdx) => {

        //TODO: if end index is one of ends colunms
        //TODO: if end index is passed hole column

        const newMove = possibleMoves.find(possibleMove =>
            (possibleMove.startIndex === selectedColumnIndex)
            && (isDicesDouble || (possibleMove.diceIdx === (diceIndex || moves.length)))
        );

        if (!newMove) return;

        const newColumns = getColumnsAfterPossibleMove(newMove);

        if (diceIndex !== undefined && !isDicesDouble && diceIndex !== moves.length)
            dispatch(swapDices());

        dispatch(addMove({ newMove, newColumns }));

        // dispatch(addMove(newMove));
        // dispatch(setColumns(newColumns));
    }

    // const canResurrectCircleToColumns = useMemo<number[] | undefined>(() => {
    //     if (!turnPlayerNeedToReturn) return undefined

    //     const otherPlayerHoleIndex = columnsSplit[getOtherPlayer(turnPlayer)].hole;
    //     const movesParams = [getMoveParams(otherPlayerHoleIndex, 0), getMoveParams(otherPlayerHoleIndex, 1)];

    //     return movesParams
    //         .filter(_moveParams => _moveParams.otherPlayerCirclesInDestination! <= 1)
    //         .map(_moveParams => _moveParams.endIndex);
    // }, [turnPlayer, turnPlayerNeedToReturn, getMoveParams]);

    // const canResurrectCircleToPlayerColumn = useCallback((columnPlayer: Player, columnIndex: number) => (
    //     turnPlayer === columnPlayer && canResurrectCircleToColumns?.includes(columnIndex)
    // ), [turnPlayer, canResurrectCircleToColumns]);

    const canResurrectCircleToColumns = useMemo<number[] | undefined>(() => {
        if (!turnPlayerNeedToReturn) return undefined


        return possibleMoves
            .filter(possibleMove => possibleMove.startIndex === columnsSplit[otherPlayer].hole)
            .map(possibleMove => possibleMove.endIndex);
    }, [otherPlayer, turnPlayerNeedToReturn, possibleMoves]);

    const canResurrectCircleToPlayerColumn = useCallback((columnPlayer: Player, columnIndex: number) => (
        turnPlayer === columnPlayer && canResurrectCircleToColumns?.includes(columnIndex)
    ), [turnPlayer, canResurrectCircleToColumns]);

    const resurrectCircleToColumn = (selectedColumnIndex: number) => {
        if (!turnPlayerNeedToReturn) return;
        const otherPlayerHoleIndex = columnsSplit[getOtherPlayer(turnPlayer)].hole;
        // const usedDice = Math.abs(selectedColumnIndex - otherPlayerHoleIndex);
        const usedDiceValue = (selectedColumnIndex - otherPlayerHoleIndex) / playerDirection[turnPlayer];
        const usedDice = dices.findIndex(diceValue => diceValue === usedDiceValue) as DiceIdx;

        onCircleClick(columnsSplit[otherPlayer].hole, usedDice);
    }

    // useEffect ((len(moves) == 0) && (len(possibleMoves) == 0)) => switchTurn

    return {
        turnPlayer,
        columns,
        moves,
        dices,
        circlesEaten,
        onCircleClick,
        resurrectCircleToColumn,
        turnPlayerNeedToReturn,
        // getMoveParams,
        canResurrectCircleToColumns,
        canResurrectCircleToPlayerColumn,
        possibleMoves,
        currDiceIdx,
        gameEnded
    }
}
