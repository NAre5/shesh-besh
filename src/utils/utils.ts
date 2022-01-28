// import { v4 as uuidv4 } from 'uuid';
import { Circle } from '../models/Circle';

import { Column } from '../models/Column';
import { Player } from '../models/enums/Player';


export const getRandomDice = (): number => (
    Math.floor(Math.random() * 6 + 1)
);

export const columnsSplit = {
    [Player.PLAYER1]: {
        outerStart: 13,
        outerEnd: 18,
        homeStart: 19,
        homeEnd: 24,
        hole: 25,
    },
    [Player.PLAYER2]: {
        outerStart: 12,
        outerEnd: 7,
        homeStart: 6,
        homeEnd: 1,
        hole: 0,
    },
}

export const playerDirection: { [key in Player]: number } = {
    [Player.PLAYER1]: 1,
    [Player.PLAYER2]: -1,
}

// const generateCircles = (amount: number): Circle[] => (
//     Array.from({ length: amount }).map(_ => ({ id: uuidv4() }))
// );

export const getInitialColumns = (): Column[] => {
    const initialColumns: Column[] = Array.from({ length: 26 }).map(
        (_, index) => ({
            circles: {
                [Player.PLAYER1]: 0,
                [Player.PLAYER2]: 0,
            }
        })
    );
    initialColumns[columnsSplit[Player.PLAYER2].homeEnd].circles[Player.PLAYER1] = 2;
    initialColumns[columnsSplit[Player.PLAYER2].homeStart].circles[Player.PLAYER2] = 5;
    initialColumns[columnsSplit[Player.PLAYER2].outerEnd + 1].circles[Player.PLAYER2] = 3;
    initialColumns[columnsSplit[Player.PLAYER2].outerStart].circles[Player.PLAYER1] = 5;
    initialColumns[columnsSplit[Player.PLAYER1].outerStart].circles[Player.PLAYER2] = 5;
    initialColumns[columnsSplit[Player.PLAYER1].outerEnd - 1].circles[Player.PLAYER1] = 3;
    initialColumns[columnsSplit[Player.PLAYER1].homeStart].circles[Player.PLAYER1] = 5;
    initialColumns[columnsSplit[Player.PLAYER1].homeEnd].circles[Player.PLAYER2] = 2;

    return initialColumns;
};
