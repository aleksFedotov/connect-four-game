/* eslint-disable */
const scorePosition = (row, column, deltaY, deltaX, gameGrid, gameScore) => {
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

const boardScore = (gameGrid, gameScore) => {
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

function copyBoard(gameGrid) {
  const copyBoard = gameGrid.map((row) => [...row]);
  return copyBoard;
}

function findRowToLandCounter(grid, column) {
  let row = 0;

  while (row < 5 && !grid[row + 1][column]) {
    row++;
  }

  return row;
}

const boardIsFull = (gameGrid) => {
  for (let i = 0; i < 7; i++) {
    if (!gameGrid[0][i]) return false;
  }
  return true;
};

function maximizePlay(gameGrid, depth, gameScore, alpha, beta) {
  let gameColumns = 7;

  const score = boardScore(gameGrid, gameScore);
  // console.log('max', iterations);

  if (
    depth === 0 ||
    score === gameScore ||
    score === -gameScore ||
    boardIsFull(gameGrid)
  )
    return [null, score];

  // Column, Score
  let max = [null, -Infinity];

  //   For all possible moves
  for (let column = 0; column < gameColumns; column++) {
    let new_board = copyBoard(gameGrid); // Create new board
    const row = findRowToLandCounter(new_board, column);

    if (!new_board[row][column]) {
      new_board[row][column] = 'yellow';

      let next_move = minimizePlay(
        new_board,
        depth - 1,
        gameScore,
        alpha,
        beta
      ); // Recursive calling

      // Evaluate new move
      if (max[0] === null || next_move[1] > max[1]) {
        max[0] = column;
        max[1] = next_move[1];

        alpha = next_move[1];
      }
      // @ts-ignore
      if (alpha >= beta) return max;
    }
  }

  return max;
}

function minimizePlay(gameGrid, depth, gameScore, alpha, beta) {
  let gameColumns = 7;

  const score = boardScore(gameGrid, gameScore);
  // console.log('min', iterations);

  if (
    depth === 0 ||
    score === gameScore ||
    score === -gameScore ||
    boardIsFull(gameGrid)
  )
    return [null, score];

  let min = [null, Infinity];

  for (let column = 0; column < gameColumns; column++) {
    let new_board = copyBoard(gameGrid);
    const row = findRowToLandCounter(new_board, column);

    if (!new_board[row][column]) {
      new_board[row][column] = 'red';

      let next_move = maximizePlay(
        new_board,
        depth - 1,
        gameScore,
        alpha,
        beta
      );

      if (min[0] == null || next_move[1] < min[1]) {
        min[0] = column;
        min[1] = next_move[1];

        beta = next_move[1];
      }
      // @ts-ignore
      if (alpha >= beta) return min;
    }
  }

  return min;
}

self.onmessage = (e) => {
  const { gameBoard, cpulevel } = e.data;
  // check data is correctly framed
  let aiMove = maximizePlay(gameBoard, cpulevel, Infinity);
  self.postMessage(aiMove);
};
