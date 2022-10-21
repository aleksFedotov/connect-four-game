import { counter } from './createGrid';

export const getCounter = (
  row: number,
  col: number,
  gameGrid: counter[][]
): counter => {
  if (!gameGrid[row] || !gameGrid[row][col])
    return { color: null, isWinning: false };
  return gameGrid[row][col];
};
