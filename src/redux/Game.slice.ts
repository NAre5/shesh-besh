import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Column } from '../models/Column'
import { Player } from '../models/enums/Player'
import { Dices } from '../models/GameTurn'
import { Move } from '../models/Move'
import { getInitialColumns, getOtherPlayer, getRandomDice } from '../utils/utils'

// const [playersName, setPlayersName] = useState<MapPlayerTo<string>>({//TODO: make playerName changable
//     [Player.PLAYER1]: 'naruto',
//     [Player.PLAYER2]: 'sasuke',
// })
// const [gameHistory, setGameHistory] = useState<GameTurn[]>([]);

export interface GameState {
    turnPlayer: Player;
    //TODO: players: {[T in Player]: User} 
    columns: Column[];
    moves: Move[];
    turnHistory: Column[][];//TODO: or change Move interface and logic aco
    dices: Dices;
    // hintedMove: undefined | Move;//TODO: rethink should be in slice
}

const initialState: GameState = {
    turnPlayer: Player.PLAYER1,
    columns: getInitialColumns(),
    moves: [],
    turnHistory: [],
    dices: [getRandomDice(), getRandomDice()],
    // hintedMove: undefined,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addMove(state, action: PayloadAction<{ newMove: Move; newColumns: Column[] }>) {
            state.moves.push(action.payload.newMove);
            state.turnHistory.push(state.columns);
            state.columns = action.payload.newColumns;
        },
        undoMove(state) {
            if (!state.moves.length) return;
            state.moves.pop();
            // return to previous column state
            state.columns = state.turnHistory.pop()!;
        },
        resetMoves(state) {
            if (!state.moves.length) return;

            state.columns = state.turnHistory[0];
            state.moves = [];
            state.turnHistory = [];
            // return to turn's intitial column state
        },
        //TODO: maybe remove and add dices-direction to reduce renders
        swapDices(state) {
            // if (state.moves.length === 0)
            state.dices = [state.dices[1], state.dices[0]];
        },
        switchTurns(state) {
            // check if can switchTurn
            // const maxTurns = state.dices[0] === state.dices[1] ? 4 : 2;
            // if (state.moves.length === maxTurns) {

            state.turnPlayer = getOtherPlayer(state.turnPlayer);
            state.moves = [];
            state.turnHistory = [];
            state.dices = [getRandomDice(), getRandomDice()];
            // }
            // else {
            // undo if done moves
            // }
        }
        // setHintedMove(state, action: PayloadAction<Move>) {
        //     state.hintedMove = action.payload;
        // },
        // clearHintedMove(state) {
        //     state.hintedMove = undefined;
        // },
        // increment(state) {
        //   state.value++
        // },
        // incrementByAmount(state, action: PayloadAction<number>) {
        //   state.value += action.payload
        // },
    },
})

export const { addMove, resetMoves, undoMove, swapDices, switchTurns } = gameSlice.actions
export const gameReducer = gameSlice.reducer