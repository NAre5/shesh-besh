import { Column } from '../models/Column';
import { Player } from '../models/enums/Player';

export const getRandomDice = (): number => (
    Math.random() * 6 + 1
)

export const getInitialColumns = (): Column[] => {
    const initialColumns: Column[] = Array.from({ length: 24 }).map(
        (_, index) => ({
            playersCircles: {
                [Player.PLAYER1]: 0,
                [Player.PLAYER2]: 0,
            }
        })
    );
    initialColumns[0].playersCircles[Player.PLAYER1] = 2;
    initialColumns[5].playersCircles[Player.PLAYER2] = 5;
    initialColumns[7].playersCircles[Player.PLAYER2] = 3;
    initialColumns[11].playersCircles[Player.PLAYER1] = 5;
    initialColumns[12].playersCircles[Player.PLAYER2] = 5;
    initialColumns[16].playersCircles[Player.PLAYER1] = 3;
    initialColumns[18].playersCircles[Player.PLAYER1] = 5;
    initialColumns[23].playersCircles[Player.PLAYER2] = 2;

    return initialColumns;
};
