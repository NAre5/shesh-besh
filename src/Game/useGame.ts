import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';

import { Move } from '../models/Move';
import { Column } from '../models/Column';
import { Player } from '../models/enums/Player';
import { MapPlayerTo } from '../models/MapPlayerTo';
import { columnsSplit, getRandomDice, playerDirection } from '../utils/utils';
import { addMove, GameState, setColumns } from '../redux/Game.slice';
import { AppDispatch, StoreState } from '../redux/store';

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


    const otherPlayer: Player = useMemo(() => (
        turnPlayer === Player.PLAYER1
            ? Player.PLAYER2
            : Player.PLAYER1
    ), [turnPlayer]);

    const isDicesDouble = useMemo<boolean>(() => dices[0] === dices[1], [dices])

    const turnPlayerNeedToReturn = useMemo<boolean>(() => (
        circlesEaten[turnPlayer] > 0
    ), [circlesEaten, turnPlayer]);
    //#endregion

    const onCircleClick = (selectedColumnIndex: number) => {

        console.log('start good');

        const currentDice = isDicesDouble ? dices[0] : dices[moves.length];

        const endIndex = selectedColumnIndex + playerDirection[turnPlayer] * currentDice;

        //TODO: if end index is one of ends colunms

        const otherPlayerCirclesInDestination = columns[endIndex].circles[otherPlayer];

        if (otherPlayerCirclesInDestination > 1) return;

        console.log('end good');

        const newMove: Move = {
            startIndex: selectedColumnIndex,
            endIndex,
        }

        let newColumns: Column[] = [...columns]
        const previousStartColumn = columns[newMove.startIndex]
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

        if (otherPlayerCirclesInDestination === 1) {
            newColumns[newMove.endIndex] = {
                circles: {
                    [turnPlayer]: newColumns[newMove.endIndex].circles[turnPlayer],
                    [otherPlayer]: newColumns[newMove.endIndex].circles[otherPlayer] - 1,
                } as MapPlayerTo<number>
            };

            const previousOtherPlayerHoleColumn = columns[columnsSplit[otherPlayer].hole]
            console.log({
                previousOtherPlayerHoleColumn
            });
            newColumns[columnsSplit[otherPlayer].hole] = {
                circles: {
                    [turnPlayer]: previousOtherPlayerHoleColumn.circles[turnPlayer] + 1,
                    [otherPlayer]: previousOtherPlayerHoleColumn.circles[otherPlayer],
                } as MapPlayerTo<number>
            }
            console.log({
                laterOtherPlayerHoleColumn: newColumns[columnsSplit[otherPlayer].hole]
            });
        }

        dispatch(addMove(newMove));
        dispatch(setColumns(newColumns));
    }

    const onColumnClick = (selectedColumnIndex: number) => {
        console.log('column clicked');

        if (!turnPlayerNeedToReturn) return;

        onCircleClick(columnsSplit[otherPlayer].hole);

        // setColumns(prev => columns.map((column, index) => index === columnsSplit[otherPlayer].hole//TODO: return
        //     ? {
        //         circles: {
        //             [turnPlayer]: column.circles[turnPlayer] - 1,
        //             [otherPlayer]: column.circles[otherPlayer],
        //         } as MapPlayerTo<number>
        //     }
        //     : column
        // ))
    }

    // const onCircleHover

    return {
        turnPlayer,
        columns,
        moves,
        dices,
        circlesEaten,
        onCircleClick,
        onColumnClick,
        turnPlayerNeedToReturn,
        // switchDices
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