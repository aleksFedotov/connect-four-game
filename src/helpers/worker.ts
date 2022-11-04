import { expose } from 'comlink';
import { maximizePlay } from './aiMove';

const worker = {
  maximizePlay,
};

export type AiMoveWorker = typeof Worker;

expose(worker);
