import { counter } from './createGrid';
import { getCounter } from './helpers';

type coordinates = {
  focalRow: number;
  focalCol: number;
  minRow: number;
  minCol: number;
  maxRow: number;
  maxCol: number;
};

type winComb = {
  color: string;
  counters: counter[];
};

const min = (num: number): number => Math.max(num - 3, 0);
const max = (num: number, max: number): number => Math.min(num + 3, max);

const getWinner = (
  firstSegment: number[],
  secondSegment: number[],
  thirdegment: number[],
  fourthSegment: number[],
  gameGrid: counter[][]
): boolean | winComb => {
  const segments = [firstSegment, secondSegment, thirdegment, fourthSegment];
  if (segments.length !== 4) return false;
  const counters = segments.map(([row, col]) => getCounter(row, col, gameGrid));
  const color = counters[0].color;
  if (!color) return false;
  if (counters.every((c) => c.color === color)) return { color, counters };
  return false;
};

const checkHorizontalSegments = (
  { focalRow, minCol, maxCol }: coordinates,
  gameGrid: counter[][]
) => {
  for (let row = focalRow, col = minCol; col <= maxCol; col++) {
    const winner = getWinner(
      [row, col],
      [row, col + 1],
      [row, col + 2],
      [row, col + 3],
      gameGrid
    );

    return winner;
  }
};

const checkVerticalSegments = (
  { focalRow, focalCol, minRow, maxRow }: coordinates,
  gameGrid: counter[][]
) => {
  for (let col = focalCol, row = minRow; row <= focalRow; row++) {
    const winner = getWinner(
      [row, col],
      [row + 1, col],
      [row + 2, col],
      [row + 3, col],
      gameGrid
    );
    return winner;
  }
};

const checkForwardSlashSegments = (
  { focalRow, focalCol, minRow, minCol, maxRow, maxCol }: coordinates,
  gameGrid: counter[][]
) => {
  const startForwardSlash = (row: number, col: number) => {
    while (row > minRow && col > minCol) {
      row--;
      col--;
    }
    return [row, col];
  };

  for (
    let [row, col] = startForwardSlash(focalRow, focalCol);
    row <= maxRow && col <= maxCol;
    row++, col++
  ) {
    const winner = getWinner(
      [row, col],
      [row + 1, col + 1],
      [row + 2, col + 2],
      [row + 3, col + 3],
      gameGrid
    );
    if (winner) return winner;
    return false;
  }
};

const checkBackwardSlashSegments = (
  { focalRow, focalCol, minRow, minCol, maxRow, maxCol }: coordinates,
  gameGrid: counter[][]
) => {
  const startBackwardSlash = (row: number, col: number) => {
    while (row < maxRow && col > minCol) {
      row++;
      col--;
    }
    return [row, col];
  };
  for (
    let [row, col] = startBackwardSlash(focalRow, focalCol);
    row >= minRow && col <= maxCol;
    row--, col++
  ) {
    const winner = getWinner(
      [row, col],
      [row - 1, col + 1],
      [row - 2, col + 2],
      [row - 3, col + 3],
      gameGrid
    );
    if (winner) return winner;
    return false;
  }
};

export const checkForWin = (
  focalRow: number,
  focalCol: number,
  gameGrid: counter[][]
) => {
  const minCol = min(focalCol);
  const maxCol = max(focalCol, 6);
  const minRow = min(focalRow);
  const maxRow = max(focalRow, 5);
  const coords: coordinates = {
    focalRow,
    focalCol,
    minRow,
    minCol,
    maxRow,
    maxCol,
  };

  return (
    checkHorizontalSegments(coords, gameGrid) ||
    checkVerticalSegments(coords, gameGrid) ||
    checkForwardSlashSegments(coords, gameGrid) ||
    checkBackwardSlashSegments(coords, gameGrid)
  );
};
