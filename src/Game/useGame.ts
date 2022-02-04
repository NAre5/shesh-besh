import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Move } from '../models/Move';
import { Column } from '../models/Column';
import { Player } from '../models/enums/Player';
import { MapPlayerTo } from '../models/MapPlayerTo';
import { PossibleMove } from '../models/PossibleMove';
import { AppDispatch, StoreState } from '../redux/store';
import { addMove, GameState, swapDices } from '../redux/Game.slice';
import { columnsBoundries, columnsSplit, diceIdxs, getOtherPlayer, isColumnInHome, isGameColumn, playerDirection } from '../utils/utils';

export const useGame = () => {
    //#region states
    // const [dicesDirection, setDicesDirection] = useState<1 | -1>(1);//TODO?
    const turnPlayer = useSelector<StoreState, GameState['turnPlayer']>(store => store.game.turnPlayer)
    const columns = useSelector<StoreState, GameState['columns']>(store => store.game.columns)
    const moves = useSelector<StoreState, GameState['moves']>(store => store.game.moves)
    const dices = useSelector<StoreState, GameState['dices']>(store => store.game.dices)
    //#endregion

    const dispatch: AppDispatch = useDispatch();

    //#region memos
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

    const turnPlayerColumnsIds = useMemo<number[]>(() => (
        columns
            .map((column, index) => ({ ...column, index }))
            .filter(column => column.circles[turnPlayer] > 0)
            .map(column => column.index)
    ), [columns, turnPlayer]);

    const currDiceIdx = useMemo<0 | 1>(() => (
        Math.floor(moves.length / (dices[0] === dices[1] ? 2 : 1)) as 0 | 1
    ), [moves, dices]);

    const isEndPhase = useMemo<boolean>(() => (
        turnPlayerColumnsIds.every(turnPlayerColumnsId => isColumnInHome(turnPlayer, turnPlayerColumnsId))
    ), [turnPlayerColumnsIds, turnPlayer]);

    useEffect(() => {
        console.log({ isEndPhase });
    }, [isEndPhase]);

    const gameEnded = useMemo<boolean>(() => (
        turnPlayerColumnsIds.length === 1 && turnPlayerColumnsIds[0] === columnsSplit[turnPlayer].hole
    ), [turnPlayerColumnsIds, turnPlayer]);

    useEffect(() => {
        console.log({ gameEnded });
    }, [gameEnded]);


    // const possibleMoves = useMemo<{ [diceIndex in 0 | 1]: { startIndex: number }[] }>(() => {
    const possibleMoves = useMemo<PossibleMove[]>(() => {
        // include double situation
        return turnPlayerColumnsIds.reduce<PossibleMove[]>((currPossibleMoves, columnId) => {
            diceIdxs
                .slice(currDiceIdx)
                .forEach(diceIdx => {
                    if (columnId === columnsSplit[turnPlayer].hole) return currPossibleMoves;

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

                        } else {
                            console.log(
                                otherPlayerCirclesInDestination === undefined,
                                playerDirection[turnPlayer] > 1,
                                Math.min(...turnPlayerColumnsIds),
                                Math.max(...turnPlayerColumnsIds)
                            );

                            if (otherPlayerCirclesInDestination === undefined
                                && columnId === (playerDirection[turnPlayer] === 1
                                    ? Math.min(...turnPlayerColumnsIds)
                                    : Math.max(...turnPlayerColumnsIds)
                                )
                            ) {
                                currPossibleMoves.push({
                                    startIndex: columnId,
                                    endIndex: columnsSplit[turnPlayer].hole,
                                    diceIdx,
                                    circleEaten: false
                                });
                            }
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
        }, []);
    }, [turnPlayerColumnsIds, turnPlayer, dices, currDiceIdx, isEndPhase]);

    useEffect(() => {
        console.log({ possibleMoves });
    }, [possibleMoves]);

    // const possibleEndColumns = useMemo<number[]>(() => (
    //     possibleMoves.map(possibleMove => possibleMove.endIndex)
    // ), [possibleMoves]);

    // const  possibleStartColumnsToMove = useMemo<

    // const myTurn = useMemo<boolean>(()=>turnPlayer === Players[myUserId])

    //#endregion

    // maybe useCallback
    const onCircleClick = (selectedColumnIndex: number, diceIndex?: 0 | 1) => {

        //TODO: if end index is one of ends colunms
        //TODO: if end index is passed hole column

        const newMove = possibleMoves.find(possibleMove =>
            (possibleMove.startIndex === selectedColumnIndex)
            && (isDicesDouble || (possibleMove.diceIdx === (diceIndex || moves.length)))
        );

        if (!newMove) return;

        let newColumns: Column[] = [...columns];
        const previousStartColumn = columns[newMove.startIndex];
        newColumns[newMove.startIndex] = {
            circles: {
                [turnPlayer]: previousStartColumn.circles[turnPlayer] - 1,
                [otherPlayer]: previousStartColumn.circles[otherPlayer],
            } as MapPlayerTo<number>
        };

        const previousEndColumn = columns[newMove.endIndex]
        newColumns[newMove.endIndex] = {
            circles: {
                [turnPlayer]: previousEndColumn.circles[turnPlayer] + 1,
                [otherPlayer]: previousEndColumn.circles[otherPlayer],
            } as MapPlayerTo<number>
        };

        if (newMove.circleEaten) {
            newColumns[newMove.endIndex] = {
                circles: {
                    [turnPlayer]: newColumns[newMove.endIndex].circles[turnPlayer],
                    [otherPlayer]: newColumns[newMove.endIndex].circles[otherPlayer] - 1,
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
        console.log('column clicked');

        if (!turnPlayerNeedToReturn) return;
        const otherPlayerHoleIndex = columnsSplit[getOtherPlayer(turnPlayer)].hole;
        // const usedDice = Math.abs(selectedColumnIndex - otherPlayerHoleIndex);
        const usedDiceValue = (selectedColumnIndex - otherPlayerHoleIndex) / playerDirection[turnPlayer];
        const usedDice = dices.findIndex(diceValue => diceValue === usedDiceValue) as (0 | 1);

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


// useEffect(() => {
//     console.log({ turnPlayerNeedToReturn });
// }, [turnPlayerNeedToReturn])

// const currentTurn = useMemo<GameTurn>(() => ({
//     turnPlayer,
//     columns,
//     moves,
//     dices,
//     circlesEaten
// }), [turnPlayer, columns, dices, circlesEaten])

// useEffect(() => {
//     console.log({ circlesEaten });
// }, [circlesEaten])

// useEffect(() => {
//     console.log(dices);
// }, [dices])

// useEffect(() => {
//     console.log(columns);
// }, [columns])