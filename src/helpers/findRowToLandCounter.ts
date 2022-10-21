import { counter } from './createGrid';

export const findRowToLandCounter = (
  grid: counter[][],
  column: number
): number => {
  let row: number = 0;

  while (row < 5 && !grid[row + 1][column].color) {
    row++;
  }

  return row;
};
