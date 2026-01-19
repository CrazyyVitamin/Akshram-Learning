/**
 * LevelSelect Component
 * Allows player to choose difficulty level
 * Premium bright Indian aesthetic
 */

import { motion } from 'framer-motion';
import { ArrowLeft, Layers, Shuffle } from 'lucide-react';
import { DIFFICULTY_LEVELS } from '../utils/tileData';

export function LevelSelect({ playerName, onSelectLevel, onBack }) {
    const levels = Object.values(DIFFICULTY_LEVELS);

    const levelIcons = {
        navagantuk: '🌱',
        anubhavi: '🌿',
        shreshtha: '🌳'
    };

    const levelColors = {
        navagantuk: '#4CAF50',
        anubhavi: '#FF9933',
        shreshtha: '#800020'
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="game-background" />

            <motion.div
                className="card p-6 md:p-8 max-w-2xl w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={24} style={{ color: 'var(--maroon)' }} />
                    </button>
                    <div className="text-center">
                        <p className="text-gray-500 text-sm">Welcome,</p>
                        <p className="font-semibold text-lg" style={{ color: 'var(--saffron-dark)' }}>
                            {playerName}
                        </p>
                    </div>
                    <div className="w-10" /> {/* Spacer */}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 tile-font" style={{ color: 'var(--maroon)' }}>
                    कठिनाई स्तर चुनें
                </h2>
                <p className="text-gray-500 text-center mb-8">
                    Choose Difficulty Level
                </p>

                {/* Level cards */}
                <div className="grid gap-4">
                    {levels.map((level, index) => (
                        <motion.button
                            key={level.id}
                            onClick={() => onSelectLevel(level.id)}
                            className="level-card p-4 md:p-6 text-left"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-4">
                                {/* Icon */}
                                <div className="text-4xl">{levelIcons[level.id]}</div>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <h3 className="text-xl font-bold tile-font"
                                            style={{ color: levelColors[level.id] }}>
                                            {level.name}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            ({level.subtitle})
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-2">
                                        {level.description}
                                    </p>

                                    {/* Stats - No hints shown */}
                                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Layers size={14} />
                                            {level.tileCount} tiles
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Shuffle size={14} />
                                            {level.shuffles} shuffles
                                        </span>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div style={{ color: 'var(--saffron)' }}>→</div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default LevelSelect;
