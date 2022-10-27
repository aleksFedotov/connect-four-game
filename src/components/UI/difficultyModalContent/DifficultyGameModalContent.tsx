import React from 'react';
import { modalVariants } from '../../../frameMotinVariats/frameMotionVariants';
import { useAppDispatch } from '../../../store/hooks';
import { startGame, setCPULevel } from '../../../store/gameSlice';
import { setModal } from '../../../store/modalSlice';
import { useNavigate } from 'react-router-dom';

import {
  Header,
  DifficultyList,
  DifficultyItem,
  DifficultyWrapper,
} from './DifficultyGameModalContentStyles';

const DifficaltyGameModalContent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectDifficultyHandler = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const difficultyLevel = e.currentTarget.getAttribute('data-difficulty');
    if (difficultyLevel !== null) {
      dispatch(setCPULevel(+difficultyLevel));
      dispatch(setModal({ modal: 'mainMenu', status: false }));
      dispatch(startGame('CPUvP'));
      navigate('/game');
    }
  };
  return (
    <DifficultyWrapper
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Header>Select difficulty</Header>
      <DifficultyList>
        <DifficultyItem data-difficulty="2" onClick={selectDifficultyHandler}>
          ease
        </DifficultyItem>
        <DifficultyItem data-difficulty="4" onClick={selectDifficultyHandler}>
          normal
        </DifficultyItem>
        <DifficultyItem data-difficulty="6" onClick={selectDifficultyHandler}>
          hard
        </DifficultyItem>
      </DifficultyList>
    </DifficultyWrapper>
  );
};

export default DifficaltyGameModalContent;
