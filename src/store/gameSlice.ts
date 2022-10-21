import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from './store';
import { createGrid } from '../helpers/createGrid';
import { findRowToLandCounter } from '../helpers/findRowToLandCounter';
import { counter } from '../helpers/createGrid';
import { store } from './store';
import { checkForWin } from '../helpers/checkForWin';

type player = {
  name: string;
  color: string;
  score: number;
};

type inintialStateType = {
  [key: string]: any;
  gameIsRunning: boolean;
  gameMode: string;
  p1: player;
  p2: player;
  turn: string;
  gameBoard: counter[][];
  winner: string | null;
  timer: number;
  currentPlayer: string;
};

const initialState: inintialStateType = {
  gameIsRunning: false,
  gameMode: '',
  p1: {
    name: '',
    color: 'red',
    score: 0,
  },
  p2: {
    name: '',
    color: 'yellow',
    score: 0,
  },
  turn: 'red',
  gameBoard: createGrid(),
  winner: null,
  timer: 30,
  currentPlayer: 'p1',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<string>) {
      state.gameMode = action.payload;
      state.p1.name = action.payload === 'PvP' ? 'Player 1' : 'You';
      state.p2.name = action.payload === 'PvP' ? 'Player 2' : 'CPU';
      state.gameIsRunning = true;
    },
    placeCounter(state, action: PayloadAction<number>) {
      const col = action.payload;
      const row = findRowToLandCounter(state.gameBoard, action.payload);
      state.gameBoard[row][col] = { color: state.turn, isWinning: false };
    },
    changeTurn(state) {
      console.log('dsf');
      state.turn = state.turn === 'red' ? 'yellow' : 'red';
    },
    setIsTurnIsChanged(state, action: PayloadAction<boolean>) {
      state.turnIsChanged = action.payload;
    },
    checkForWinner(state, action: PayloadAction<number>) {
      const { gameBoard } = current(state);
      const col = action.payload;
      const row = findRowToLandCounter(state.gameBoard, action.payload);

      const winner = checkForWin(row, col, gameBoard);

      console.log(winner);
    },
  },
});

export const { startGame, placeCounter, changeTurn, checkForWinner } =
  gameSlice.actions;
export const selectGameIsRunning = (state: RootState) =>
  state.game.gameIsRunning;
export const selectPlayer1 = (state: RootState) => state.game.p1;
export const selectPlayer2 = (state: RootState) => state.game.p2;
export const selectTurn = (state: RootState) => state.game.turn;
export const selectGameBoard = (state: RootState) => state.game.gameBoard;
export const selectWinner = (state: RootState) => state.game.winner;
export const selectGameMode = (state: RootState) => state.game.gameMode;
export const selectTimer = (state: RootState) => state.game.timer;
export const selectCurrentPlayer = (state: RootState) =>
  state.game.currentPlayer;

export const gameReducer = gameSlice.reducer;

export const makeMove = (col: number) => {
  return async (
    dispatch: typeof store.dispatch,
    getState: typeof store.getState
  ) => {
    const { game } = getState();
    const gameBoard = game.gameBoard;

    if (gameBoard[0][col].color) return;
    dispatch(placeCounter(col));
    // checkforwin
    dispatch(checkForWinner(col));
    console.log('1');
    dispatch(changeTurn());
  };
};
