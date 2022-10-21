import React from 'react';

import { BoardWrapper } from './BoardStyles';

import useWindowWidth from '../../../hooks/useWindowWidth';

import { ReactComponent as WhiteLayoutLarge } from '../../../assets/images/board-layer-white-large.svg';
import { ReactComponent as BlackLayoutLarge } from '../../../assets/images/board-layer-black-large.svg';
import { ReactComponent as WhiteLayoutSmall } from '../../../assets/images/board-layer-white-small.svg';
import { ReactComponent as BlackLayoutSmall } from '../../../assets/images/board-layer-black-small.svg';
import { boardVariants } from '../../../frameMotinVariats/frameMotionVariants';
import { useAppSelector } from '../../../store/hooks';
import { selectGameBoard } from '../../../store/gameSlice';

import CounterGrid from '../counterGrid/CounterGrid';
import ControlGrid from '../controlGrid/ControlGrid';

const Board: React.FC = () => {
  const gameBoard = useAppSelector(selectGameBoard);

  const windowWidth = useWindowWidth();

  return (
    <BoardWrapper
      // @ts-ignore
      variants={boardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {windowWidth > 760 ? (
        <WhiteLayoutLarge className="white" />
      ) : (
        <WhiteLayoutSmall className="white" />
      )}
      <ControlGrid />
      <CounterGrid grid={gameBoard} />
      {windowWidth > 760 ? (
        <BlackLayoutLarge className="black" />
      ) : (
        <BlackLayoutSmall className="black" />
      )}
    </BoardWrapper>
  );
};

export default Board;