import { useMemo, useState } from 'react';
import { Column } from '../models/Column';
import { Player } from '../models/enums/Player';
import { Dices, GameTurn } from '../models/GameTurn';
import { Move } from '../models/Move';
import { getInitialColumns, getRandomDice } from '../utils/utils';

export const useGame = () => {

    const [playerName, setPlayerName] = useState<string>('naruto');//TODO: make playerName changable
    const [otherPlayerName, setOtherPlayerName] = useState<string>('sasuke');
    // const [gameHistory, setGameHistory] = useState<GameTurn[]>([]);

    const [turnPlayer, setTurnPlayer] = useState<Player>(Player.PLAYER1);
    const [columns, setColumns] = useState<Column[]>(getInitialColumns());
    const [moves, setMoves] = useState<Move[]>([])
    const [dices, setDices] = useState<Dices>([getRandomDice(), getRandomDice()]);
    const [circlesEaten, setCirclesEaten] = useState({
        [Player.PLAYER1]: 0,
        [Player.PLAYER2]: 0,
    });

    // const currentTurn = useMemo<GameTurn>(() => ({
    //     turnPlayer,
    //     columns,
    //     moves,
    //     dices,
    //     circlesEaten
    // }), [turnPlayer, columns, dices, circlesEaten])


    const onCircleClick = (index: number) => {

    }

    return {
        turnPlayer,
        columns,
        moves,
        dices,
        circlesEaten
    }
}