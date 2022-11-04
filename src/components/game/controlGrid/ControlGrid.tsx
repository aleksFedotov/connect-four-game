import React, { useState, useEffect } from 'react';

import { Control, Column, PointerWrapper, Pointer } from './ControlGridStlyes';
import { useAppDispatch } from '../../../store/hooks';
import { makeMove } from '../../../store/gameSlice';
import { useSelector } from 'react-redux';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';

import { ReactComponent as PointerRed } from '../../../assets/images/marker-red.svg';
import { ReactComponent as PointerYellow } from '../../../assets/images/marker-yellow.svg';
// import { maximizePlay } from '../../../helpers/aiMove';
import { RootState } from '../../../store/store';

const columns = Array(7).fill(null);

const createWorker = createWorkerFactory(
  () => import('../../../helpers/aiMove')
);

const ControlGrid: React.FC = () => {
  const [columnNumber, setColumnNumber] = useState('0');
  const worker = useWorker(createWorker);
  // const aiWorker: Worker = new Worker(new URL('./worker.ts', import.meta.url));

  const { turn, p2, isTimeForNextTurn, gameBoard, CPULevel } = useSelector(
    (state: RootState) => state.game
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    // let timer: ReturnType<typeof setTimeout>;
    if (turn === 'yellow' && p2.name === 'CPU' && isTimeForNextTurn) {
      // timer = setTimeout(() => {
      //   // debug
      //   // let computationStart = new Date().getTime();
      //   dispatch(aiMove());
      //   // debug
      //   // let computationFinish = new Date().getTime() - computationStart;
      // }, 5000);
      (async () => {
        let aiMove = await worker.maximizePlay(gameBoard, CPULevel, Infinity);
        if (typeof aiMove !== 'undefined' && aiMove[0] !== null) {
          // console.log(aiMove[0]);
          dispatch(makeMove(aiMove[0]));
        }
      })();
      console.log('sda');
    }

    // return () => clearTimeout(timer);
  }, [p2, turn, dispatch, isTimeForNextTurn]);

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
