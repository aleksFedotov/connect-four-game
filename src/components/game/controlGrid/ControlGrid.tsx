import React, { useEffect } from 'react';

import { Control, Column } from './ControlGridStlyes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  makeMove,
  selectCurrentPlayer,
  selectGameMode,
  selectIsTimeForNextTurn,
  setPointercolumn,
} from '../../../store/gameSlice';
// import { useSelector } from 'react-redux';
import { aiMove } from '../../../store/aiMove';
import GamePointer from '../../UI/pointer/Pointer';

// import { ReactComponent as PointerRed } from '../../../assets/images/marker-red.svg';
// import { ReactComponent as PointerYellow } from '../../../assets/images/marker-yellow.svg';

// import { wrap } from 'comlink';

const columns = Array(7).fill(null);
// const worker = new Worker(
//   new URL('../../../helpers/worker.ts', import.meta.url),
//   { name: 'aiMoveWorker', type: 'module' }
// );

const ControlGrid: React.FC = () => {
  // const [columnNumber, setColumnNumber] = useState('0');
  // const turn = useAppSelector(selectTurn);
  const isTimeForNextTurn = useAppSelector(selectIsTimeForNextTurn);
  const gameMode = useAppSelector(selectGameMode);
  const currentPlayer = useAppSelector(selectCurrentPlayer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentPlayer === 'p2' && gameMode === 'CPUvP' && isTimeForNextTurn) {
      dispatch(aiMove());
    }
  }, [dispatch, isTimeForNextTurn, currentPlayer, gameMode]);

  const mouseHoverHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    dispatch(
      setPointercolumn(e.currentTarget.getAttribute('data-columnnum') || '0')
    );
  };

  const columnClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (currentPlayer === 'p2' && gameMode === 'CPUvP') return;
    const col = e.currentTarget.getAttribute('data-columnnum');
    if (col) {
      dispatch(makeMove(+col));
    }
  };

  // const PointerIcon = turn === 'red' ? PointerRed : PointerYellow;
  return (
    <Control data-testid="control">
      {/* <PointerWrapper>
        <Pointer columnnumber={columnNumber} data-testid="pointer">
          <PointerIcon data-testid={`color-${turn}`} />
        </Pointer>
      </PointerWrapper> */}
      <GamePointer />
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
