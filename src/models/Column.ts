// import { Player } from './enums/Player';
// import { Circle } from './Circle' ;
import { MapPlayerTo } from './MapPlayerTo';

export interface Column {
    circles: MapPlayerTo<number>
    // circles: MapPlayerTo<Circle[]>
}

// const col: Column = {
//     circles: {
//         [Player.PLAYER1]: 0,
//         [Player.PLAYER2]: 0,
//     }
// }