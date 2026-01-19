/**
 * Leaderboard Component
 * Displays high scores for each difficulty level
 * Premium bright Indian aesthetic with tabbed navigation
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowLeft, Medal, Clock } from 'lucide-react';
import { getLeaderboard, formatTime } from '../utils/gameUtils';
import { DIFFICULTY_LEVELS } from '../utils/tileData';

export function Leaderboard({ onBack }) {
    const [selectedLevel, setSelectedLevel] = useState('navagantuk');
    const levels = Object.values(DIFFICULTY_LEVELS);

    const scores = useMemo(() => {
        return getLeaderboard(selectedLevel);
    }, [selectedLevel]);

    const getRankStyle = (rank) => {
        if (rank === 1) return 'leaderboard-gold';
        if (rank === 2) return 'leaderboard-silver';
        if (rank === 3) return 'leaderboard-bronze';
        return 'leaderboard-item';
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
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={24} style={{ color: 'var(--maroon)' }} />
                    </button>
                    <div className="flex-1 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <Trophy size={28} style={{ color: 'var(--gold)' }} />
                            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--maroon)' }}>
                                Leaderboard
                            </h2>
                        </div>
                        <p className="text-gray-500 text-sm">उच्च अंक (High Scores)</p>
                    </div>
                    <div className="w-10" /> {/* Spacer */}
                </div>

                {/* Level Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {levels.map(level => (
                        <button
                            key={level.id}
                            onClick={() => setSelectedLevel(level.id)}
                            className={`tab-button whitespace-nowrap ${selectedLevel === level.id ? 'active' : ''}`}
                        >
                            {level.name}
                        </button>
                    ))}
                </div>

                {/* Scores List */}
                <div className="space-y-3 min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {scores.length > 0 ? (
                            <motion.div
                                key={selectedLevel}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-3"
                            >
                                {scores.map((score, index) => (
                                    <motion.div
                                        key={`${score.name}-${score.date}`}
                                        className={`flex items-center gap-4 p-4 rounded-lg ${getRankStyle(index + 1)}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {/* Rank */}
                                        <div className="w-10 h-10 flex items-center justify-center font-bold text-lg rounded-full"
                                            style={{ background: 'rgba(0,0,0,0.1)' }}>
                                            {index + 1}
                                        </div>

                                        {/* Medal for top 3 */}
                                        {index < 3 && (
                                            <Medal
                                                size={24}
                                                className={index === 0 ? 'text-yellow-600' : index === 1 ? 'text-gray-500' : 'text-amber-700'}
                                            />
                                        )}

                                        {/* Name */}
                                        <div className="flex-1">
                                            <p className="font-semibold text-lg">{score.name}</p>
                                        </div>

                                        {/* Time */}
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 font-mono font-bold text-lg">
                                                <Clock size={16} />
                                                {formatTime(score.time)}
                                            </div>
                                            <p className="text-xs opacity-60">
                                                {new Date(score.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-64 text-gray-400"
                            >
                                <Trophy size={48} className="mb-4 opacity-50" />
                                <p className="text-lg">No scores yet</p>
                                <p className="text-sm">Be the first to complete this level!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

export default Leaderboard;
