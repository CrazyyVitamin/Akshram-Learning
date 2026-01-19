/**
 * Controls Component
 * Shuffle and navigation buttons (Hint removed per requirements)
 */

import { motion } from 'framer-motion';
import { Shuffle, RotateCcw, Home, AlertTriangle } from 'lucide-react';

export function Controls({
    shufflesRemaining,
    onShuffle,
    onRestart,
    onHome,
    gameStatus,
    shufflePenalty = 10
}) {
    const isPlaying = gameStatus === 'playing';

    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Shuffle Button with Time Penalty Warning */}
            <motion.button
                onClick={onShuffle}
                disabled={shufflesRemaining <= 0 || !isPlaying}
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={`Shuffle tiles (+${shufflePenalty}s penalty)`}
            >
                <Shuffle size={18} />
                <span>Shuffle</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: 'var(--saffron)', color: 'white' }}>
                    {shufflesRemaining}
                </span>
                <span className="text-xs opacity-70 ml-1">
                    (+{shufflePenalty}s)
                </span>
            </motion.button>

            {/* Restart Button */}
            <motion.button
                onClick={onRestart}
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <RotateCcw size={18} />
                <span>Restart</span>
            </motion.button>

            {/* Home Button */}
            <motion.button
                onClick={onHome}
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Home size={18} />
                <span>Menu</span>
            </motion.button>
        </div>
    );
}

export default Controls;
