import React, { useState, useEffect } from 'react';

import { Control, Column, PointerWrapper, Pointer } from './ControlGridStlyes';
import { useAppDispatch } from '../../../store/hooks';
import { makeMove } from '../../../store/gameSlice';
import { useSelector } from 'react-redux';

import { ReactComponent as PointerRed } from '../../../assets/images/marker-red.svg';
import { ReactComponent as PointerYellow } from '../../../assets/images/marker-yellow.svg';

import { RootState } from '../../../store/store';

import { wrap } from 'comlink';

const columns = Array(7).fill(null);
const worker = new Worker(
  new URL('../../../helpers/worker.ts', import.meta.url),
  { name: 'aiMoveWorker', type: 'module' }
);

const ControlGrid: React.FC = () => {
  const [columnNumber, setColumnNumber] = useState('0');

  const { turn, p2, isTimeForNextTurn, gameBoard, CPULevel } = useSelector(
    (state: RootState) => state.game
  );

  const { maximizePlay } =
    wrap<import('../../../helpers/worker').AiMoveWorker>(worker);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(turn);
    if (turn === 'yellow' && p2.name === 'CPU' && isTimeForNextTurn) {
      (async () => {
        const aiMove = await maximizePlay(gameBoard, CPULevel, Infinity);

        if (aiMove && aiMove[0] !== null) {
          dispatch(makeMove(aiMove[0]));
        }
      })();
    }
  }, [
    p2,
    turn,
    dispatch,
    isTimeForNextTurn,
    CPULevel,
    gameBoard,
    maximizePlay,
  ]);

  const mouseHoverHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setColumnNumber(e.currentTarget.getAttribute('data-columnnum') || '0');
  };

  const columnClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (turn === 'yellow' && p2.name === 'CPU') return;
    const col = e.currentTarget.getAttribute('data-columnnum');
    if (col) {
      dispatch(makeMove(+col));
    }
  };

  const PointerIcon = turn === 'red' ? PointerRed : PointerYellow;
  return (
    <Control data-testid="control">
      <PointerWrapper>
        <Pointer columnnumber={columnNumber} data-testid="pointer">
          <PointerIcon data-testid={`color-${turn}`} />
        </Pointer>
      </PointerWrapper>
      {columns.map((_, ind) => {
        return (
          <Column
            key={ind}
            data-columnnum={ind}
            onMouseEnter={mouseHoverHandler}
            onClick={columnClickHandler}
            data-testid={`column${ind}`}
          />
        );
      })}
    </Control>
  );
};

export default ControlGrid;
