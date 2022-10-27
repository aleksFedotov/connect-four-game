import React, { useState, useEffect } from 'react';

import { Control, Column, PointerWrapper, Pointer } from './ControlGridStlyes';
import { useAppDispatch } from '../../../store/hooks';
import { makeMove } from '../../../store/gameSlice';
import { useSelector } from 'react-redux';

import { ReactComponent as PointerRed } from '../../../assets/images/marker-red.svg';
import { ReactComponent as PointerYellow } from '../../../assets/images/marker-yellow.svg';
import maximizePlay from '../../../helpers/aiMove';
import { RootState } from '../../../store/store';

const columns = Array(7).fill(null);

const ControlGrid: React.FC = () => {
  const [columnNumber, setColumnNumber] = useState('0');
  const { turn, gameBoard, p2, CPULevel } = useSelector(
    (state: RootState) => state.game
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    let aiMove: [null | number, number];
    if (turn === 'yellow' && p2.name === 'CPU') {
      aiMove = maximizePlay(gameBoard, CPULevel, Infinity);
    }

    const timer = setTimeout(() => {
      if (typeof aiMove !== 'undefined' && aiMove[0] !== null) {
        dispatch(makeMove(aiMove[0]));
      }
    }, 800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [p2, turn, dispatch, CPULevel]);

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
    <Control>
      <PointerWrapper>
        <Pointer columnnumber={columnNumber}>
          <PointerIcon />
        </Pointer>
      </PointerWrapper>
      {columns.map((_, ind) => {
        return (
          <Column
            key={ind}
            data-columnnum={ind}
            onMouseEnter={mouseHoverHandler}
            onClick={columnClickHandler}
          />
        );
      })}
    </Control>
  );
};

export default ControlGrid;
