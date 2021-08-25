import { Player } from './enums/Player';
import { MapPlayerTo } from './MapPlayerTo';

export interface Column {
    circles: MapPlayerTo<number>
}

const col: Column = {
    circles: {
        [Player.PLAYER1]: 0,
        [Player.PLAYER2]: 0,
    }
}