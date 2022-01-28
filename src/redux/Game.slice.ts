import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Column } from '../models/Column'
import { Player } from '../models/enums/Player'
import { Dices } from '../models/GameTurn'
import { Move } from '../models/Move'
import { getInitialColumns, getRandomDice } from '../utils/utils'

// const [playersName, setPlayersName] = useState<MapPlayerTo<string>>({//TODO: make playerName changable
//     [Player.PLAYER1]: 'naruto',
//     [Player.PLAYER2]: 'sasuke',
// })
// const [gameHistory, setGameHistory] = useState<GameTurn[]>([]);

export interface GameState {
    turnPlayer: Player;
    columns: Column[];
    moves: Move[];
    dices: Dices;
    hintedMove: undefined | Move;
}

const initialState: GameState = {
    turnPlayer: Player.PLAYER1,
    columns: getInitialColumns(),
    moves: [],
    dices: [getRandomDice(), getRandomDice()],
    hintedMove: undefined,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setColumns(state, action: PayloadAction<Column[]>) {
            state.columns = action.payload;
        },
        addMove(state, action: PayloadAction<Move>) {
            state.moves.push(action.payload);

            // check if switchTurn
            const maxTurns = state.dices[0] === state.dices[1] ? 4 : 2;
            if (state.moves.length === maxTurns) {
                state.turnPlayer = state.turnPlayer === Player.PLAYER1
                    ? Player.PLAYER2
                    : Player.PLAYER1
                state.moves = [];
                state.dices = [getRandomDice(), getRandomDice()];
            }
        },
        undoMove(state) {
            state.moves.pop();
        },
        resetMoves(state) {
            state.moves = [];
        },
        switchDices(state) {
            // if (state.moves.length === 0)
            state.dices = [state.dices[1], state.dices[0]];
        },
        setHintedMove(state, action: PayloadAction<Move>) {
            state.hintedMove = action.payload;
        },
        clearHintedMove(state) {
            state.hintedMove = undefined;
        },
        // increment(state) {
        //   state.value++
        // },
        // incrementByAmount(state, action: PayloadAction<number>) {
        //   state.value += action.payload
        // },
    },
})

export const { setColumns, addMove, resetMoves, undoMove, switchDices, setHintedMove, clearHintedMove } = gameSlice.actions
export const gameReducer = gameSlice.reducer