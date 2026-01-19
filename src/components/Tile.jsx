/**
 * Tile Component
 * Renders a single Mahjong tile with Hindi character
 * Premium 3D design with thick depth and realistic shadows
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

// Click sound for tactile feedback
const playClickSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
};

export function Tile({
    tile,
    isSelected,
    isFree,
    onClick
}) {
    const { character, x, y, z, matched } = tile;
    const hasPlayedSound = useRef(false);

    // Calculate position with 3D offset based on z-layer
    const TILE_WIDTH = 66;
    const TILE_HEIGHT = 78;
    const Z_OFFSET_X = 4;
    const Z_OFFSET_Y = -5;

    const style = {
        left: `${x * TILE_WIDTH + z * Z_OFFSET_X}px`,
        top: `${y * TILE_HEIGHT + z * Z_OFFSET_Y}px`,
        zIndex: z * 100 + Math.floor(y * 10) + Math.floor(x),
    };

    // Animation variants
    const variants = {
        initial: { scale: 0, opacity: 0, rotateY: -90 },
        animate: {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: z * 0.02
            }
        },
        exit: {
            scale: 0,
            opacity: 0,
            rotateY: 180,
            y: -20,
            transition: { duration: 0.4, ease: 'easeInOut' }
        },
        hover: isFree ? {
            y: -8,
            x: -2,
            transition: { duration: 0.2 }
        } : {},
        tap: isFree ? {
            scale: 0.96,
            transition: { duration: 0.1 }
        } : {}
    };

    const handleClick = () => {
        if (isFree) {
            playClickSound();
            onClick(tile);
        }
    };

    // Build class names
    const classNames = [
        'tile',
        'tile-font',
        isSelected && 'tile-selected',
        !isFree && 'tile-blocked'
    ].filter(Boolean).join(' ');

    return (
        <AnimatePresence>
            {!matched && (
                <motion.button
                    className={classNames}
                    style={style}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleClick}
                    disabled={!isFree}
                    aria-label={`Tile ${character}`}
                >
                    {/* Subtle pattern overlay */}
                    <div className="tile-pattern" />

                    {/* Top shine highlight for glossy look */}
                    <div className="tile-shine" />

                    {/* Character display */}
                    <span className="relative z-10 drop-shadow-sm">{character}</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}

export default Tile;
