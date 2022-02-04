import { Move } from './Move';

export interface PossibleMove extends Move {
    diceIdx: 0 | 1;
}
