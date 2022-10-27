import { counter } from './helpers';

const scorePosition = (
  row: number,
  column: number,
  deltaY: number,
  deltaX: number,
  gameGrid: counter[][],
  gameScore: number
): number => {
  let playerPoints = 0;
  let CPUPoints = 0;

  // Determine score through amount of available counters

  for (let i = 0; i < 4; i++) {
    if (gameGrid[row][column] === 'red') {
      playerPoints++; // Add for each human chip
    } else if (gameGrid[row][column] === 'yellow') {
      CPUPoints++; // Add for each computer chip
    }

    // Moving through our board
    row += deltaY;
    column += deltaX;
  }

  // Marking winning/returning score
  if (playerPoints === 4) {
    // Computer won (100000)
    return -gameScore;
  } else if (CPUPoints === 4) {
    // Human won (-100000)
    return gameScore;
  } else {
    // Return normal points
    return CPUPoints;
  }
};

export const boardScore = (
  gameGrid: counter[][],
  gameScore: number
): number => {
  let gameRows = 6;
  let gameColumns = 7;
  //   Delete and move to another place?

  let points = 0;

  let verticalPoints = 0;
  let horizontalPoints = 0;
  let diagonalPoints1 = 0;
  let diagonalPoints2 = 0;

  // Board-size: 7x6 (height x width)
  // Array indices begin with 0
  // => e.g. height: 0, 1, 2, 3, 4, 5

  // Vertical points
  // Check each column for vertical score
  //
  // Possible situations
  //  0  1  2  3  4  5  6
  // [x][ ][ ][ ][ ][ ][ ] 0
  // [x][x][ ][ ][ ][ ][ ] 1
  // [x][x][x][ ][ ][ ][ ] 2
  // [x][x][x][ ][ ][ ][ ] 3
  // [ ][x][x][ ][ ][ ][ ] 4
  // [ ][ ][x][ ][ ][ ][ ] 5

  for (let row = 0; row < gameRows - 3; row++) {
    // Für jede Column überprüfen
    for (let column = 0; column < gameColumns; column++) {
      // Die Column bewerten und zu den Punkten hinzufügen
      let score = scorePosition(row, column, 1, 0, gameGrid, gameScore);
      if (score === gameScore) return gameScore;
      if (score === -gameScore) return -gameScore;
      verticalPoints += score;
    }
  }

  // Horizontal points
  // Check each row's score
  //
  // Possible situations
  //  0  1  2  3  4  5  6
  // [x][x][x][x][ ][ ][ ] 0
  // [ ][x][x][x][x][ ][ ] 1
  // [ ][ ][x][x][x][x][ ] 2
  // [ ][ ][ ][x][x][x][x] 3
  // [ ][ ][ ][ ][ ][ ][ ] 4
  // [ ][ ][ ][ ][ ][ ][ ] 5
  for (let row = 0; row < gameRows; row++) {
    for (let column = 0; column < gameColumns - 3; column++) {
      let score = scorePosition(row, column, 0, 1, gameGrid, gameScore);
      if (score === gameScore) return gameScore;
      if (score === -gameScore) return -gameScore;
      horizontalPoints += score;
    }
  }

  // Diagonal points 1 (left-bottom)
  //
  // Possible situation
  //  0  1  2  3  4  5  6
  // [x][ ][ ][ ][ ][ ][ ] 0
  // [ ][x][ ][ ][ ][ ][ ] 1
  // [ ][ ][x][ ][ ][ ][ ] 2
  // [ ][ ][ ][x][ ][ ][ ] 3
  // [ ][ ][ ][ ][ ][ ][ ] 4
  // [ ][ ][ ][ ][ ][ ][ ] 5
  for (let row = 0; row < gameRows - 3; row++) {
    for (let column = 0; column < gameColumns - 3; column++) {
      let score = scorePosition(row, column, 1, 1, gameGrid, gameScore);
      if (score === gameScore) return gameScore;
      if (score === -gameScore) return -gameScore;
      diagonalPoints1 += score;
    }
  }

  // Diagonal points 2 (right-bottom)
  //
  // Possible situation
  //  0  1  2  3  4  5  6
  // [ ][ ][ ][x][ ][ ][ ] 0
  // [ ][ ][x][ ][ ][ ][ ] 1
  // [ ][x][ ][ ][ ][ ][ ] 2
  // [x][ ][ ][ ][ ][ ][ ] 3
  // [ ][ ][ ][ ][ ][ ][ ] 4
  // [ ][ ][ ][ ][ ][ ][ ] 5
  for (var row = 3; row < gameRows; row++) {
    for (var column = 0; column <= gameColumns - 4; column++) {
      var score = scorePosition(row, column, -1, +1, gameGrid, gameScore);
      if (score === gameScore) return gameScore;
      if (score === -gameScore) return -gameScore;
      diagonalPoints2 += score;
    }
  }

  points =
    horizontalPoints + verticalPoints + diagonalPoints1 + diagonalPoints2;

  return points;
};
