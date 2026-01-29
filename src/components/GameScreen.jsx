/**
 * GameScreen Component
 * Main game play area combining all game elements
 * Premium bright theme with 3D tiles
 */

import { motion } from 'framer-motion';
import { useGameLogic } from '../hooks/useGameLogic';
import GameBoard from './GameBoard';
import Timer from './Timer';
import Controls from './Controls';
import WinScreen from './WinScreen';
import { DIFFICULTY_LEVELS } from '../utils/tileData';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const SHUFFLE_PENALTY = 10; // Not used anymore - kept for reference

export function GameScreen({ playerName, difficulty, onHome }) {
    const {
        tiles,
        selectedTile,
        gameStatus,
        timer,
        shufflesRemaining,
        hintsRemaining,
        activeHint,
        freeTiles,
        rank,
        matchedPairs,
        totalPairs,
        handleTileClick,
        useShuffle,
        useHint,
        restartGame
    } = useGameLogic(difficulty, playerName);

    const level = DIFFICULTY_LEVELS[difficulty];

    // Show win screen
    if (gameStatus === 'won') {
        return (
            <WinScreen
                playerName={playerName}
                difficulty={difficulty}
                time={timer}
                rank={rank}
                onRestart={restartGame}
                onHome={onHome}
            />
        );
    }

    // Game stuck screen
    if (gameStatus === 'stuck') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="game-background" />
                <motion.div
                    className="card p-8 max-w-md w-full text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <AlertTriangle size={48} className="mx-auto mb-4 text-saffron" style={{ color: 'var(--saffron)' }} />
                    <h2 className="text-2xl font-bold mb-2 text-maroon">No Moves Available!</h2>
                    <p className="text-gray-600 mb-6">
                        There are no more matching pairs available.
                        {shufflesRemaining > 0 ? ` Use shuffle to continue!` : ' Try a new game.'}
                    </p>
                    <div className="flex gap-4 justify-center">
                        {shufflesRemaining > 0 && (
                            <button onClick={useShuffle} className="btn-primary flex items-center gap-2">
                                <RefreshCw size={20} />
                                Shuffle ({shufflesRemaining})
                            </button>
                        )}
                        <button onClick={restartGame} className="btn-secondary">
                            Restart Game
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col p-4">
            <div className="game-background" />

            {/* Header */}
            <motion.header
                className="card p-4 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Level Info */}
                    <div className="flex items-center gap-3">
                        <div className="text-2xl tile-font font-bold" style={{ color: 'var(--maroon)' }}>
                            {level.name}
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ background: 'rgba(255, 153, 51, 0.15)', color: 'var(--saffron-dark)' }}>
                            {level.description}
                        </span>
                    </div>

                    {/* Timer */}
                    <Timer seconds={timer} gameStatus={gameStatus} />

                    {/* Progress */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">Pairs:</span>
                        <span className="font-bold text-lg" style={{ color: 'var(--maroon)' }}>
                            {matchedPairs} / {totalPairs}
                        </span>
                    </div>
                </div>
            </motion.header>

            {/* Game Board */}
            <motion.main
                className="flex-1 flex items-center justify-center overflow-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <GameBoard
                    tiles={tiles}
                    selectedTile={selectedTile}
                    activeHint={activeHint}
                    freeTiles={freeTiles}
                    onTileClick={handleTileClick}
                />
            </motion.main>

            {/* Controls */}
            <motion.footer
                className="card p-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Controls
                    shufflesRemaining={shufflesRemaining}
                    hintsRemaining={hintsRemaining}
                    onShuffle={useShuffle}
                    onHint={useHint}
                    onRestart={restartGame}
                    onHome={onHome}
                    gameStatus={gameStatus}
                />
            </motion.footer>
        </div>
    );
}

export default GameScreen;
