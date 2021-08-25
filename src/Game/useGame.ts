import { useEffect, useMemo, useState } from 'react';
import { Column } from '../models/Column';
import { Player } from '../models/enums/Player';
import { Dices, GameTurn } from '../models/GameTurn';
import { MapPlayerTo } from '../models/MapPlayerTo';
import { Move } from '../models/Move';
import { columnsSplit, getInitialColumns, getRandomDice, playerDirection } from '../utils/utils';

export const useGame = () => {

    const [playersName, setPlayersName] = useState<MapPlayerTo<string>>({//TODO: make playerName changable
        [Player.PLAYER1]: 'naruto',
        [Player.PLAYER2]: 'sasuke',
    })
    // const [gameHistory, setGameHistory] = useState<GameTurn[]>([]);

    const [turnPlayer, setTurnPlayer] = useState<Player>(Player.PLAYER1);
    const [columns, setColumns] = useState<Column[]>(getInitialColumns());
    const [moves, setMoves] = useState<Move[]>([])
    const [dices, setDices] = useState<Dices>([getRandomDice(), getRandomDice()]);
    // const [circlesEaten, setCirclesEaten] = useState({
    //     [Player.PLAYER1]: 0,
    //     [Player.PLAYER2]: 0,
    // });

    const circlesEaten = useMemo<MapPlayerTo<number>>(() => ({
        [Player.PLAYER1]: columns[columnsSplit[Player.PLAYER2].hole].circles[Player.PLAYER1],
        [Player.PLAYER2]: columns[columnsSplit[Player.PLAYER1].hole].circles[Player.PLAYER2],
    }), [columns])

    useEffect(() => {
        console.log({ circlesEaten });
    }, [circlesEaten])

    useEffect(() => {
        console.log(dices);
    }, [dices])

    // useEffect(() => {
    //     console.log(columns);
    // }, [columns])

    const otherPlayer: Player = useMemo(() => (
        turnPlayer === Player.PLAYER1
            ? Player.PLAYER2
            : Player.PLAYER1
    ), [turnPlayer]);

    const isDicesDouble = useMemo<boolean>(() => dices[0] === dices[1], [dices])

    const turnPlayerNeedToReturn = useMemo<boolean>(() => (
        circlesEaten[turnPlayer] > 0
    ), [circlesEaten, turnPlayer])

    useEffect(() => {
        console.log({ turnPlayerNeedToReturn });
    }, [turnPlayerNeedToReturn])

    // const currentTurn = useMemo<GameTurn>(() => ({
    //     turnPlayer,
    //     columns,
    //     moves,
    //     dices,
    //     circlesEaten
    // }), [turnPlayer, columns, dices, circlesEaten])


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
            // newMove.circleEaten = true;
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

            // setCirclesEaten(prev => ({ ...prev, [otherPlayer]: prev[otherPlayer] + 1 }));
        }


        // add return from the dead moves
        setMoves(prev => [...prev, newMove]);
        setColumns(newColumns);
    }

    const onColumnClick = (selectedColumnIndex: number) => {
        console.log('column clicked');

        if (!turnPlayerNeedToReturn) return;

        onCircleClick(columnsSplit[otherPlayer].hole);

        setColumns(prev => columns.map((column, index) => index === columnsSplit[otherPlayer].hole
            ? {
                circles: {
                    [turnPlayer]: column.circles[turnPlayer] - 1,
                    [otherPlayer]: column.circles[otherPlayer],
                } as MapPlayerTo<number>
            }
            : column
        ))
    }

    const switchDices = () => {
        if (moves.length === 0 || isDicesDouble)
            setDices(prev => [prev[1], prev[0]]);
    }

    //switch players
    useEffect(() => {
        if (moves.length === (dices[0] === dices[1] ? 4 : 2)) {
            setTurnPlayer(otherPlayer);
            setMoves([]);
            setDices([getRandomDice(), getRandomDice()]);
        }
    }, [moves])

    return {
        turnPlayer,
        columns,
        moves,
        dices,
        circlesEaten,
        onCircleClick,
        onColumnClick,
        turnPlayerNeedToReturn,
        switchDices
    }
}