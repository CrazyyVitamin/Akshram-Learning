/**
 * Custom hook for Mahjong game state management
 * Hint functionality removed per requirements
 * Shuffle adds time penalty
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    generateTiles,
    isTileFree,
    canMatch,
    hasMoves,
    shuffleTiles,
    saveScore,
    findHint
} from '../utils/gameUtils';
import { DIFFICULTY_LEVELS } from '../utils/tileData';

export function useGameLogic(difficulty, playerName) {
    const [tiles, setTiles] = useState([]);
    const [selectedTile, setSelectedTile] = useState(null);
    const [gameStatus, setGameStatus] = useState('idle'); // idle, playing, won, stuck
    const [timer, setTimer] = useState(0);
    const [shufflesRemaining, setShufflesRemaining] = useState(0);
    const [hintsRemaining, setHintsRemaining] = useState(0);
    const [activeHint, setActiveHint] = useState(null);
    const [rank, setRank] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState(0);

    const config = DIFFICULTY_LEVELS[difficulty];

    // Initialize game
    const initGame = useCallback(() => {
        const newTiles = generateTiles(difficulty);
        setTiles(newTiles);
        setSelectedTile(null);
        setGameStatus('idle');
        setTimer(0);
        setShufflesRemaining(config.shuffles);
        setHintsRemaining(config.hints);
        setActiveHint(null);
        setRank(null);
        setMatchedPairs(0);
    }, [difficulty, config]);

    // Start timer when game starts
    useEffect(() => {
        let interval;
        if (gameStatus === 'playing') {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameStatus]);

    // Calculate free tiles
    const freeTiles = useMemo(() => {
        return tiles.filter(t => !t.matched && isTileFree(t, tiles));
    }, [tiles]);

    // Check for game won
    useEffect(() => {
        const remainingTiles = tiles.filter(t => !t.matched);
        if (remainingTiles.length === 0 && tiles.length > 0 && gameStatus === 'playing') {
            setGameStatus('won');
            const playerRank = saveScore(difficulty, playerName, timer);
            setRank(playerRank);
        }
    }, [tiles, gameStatus, difficulty, playerName, timer]);

    // Check if game is stuck
    useEffect(() => {
        if (gameStatus === 'playing' && tiles.filter(t => !t.matched).length > 0) {
            if (!hasMoves(tiles)) {
                setGameStatus('stuck');
            }
        }
    }, [tiles, gameStatus]);

    // Handle tile click
    const handleTileClick = useCallback((tile) => {
        // Start the game on first click
        if (gameStatus === 'idle') {
            setGameStatus('playing');
        }

        // Check if tile is free
        if (!isTileFree(tile, tiles)) return;

        if (!selectedTile) {
            // First tile selected
            setSelectedTile(tile);
        } else if (selectedTile.id === tile.id) {
            // Deselect same tile
            setSelectedTile(null);
        } else if (canMatch(selectedTile, tile, tiles)) {
            // Match found!
            setTiles(prev => prev.map(t => {
                if (t.id === selectedTile.id || t.id === tile.id) {
                    return { ...t, matched: true };
                }
                return t;
            }));
            setSelectedTile(null);
            setMatchedPairs(prev => prev + 1);
        } else {
            // No match, select new tile
            setSelectedTile(tile);
        }
    }, [gameStatus, selectedTile, tiles]);

    // Use shuffle (no penalty)
    const useShuffle = useCallback(() => {
        if (shufflesRemaining <= 0 || (gameStatus !== 'playing' && gameStatus !== 'stuck')) return;

        const shuffled = shuffleTiles(tiles);
        setTiles(shuffled);
        setShufflesRemaining(prev => prev - 1);
        setSelectedTile(null);
        setActiveHint(null);

        // If we were stuck, go back to playing
        if (gameStatus === 'stuck') {
            setGameStatus('playing');
        }
    }, [shufflesRemaining, tiles, gameStatus]);

    // Use hint
    const useHint = useCallback(() => {
        if (hintsRemaining <= 0 || gameStatus !== 'playing') return;

        const hintPair = findHint(tiles);
        if (hintPair) {
            setActiveHint(hintPair);
            setHintsRemaining(prev => prev - 1);

            // Clear hint after 3 seconds
            setTimeout(() => {
                setActiveHint(null);
            }, 3000);
        }
    }, [hintsRemaining, tiles, gameStatus]);

    // Initialize on mount
    useEffect(() => {
        initGame();
    }, [initGame]);

    return {
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
        totalPairs: config.pairs,
        handleTileClick,
        useShuffle,
        useHint,
        restartGame: initGame
    };
}

export default useGameLogic;
