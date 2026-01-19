/**
 * अक्षरम (Aksharam) - Hindi Varnmala Mahjong Solitaire
 * 
 * Main Application Component
 * Manages screen navigation and game state
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import LevelSelect from './components/LevelSelect';
import GameScreen from './components/GameScreen';
import Leaderboard from './components/Leaderboard';
import './index.css';

// Screen types
const SCREENS = {
  LANDING: 'landing',
  LEVEL_SELECT: 'level_select',
  GAME: 'game',
  LEADERBOARD: 'leaderboard'
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.LANDING);
  const [playerName, setPlayerName] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('navagantuk');

  // Navigation handlers
  const handleStart = (name) => {
    setPlayerName(name);
    setCurrentScreen(SCREENS.LEVEL_SELECT);
  };

  const handleSelectLevel = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentScreen(SCREENS.GAME);
  };

  const handleGoHome = () => {
    setCurrentScreen(SCREENS.LANDING);
  };

  const handleShowLeaderboard = () => {
    setCurrentScreen(SCREENS.LEADERBOARD);
  };

  const handleBackToLevelSelect = () => {
    setCurrentScreen(SCREENS.LEVEL_SELECT);
  };

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentScreen === SCREENS.LANDING && (
          <motion.div
            key="landing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <LandingScreen
              onStart={handleStart}
              onShowLeaderboard={handleShowLeaderboard}
            />
          </motion.div>
        )}

        {currentScreen === SCREENS.LEVEL_SELECT && (
          <motion.div
            key="level-select"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <LevelSelect
              playerName={playerName}
              onSelectLevel={handleSelectLevel}
              onBack={handleGoHome}
            />
          </motion.div>
        )}

        {currentScreen === SCREENS.GAME && (
          <motion.div
            key="game"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <GameScreen
              playerName={playerName}
              difficulty={selectedDifficulty}
              onHome={handleBackToLevelSelect}
            />
          </motion.div>
        )}

        {currentScreen === SCREENS.LEADERBOARD && (
          <motion.div
            key="leaderboard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Leaderboard onBack={handleGoHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
