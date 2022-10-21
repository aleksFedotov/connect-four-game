import React from 'react';

import {
  GameMenuCtxWrapper,
  GameMenuButtonsWrapper,
  GameMenuHeader,
  GameMenuBtnText,
} from './GameMenuContextStyles';
import { MenuButton } from '../../UI/menuButton/MenuButton';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { setModal, toggleModal } from '../../../store/modalSlice';

const GameMenuContext: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const quitGameHandler = () => {
    navigate('/');
    dispatch(setModal(false));
  };
  const continueHandler = () => {
    dispatch(toggleModal());
  };

  return (
    <GameMenuCtxWrapper>
      <GameMenuHeader>pause</GameMenuHeader>
      <GameMenuButtonsWrapper>
        <MenuButton bgColor="white" textcolor="black" onClick={continueHandler}>
          <GameMenuBtnText>continue game</GameMenuBtnText>
        </MenuButton>
        <MenuButton bgColor="white" textcolor="black">
          <GameMenuBtnText>restart</GameMenuBtnText>
        </MenuButton>
        <MenuButton bgColor="red" textcolor="white" onClick={quitGameHandler}>
          <GameMenuBtnText>quit game</GameMenuBtnText>
        </MenuButton>
      </GameMenuButtonsWrapper>
    </GameMenuCtxWrapper>
  );
};

export default GameMenuContext;
