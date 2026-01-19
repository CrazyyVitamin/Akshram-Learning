/**
 * LandingScreen Component
 * Welcome screen with name input and game start
 * Premium bright Indian aesthetic
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Info } from 'lucide-react';

export function LandingScreen({ onStart, onShowLeaderboard }) {
    const [name, setName] = useState('');

    const handleStart = () => {
        if (name.trim()) {
            onStart(name.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && name.trim()) {
            handleStart();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Bright parchment background */}
            <div className="game-background" />

            <motion.div
                className="card p-8 md:p-12 max-w-lg w-full text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold tile-font mb-2"
                        style={{ color: 'var(--maroon)' }}>
                        अक्षरम
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold mb-1" style={{ color: 'var(--saffron-dark)' }}>
                        Aksharam
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        Hindi Varnmala Mahjong Solitaire
                    </p>
                </motion.div>

                {/* Decorative divider */}
                <motion.div
                    className="w-32 h-1 mx-auto mb-8 rounded-full"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--saffron), transparent)' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                />

                {/* Name input */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <label htmlFor="playerName" className="block text-sm font-medium mb-2" style={{ color: 'var(--maroon)' }}>
                        अपना नाम दर्ज करें (Enter your name)
                    </label>
                    <input
                        id="playerName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Your name..."
                        className="input-field text-center text-lg"
                        maxLength={20}
                        autoComplete="off"
                    />
                </motion.div>

                {/* Buttons */}
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <button
                        onClick={handleStart}
                        disabled={!name.trim()}
                        className="btn-primary w-full text-lg flex items-center justify-center gap-2"
                    >
                        <Gamepad2 size={24} />
                        खेल शुरू करें (Start Game)
                    </button>

                    <button
                        onClick={onShowLeaderboard}
                        className="btn-secondary w-full flex items-center justify-center gap-2"
                    >
                        <Trophy size={20} />
                        Leaderboard
                    </button>
                </motion.div>

                {/* Game info */}
                <motion.div
                    className="mt-8 pt-6 border-t border-gray-200 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-2 text-gray-600">
                        <Info size={16} />
                        <span>How to Play</span>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-500">
                        Match pairs of identical Hindi letters. Tiles can only be selected
                        if they are not covered and have at least one free side.
                    </p>
                </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.p
                className="mt-8 text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Made with ♥ for learning Hindi
            </motion.p>
        </div>
    );
}

export default LandingScreen;
