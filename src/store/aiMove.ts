import { store } from './store';
import { wrap } from 'comlink';
import { makeMove } from './gameSlice';

const worker = new Worker(new URL('../helpers/worker.ts', import.meta.url), {
  name: 'aiMoveWorker',
  type: 'module',
});

const { maximizePlay } = wrap<import('../helpers/worker').AiMoveWorker>(worker);

export const aiMove = () => {
  return async (
    dispatch: typeof store.dispatch,
    getState: typeof store.getState
  ) => {
    const { game } = getState();

    let aiMove = await maximizePlay(game.gameBoard, game.CPULevel, Infinity);

    if (typeof aiMove !== 'undefined' && aiMove[0] !== null) {
      dispatch(makeMove(aiMove[0]));
    }
  };
};
