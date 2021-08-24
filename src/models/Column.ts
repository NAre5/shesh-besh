import { Player } from './enums/Player';

export interface Column {
    playersCircles: { [key in Player]: number }
}