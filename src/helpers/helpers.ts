import { counter } from './createGrid';

export const getCounter = (
  row: number,
  col: number,
  gameGrid: counter[][]
): counter => {
  if (!gameGrid[row] || !gameGrid[row][col]) return null;
  return gameGrid[row][col];
};
