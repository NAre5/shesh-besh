import { GameTurn } from './GameTurn';

export interface Game {
    player1_name: string;
    player2_name: string;
    gameHistory: GameTurn[];
}