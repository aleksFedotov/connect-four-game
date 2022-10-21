import React from 'react';

import { GameGrid, GridCell } from './GridStyles';
import useWindowWidth from '../../../hooks/useWindowWidth';
import CounterRedLarge from '../../../assets/images/counter-red-large.svg';
import CounterYellowLarge from '../../../assets/images/counter-yellow-large.svg';
import CounterRedSmall from '../../../assets/images/counter-red-small.svg';
import CounterYellowSmall from '../../../assets/images/counter-yellow-small.svg';
import { counter } from '../../../helpers/createGrid';
import Counter from '../../UI/counter/Counter';

type countersType = {
  [key: string]: {
    [key: string]: string;
  };
};

const counters: countersType = {
  red: {
    large: CounterRedLarge,
    small: CounterRedSmall,
  },
  yellow: {
    large: CounterYellowLarge,
    small: CounterYellowSmall,
  },
};

const CounterGrid: React.FC<{ grid: counter[][] }> = ({ grid }) => {
  const windowWidth = useWindowWidth();

  const size = windowWidth > 760 ? 'large' : 'small';
  return (
    <GameGrid>
      {grid.map((row, i) =>
        row.map((counter, j) => (
          <GridCell key={`${i}${j}`}>
            {counter.color && (
              <Counter
                // @ts-ignore
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 4 }}
                bg={counters[counter.color][size]}
                isWin={counter.isWinning}
                row={i}
              />
            )}
          </GridCell>
        ))
      )}
    </GameGrid>
  );
};

export default CounterGrid;
