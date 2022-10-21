import React from 'react';

import { WinneroWrapper, WinnerName, WinnerText } from './WinnerStyles';
import { SmallButton } from '../smallButton/SmallButton';

const Winner: React.FC = () => {
  const name = 'player 1';
  const status = 'wins';
  return (
    <WinneroWrapper>
      <WinnerName>{name}</WinnerName>
      <WinnerText>{status}</WinnerText>
      <SmallButton>Play Again</SmallButton>
    </WinneroWrapper>
  );
};

export default Winner;
