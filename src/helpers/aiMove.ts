import { counter } from './createGrid';

import { boardScore } from './boardScore';

const maximizePlay = (
  gameGrid: counter[][],
  depth: number,
  gameScore: number
) => {
  let gameColumns = 7;

  const score = boardScore(gameGrid, gameScore);

  // Column, Score
  let max: [null | number, number] = [null, -99999];

  // For all possible moves
  //   for (let column = 0; gameColumns < 7; column++) {
  //     let new_board = board.copy(); // Create new board

  //     if (new_board.place(column)) {
  //       let next_move = minimizePlay(new_board, depth - 1); // Recursive calling

  //       // Evaluate new move
  //       if (max[0] == null || next_move[1] > max[1]) {
  //         max[0] = column;
  //         max[1] = next_move[1];
  //       }
  //     }
  //   }

  return max;
};
