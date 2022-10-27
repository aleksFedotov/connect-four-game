import React from 'react';

import {
  MenuCtxWrapper,
  ButtonsWrapper,
  ButtonCtxWrapper,
  BtnText,
} from './MainMenuContextStyles';
import { MenuButton } from '../UI/menuButton/MenuButton';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as CPUMode } from '../../assets/images/player-vs-cpu.svg';
import { ReactComponent as PVPMode } from '../../assets/images/player-vs-player.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { startGame } from '../../store/gameSlice';
import { toggleModal } from '../../store/modalSlice';

const MainMenuContext: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const gameRulesHandler = () => {
    navigate('/rules');
  };

  const PvPhandler = () => {
    dispatch(startGame('PvP'));
    navigate('/game');
  };

  const CPUvPHandler = () => {
    dispatch(toggleModal('mainMenu'));
  };

  return (
    <MenuCtxWrapper>
      <Logo />
      <ButtonsWrapper>
        <MenuButton bgColor="red" textcolor="white" onClick={CPUvPHandler}>
          <ButtonCtxWrapper>
            <BtnText>player vs cpu</BtnText>
            <CPUMode />
          </ButtonCtxWrapper>
        </MenuButton>
        <MenuButton bgColor="yellow" textcolor="black" onClick={PvPhandler}>
          <ButtonCtxWrapper>
            <BtnText>play vs player</BtnText>
            <PVPMode />
          </ButtonCtxWrapper>
        </MenuButton>
        <MenuButton
          bgColor="white"
          textcolor="black"
          onClick={gameRulesHandler}
        >
          <BtnText>game rules</BtnText>
        </MenuButton>
      </ButtonsWrapper>
    </MenuCtxWrapper>
  );
};

export default MainMenuContext;
