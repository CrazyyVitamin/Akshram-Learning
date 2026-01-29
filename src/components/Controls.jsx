/**
 * Controls Component
 * Shuffle and navigation buttons (Hint removed per requirements)
 */

import { motion } from 'framer-motion';
import { Shuffle, RotateCcw, Home, Lightbulb } from 'lucide-react';

export function Controls({
    shufflesRemaining,
    hintsRemaining,
    onShuffle,
    onHint,
    onRestart,
    onHome,
    gameStatus
}) {
    const isPlaying = gameStatus === 'playing';

    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Hint Button */}
            <motion.button
                onClick={onHint}
                disabled={hintsRemaining <= 0 || !isPlaying}
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Get a hint for matching tiles"
            >
                <Lightbulb size={18} />
                <span>Hint</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: 'var(--gold)', color: 'var(--text-dark)' }}>
                    {hintsRemaining}
                </span>
            </motion.button>

            {/* Shuffle Button */}
            <motion.button
                onClick={onShuffle}
                disabled={shufflesRemaining <= 0 || !isPlaying}
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Shuffle tiles"
            >
                <Shuffle size={18} />
                <span>Shuffle</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: 'var(--saffron)', color: 'white' }}>
                    {shufflesRemaining}
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
