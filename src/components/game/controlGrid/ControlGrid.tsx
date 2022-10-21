import React, { useState } from 'react';

import { Control, Column, PointerWrapper, Pointer } from './ControlGridStlyes';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { selectTurn, makeMove } from '../../../store/gameSlice';

import { ReactComponent as PointerRed } from '../../../assets/images/marker-red.svg';
import { ReactComponent as PointerYellow } from '../../../assets/images/marker-yellow.svg';

const columns = Array(7).fill(null);

const ControlGrid: React.FC = () => {
  const [columnNumber, setColumnNumber] = useState('0');

  const turn = useAppSelector(selectTurn);
  const dispatch = useAppDispatch();

  const PointerIcon = turn === 'red' ? PointerRed : PointerYellow;

  const mouseHoverHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setColumnNumber(e.currentTarget.getAttribute('data-columnnum') || '0');
  };

  const columnClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const col = e.currentTarget.getAttribute('data-columnnum');
    if (col) {
      dispatch(makeMove(+col));
    }
  };

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
