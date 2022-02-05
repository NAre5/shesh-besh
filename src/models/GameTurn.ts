import { Move } from './Move';
import { Column } from './Column';
import { Player } from './enums/Player';

// export interface CirclesEaten {
//     [Player.PLAYER1]: number;
//     [Player.PLAYER2]: number;
// };
export type CirclesEaten = {
    [key in Player]: number;
};

export type Dices = [number, number];

export interface GameTurn {
    turnPlayer: Player;
    columns: Column[];
    moves: Move[];
    dices: Dices;
    circlesEaten: CirclesEaten;
    // isFinished: boolean;
}
