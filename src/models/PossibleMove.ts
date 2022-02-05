import { Move } from './Move';
import { DiceIdx } from '../utils/utils';

export interface PossibleMove extends Move {
    diceIdx: DiceIdx;
}
