/**
 * WinScreen Component
 * Celebratory screen shown when player completes the game
 * Premium bright Indian aesthetic
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, RotateCcw, Home, Clock } from 'lucide-react';
import { formatTime } from '../utils/gameUtils';
import { DIFFICULTY_LEVELS } from '../utils/tileData';

// Confetti particle component
function Confetti({ delay }) {
    const colors = ['#FF9933', '#FFD700', '#800020', '#4CAF50', '#E91E63'];
    const randomX = Math.random() * 100;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomDuration = 2 + Math.random() * 2;
    const randomSize = 8 + Math.random() * 8;

    return (
        <motion.div
            className="absolute rounded-sm"
            style={{
                left: `${randomX}%`,
                top: '-20px',
                width: `${randomSize}px`,
                height: `${randomSize}px`,
                background: randomColor,
            }}
            initial={{ y: -20, rotate: 0, opacity: 1 }}
            animate={{
                y: '100vh',
                rotate: 720,
                opacity: 0
            }}
            transition={{
                duration: randomDuration,
                delay: delay,
                ease: 'easeIn'
            }}
        />
    );
}

export function WinScreen({
    playerName,
    difficulty,
    time,
    rank,
    onRestart,
    onHome
}) {
    const [confetti, setConfetti] = useState([]);
    const level = DIFFICULTY_LEVELS[difficulty];

    // Generate confetti on mount
    useEffect(() => {
        const particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push(<Confetti key={i} delay={i * 0.04} />);
        }
        setConfetti(particles);
    }, []);

    const getRankEmoji = (r) => {
        if (r === 1) return '🥇';
        if (r === 2) return '🥈';
        if (r === 3) return '🥉';
        return '🏅';
    };

    const getRankMessage = (r) => {
        if (r === 1) return 'You set a new record!';
        if (r <= 3) return 'Excellent performance!';
        if (r <= 5) return 'Great job!';
        return 'Well done!';
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative">
            {/* Confetti */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {confetti}
            </div>

            <div className="game-background" />

            <motion.div
                className="card p-8 md:p-12 max-w-lg w-full text-center relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
            >
                {/* Trophy */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="inline-block p-4 rounded-full mb-4"
                        style={{ background: 'linear-gradient(135deg, var(--gold), var(--saffron))' }}>
                        <Trophy size={48} color="white" />
                    </div>
                </motion.div>

                {/* Congratulations */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold tile-font mb-2"
                        style={{ color: 'var(--maroon)' }}>
                        बधाई हो!
                    </h1>
                    <p className="text-xl text-gray-600 mb-6">Congratulations, {playerName}!</p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-2 gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {/* Time */}
                    <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 153, 51, 0.15)' }}>
                        <Clock size={24} className="mx-auto mb-2" style={{ color: 'var(--saffron)' }} />
                        <p className="text-2xl font-mono font-bold" style={{ color: 'var(--maroon)' }}>
                            {formatTime(time)}
                        </p>
                        <p className="text-sm text-gray-500">Time</p>
                    </div>

                    {/* Rank */}
                    <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 215, 0, 0.15)' }}>
                        <div className="text-3xl mb-1">{getRankEmoji(rank)}</div>
                        <p className="text-2xl font-bold" style={{ color: 'var(--maroon)' }}>
                            #{rank}
                        </p>
                        <p className="text-sm text-gray-500">Rank</p>
                    </div>
                </motion.div>

                {/* Level & Message */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Star size={16} style={{ color: 'var(--saffron)' }} />
                        <span className="text-gray-600">
                            {level.name} ({level.description})
                        </span>
                        <Star size={16} style={{ color: 'var(--saffron)' }} />
                    </div>
                    <p className="text-lg font-semibold" style={{ color: 'var(--saffron-dark)' }}>
                        {getRankMessage(rank)}
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <button onClick={onRestart} className="btn-primary flex items-center justify-center gap-2">
                        <RotateCcw size={20} />
                        Play Again
                    </button>
                    <button onClick={onHome} className="btn-secondary flex items-center justify-center gap-2">
                        <Home size={20} />
                        Main Menu
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default WinScreen;
