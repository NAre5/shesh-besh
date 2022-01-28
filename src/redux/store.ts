import { configureStore } from '@reduxjs/toolkit'

import { gameReducer } from './Game.slice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
})

export type StoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
