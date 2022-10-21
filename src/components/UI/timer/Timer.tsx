import React from 'react';

import { TimerWrapper, PlayerName, Time } from './TimerStlyes';

import TurnRed from '../../../assets/images/turn-background-red.svg';
import TurnYellow from '../../../assets/images/turn-background-yellow.svg';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import {
  selectTurn,
  selectTimer,
  selectCurrentPlayer,
} from '../../../store/gameSlice';

const bgs: { [key: string]: string } = {
  red: TurnRed,
  yellow: TurnYellow,
};

const textColor: { [key: string]: string } = {
  red: 'var(--color-white)',
  yellow: 'var(--color-black)',
};

const Timer = () => {
  const game = useSelector((state: RootState) => state.game);
  const turn = useAppSelector(selectTurn);
  const timer = useAppSelector(selectTimer);
  const currentPlayer = useAppSelector(selectCurrentPlayer);

  const player =
    game[currentPlayer].name === 'You' ? 'your' : game[currentPlayer].name;

  return (
    <TimerWrapper bg={bgs[turn]} textcolor={textColor[turn]}>
      <PlayerName>{player}'s turn</PlayerName>
      <Time>{timer}s</Time>
    </TimerWrapper>
  );
};

export default Timer;
