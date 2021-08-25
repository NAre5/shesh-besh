import { Column } from '../models/Column';
import { Player } from '../models/enums/Player';

export const getRandomDice = (): number => (
    Math.floor(Math.random() * 6 + 1)
)

export const getInitialColumns = (): Column[] => {
    const initialColumns: Column[] = Array.from({ length: 24 }).map(
        (_, index) => ({
            circles: {
                [Player.PLAYER1]: 0,
                [Player.PLAYER2]: 0,
            }
        })
    );
    initialColumns[0].circles[Player.PLAYER1] = 2;
    initialColumns[5].circles[Player.PLAYER2] = 5;
    initialColumns[7].circles[Player.PLAYER2] = 3;
    initialColumns[11].circles[Player.PLAYER1] = 5;
    initialColumns[12].circles[Player.PLAYER2] = 5;
    initialColumns[16].circles[Player.PLAYER1] = 3;
    initialColumns[18].circles[Player.PLAYER1] = 5;
    initialColumns[23].circles[Player.PLAYER2] = 2;

    return initialColumns;
};

export const playerDirection: { [key in Player]: number } = {
    [Player.PLAYER1]: 1,
    [Player.PLAYER2]: -1,
}
