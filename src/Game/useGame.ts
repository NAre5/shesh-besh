import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Move } from '../models/Move';
import { Column } from '../models/Column';
import { Player } from '../models/enums/Player';
import { MapPlayerTo } from '../models/MapPlayerTo';
import { AppDispatch, StoreState } from '../redux/store';
import { addMove, GameState, setColumns, switchDices } from '../redux/Game.slice';
import { columnsBoundries, columnsSplit, getOtherPlayer, playerDirection } from '../utils/utils';

export const useGame = () => {
    //#region states 
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
    //#endregion

    const getMoveParams = useCallback((startIndex: number, diceIndex?: 0 | 1) => {
        const currentDice = (diceIndex !== undefined) ? dices[diceIndex] : (isDicesDouble ? dices[0] : dices[moves.length]);
        const endIndex = startIndex + playerDirection[turnPlayer] * currentDice;
        const otherPlayerCirclesInDestination = ((endIndex > columnsBoundries.max) || (endIndex < columnsBoundries.min))
            ? undefined
            : columns[endIndex].circles[otherPlayer];

        return { endIndex, otherPlayerCirclesInDestination };
    }, [isDicesDouble, dices, turnPlayer, otherPlayer, columns])

    const onCircleClick = (selectedColumnIndex: number, diceIndex?: 0 | 1) => {

        // console.log('start good');

        // const currentDice = isDicesDouble ? dices[0] : dices[moves.length];
        // const endIndex = selectedColumnIndex + playerDirection[turnPlayer] * currentDice;
        // const otherPlayerCirclesInDestination = columns[endIndex].circles[otherPlayer];
        const { endIndex, otherPlayerCirclesInDestination } = getMoveParams(selectedColumnIndex, diceIndex);

        //TODO: if end index is one of ends colunms
        //TODO: if end index is passed hole column

        const endIndexIsHole = ((endIndex === columnsBoundries.min) || (endIndex === columnsBoundries.max));
        const endIndexOutOfBounds = otherPlayerCirclesInDestination === undefined;
        const otherPlayerRuleEndIndexColumn = (otherPlayerCirclesInDestination || 0) > 1;

        if (endIndexIsHole || endIndexOutOfBounds || otherPlayerRuleEndIndexColumn)
            return;

        // if (endIndex === columnsBoundries.min || endIndex === columnsBoundries.max) return;
        // if (otherPlayerCirclesInDestination === undefined) return;
        // if (otherPlayerCirclesInDestination > 1) return;

        // console.log('end good');

        const newMove: Move = {
            startIndex: selectedColumnIndex,
            endIndex,
        }

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


        const isEatMove = otherPlayerCirclesInDestination === 1;
        if (isEatMove) {
            newColumns[newMove.endIndex] = {
                circles: {
                    [turnPlayer]: newColumns[newMove.endIndex].circles[turnPlayer],
                    [otherPlayer]: newColumns[newMove.endIndex].circles[otherPlayer] - 1,
                } as MapPlayerTo<number>
            };

            const turnPlayerHoleColumn = columns[columnsSplit[turnPlayer].hole]
            // console.log({
            //     previousOtherPlayerHoleColumn: turnPlayerHoleColumn
            // });
            newColumns[columnsSplit[turnPlayer].hole] = {
                circles: {
                    [turnPlayer]: turnPlayerHoleColumn.circles[turnPlayer],
                    [otherPlayer]: turnPlayerHoleColumn.circles[otherPlayer] + 1,
                } as MapPlayerTo<number>
            }
            // console.log({
            //     laterOtherPlayerHoleColumn: newColumns[columnsSplit[otherPlayer].hole]
            // });
        }

        if (diceIndex !== undefined && !isDicesDouble && diceIndex !== moves.length)
            dispatch(switchDices());

        dispatch(addMove({ newMove, newColumns }));

        // dispatch(addMove(newMove));
        // dispatch(setColumns(newColumns));
    }

    const canResurrectCircleToColumns = useMemo<number[] | undefined>(() => {
        if (!turnPlayerNeedToReturn) return undefined

        const otherPlayerHoleIndex = columnsSplit[getOtherPlayer(turnPlayer)].hole;
        const movesParams = [getMoveParams(otherPlayerHoleIndex, 0), getMoveParams(otherPlayerHoleIndex, 1)];

        return movesParams
            .filter(_moveParams => _moveParams.otherPlayerCirclesInDestination! <= 1)
            .map(_moveParams => _moveParams.endIndex);
    }, [turnPlayer, turnPlayerNeedToReturn, getMoveParams]);

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

    // const onCircleHover

    return {
        turnPlayer,
        columns,
        moves,
        dices,
        circlesEaten,
        onCircleClick,
        resurrectCircleToColumn,
        turnPlayerNeedToReturn,
        getMoveParams,
        canResurrectCircleToColumns,
        canResurrectCircleToPlayerColumn
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