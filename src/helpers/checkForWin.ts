import { counter } from './helpers';
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
  winner: string | null;
  segments: number[][];
};

const min = (num: number): number => Math.max(num - 3, 0);
const max = (num: number, max: number): number => Math.min(num + 3, max);

const getWinner = (
  firstSegment: number[],
  secondSegment: number[],
  thirdegment: number[],
  fourthSegment: number[],
  gameGrid: counter[][],
  turn: string
): boolean | winComb => {
  const segments = [firstSegment, secondSegment, thirdegment, fourthSegment];
  if (segments.length !== 4) return false;
  let counters = segments.map(([row, col]) => {
    return getCounter(row, col, gameGrid);
  });

  const color = counters[0];

  if (!color) return false;
  if (counters.every((c) => c === turn)) {
    return { winner: turn, segments };
  }

  return false;
};

const checkHorizontalSegments = (
  { focalRow, minCol, maxCol, focalCol }: coordinates,
  gameGrid: counter[][],
  turn: string
) => {
  for (let row = focalRow, col = minCol; col <= maxCol; col++) {
    const winner = getWinner(
      [row, col],
      [row, col + 1],
      [row, col + 2],
      [row, col + 3],
      gameGrid,
      turn
    );

    if (winner) return winner;
  }
  return false;
};

const checkVerticalSegments = (
  { focalRow, focalCol, minRow, maxRow }: coordinates,
  gameGrid: counter[][],
  turn: string
) => {
  for (let col = focalCol, row = minRow; row <= focalRow; row++) {
    const winner = getWinner(
      [row, col],
      [row + 1, col],
      [row + 2, col],
      [row + 3, col],
      gameGrid,
      turn
    );
    if (winner) return winner;
  }
  return false;
};

const checkForwardSlashSegments = (
  { focalRow, focalCol, minRow, minCol, maxRow, maxCol }: coordinates,
  gameGrid: counter[][],
  turn: string
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
      gameGrid,
      turn
    );
    if (winner) return winner;
  }
  return false;
};

const checkBackwardSlashSegments = (
  { focalRow, focalCol, minRow, minCol, maxRow, maxCol }: coordinates,
  gameGrid: counter[][],
  turn: string
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
      gameGrid,
      turn
    );
    if (winner) return winner;
  }
  return false;
};

export const checkForWin = (
  focalRow: number,
  focalCol: number,
  gameGrid: counter[][],
  turn: string
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
    checkHorizontalSegments(coords, gameGrid, turn) ||
    checkVerticalSegments(coords, gameGrid, turn) ||
    checkForwardSlashSegments(coords, gameGrid, turn) ||
    checkBackwardSlashSegments(coords, gameGrid, turn)
  );
};

// const checkForWin2 = (board: counter[][], turn: string): winComb => {
//   //check horizontal wins
//   for (let col = 0; col < 4; col++) {
//     for (let row = 0; row < 6; row++) {
//       if (
//         board[row][col] === turn &&
//         board[row][col + 1] === turn &&
//         board[row][col + 2] === turn &&
//         board[row][col + 3] === turn
//       ) {
//         const segments = [
//           [row, col],
//           [row, col + 1],
//           [row, col + 2],
//           [row, col + 3],
//         ];
//         return { winner: turn, segments };
//       }
//     }
//   }

//   //check vertical wins
//   for (let col = 0; col < 7; col++) {
//     for (let row = 0; row < 3; row++) {
//       if (
//         board[row][col] === turn &&
//         board[row + 1][col] === turn &&
//         board[row + 2][col] === turn &&
//         board[row + 3][col] === turn
//       ) {
//         const segments = [
//           [row, col],
//           [row + 1, col],
//           [row + 2, col],
//           [row + 3, col],
//         ];
//         return { winner: turn, segments };
//       }
//     }
//   }
//   //check for upward diagonal wins
//   for (let col = 0; col < 4; col++) {
//     for (let row = 0; row < 3; row++) {
//       if (
//         board[row][col] === turn &&
//         board[row + 1][col + 1] === turn &&
//         board[row + 2][col + 2] === turn &&
//         board[row + 3][col + 3] === turn
//       ) {
//         const segments = [
//           [row, col],
//           [row + 1, col + 1],
//           [row + 2, col + 2],
//           [row + 3, col + 3],
//         ];
//         return { winner: turn, segments };
//       }
//     }
//   }

//   //check for upward diagonal wins
//   for (let col = 0; col < 4; col++) {
//     for (let row = 3; row < 6; row++) {
//       if (
//         board[row][col] === turn &&
//         board[row - 1][col + 1] === turn &&
//         board[row - 2][col + 2] === turn &&
//         board[row - 3][col + 3] === turn
//       ) {
//         const segments = [
//           [row, col],
//           [row - 1, col + 1],
//           [row - 2, col + 2],
//           [row - 3, col + 3],
//         ];
//         return { winner: turn, segments };
//       }
//     }
//   }

//   return { winner: null, segments: [] };
// };
