export interface Move {
    startIndex: number;
    endIndex: number;
    circleEaten?: {
        eatenIndex: number;
    }
}