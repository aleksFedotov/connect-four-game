import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { modalReducer } from './modalSlice';
import { gameReducer } from './gameSlice';

const rootReducer = combineReducers({
  modal: modalReducer,
  game: gameReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
