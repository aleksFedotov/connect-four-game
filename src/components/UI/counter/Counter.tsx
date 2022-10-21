import React from 'react';
import { CounterElement } from './CounterStyles';

const Counter: React.FC<{ bg: string; row: number; isWin: boolean }> = ({
  bg,
  row,
  isWin,
}) => {
  return (
    <CounterElement
      bg={bg}
      animate={{ y: [-(80 * row + 70), 0, -35, 0, -20, 0] }}
      iswin={`${isWin}`}
      transition={{
        duration: 0.6,
        times: [0, 0.4, 0.6, 0.7, 0.8, 1],
      }}
    />
  );
};

export default Counter;
