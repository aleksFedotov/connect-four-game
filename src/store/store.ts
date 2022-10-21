import { configureStore } from '@reduxjs/toolkit';
import { modalReducer } from './modalSlice';
import { gameReducer } from './gameSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: { modal: modalReducer, game: gameReducer },
});
