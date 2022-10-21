import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Rules from './pages/Rules';
import Game from './pages/Game';
import { AnimatePresence } from 'framer-motion';
import Modal from './components/UI/modal/Modal';
import MenuWrapper from './components/UI/menuWrapper/MenuWrapper';
import GameMenuContext from './components/game/gameMenuContext/GameMenuContext';
import { useAppSelector } from './store/hooks';
import { selectIsModalOpened } from './store/modalSlice';
import { selectGameIsRunning } from './store/gameSlice';

function App() {
  const location = useLocation();
  const isOpenModal = useAppSelector(selectIsModalOpened);
  const gameIsRunning = useAppSelector(selectGameIsRunning);

  return (
    <div className="app">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainMenu />} />
          <Route path="/rules" element={<Rules />} />
          <Route
            path="/game"
            element={gameIsRunning ? <Game /> : <MainMenu />}
          />
          <Route path="*" element={gameIsRunning ? <Game /> : <MainMenu />} />
        </Routes>
      </AnimatePresence>
      <AnimatePresence>
        {isOpenModal && (
          <Modal key="modal">
            <MenuWrapper type="gameMenu">
              <GameMenuContext />
            </MenuWrapper>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
