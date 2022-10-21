import { counter } from './createGrid';

export const getCounter = (
  row: number,
  col: number,
  gameGrid: counter[][]
): counter => {
  return gameGrid[row][col];
};
