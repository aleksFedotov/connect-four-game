import React from 'react';

import { WinneroWrapper, WinnerName, WinnerText } from './WinnerStyles';
import { SmallButton } from '../smallButton/SmallButton';
import { useAppDispatch } from '../../../store/hooks';
import { playAgain } from '../../../store/gameSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const Winner: React.FC = () => {
  const dispatch = useAppDispatch();
  const game = useSelector((state: RootState) => state.game);
  let name = '';
  let status = 'tie';
  if (game.winner && game.winner !== 'tie') {
    name = game[game.winner].name;

    status = name === 'You' ? 'win' : 'wins';
  }

  const playAgainHandler = () => {
    dispatch(playAgain());
  };

  return (
    <WinneroWrapper data-testid="winner">
      <WinnerName>{name}</WinnerName>
      <WinnerText>{status}</WinnerText>
      <SmallButton onClick={playAgainHandler}>Play Again</SmallButton>
    </WinneroWrapper>
  );
};

export default Winner;
