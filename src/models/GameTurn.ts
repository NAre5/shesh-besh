import { Move } from './Move';
import { Player } from './enums/Player';

export interface GameTurn {
    turnPlayer: Player;
    moves?: Move[];
    dices: [number, number];
    isFinished: boolean;
}