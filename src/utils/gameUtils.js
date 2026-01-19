/**
 * Game Utilities for Mahjong Solitaire
 * 
 * This file contains the core game logic including:
 * - Tile freedom detection algorithm
 * - Matching validation
 * - Hint finding
 * - Shuffle functionality
 */

import { getLayout } from './layouts';
import { DIFFICULTY_LEVELS } from './tileData';

/**
 * TILE FREEDOM ALGORITHM
 * 
 * A tile at position (x, y, z) is considered "free" (clickable) when:
 * 
 * 1. NO TILE ON TOP: No tile exists at layer z+1 that covers/overlaps this tile.
 *    - A tile covers another if their x positions overlap AND y positions are close
 *    - For stacked layers, check if any tile at z+1 is at or near this position
 * 
 * 2. AT LEAST ONE SIDE OPEN: Either the left OR right side is unblocked.
 *    - Left blocked: A tile exists at same z with x = tile.x - 1 and same y
 *    - Right blocked: A tile exists at same z with x = tile.x + 1 and same y
 * 
 * @param {Object} tile - The tile to check { id, x, y, z, character, matched }
 * @param {Array} allTiles - Array of all remaining (unmatched) tiles
 * @returns {boolean} True if tile is free and clickable
 */
export function isTileFree(tile, allTiles) {
    // Filter out matched tiles
    const activeTiles = allTiles.filter(t => !t.matched && t.id !== tile.id);

    // Check 1: Is there a tile on top blocking this one?
    const isBlockedFromAbove = activeTiles.some(other => {
        // Must be on a higher layer
        if (other.z <= tile.z) return false;

        // Check if the upper tile overlaps this tile's position
        // Upper tiles can partially overlap if their x/y are within 0.9 units
        const xOverlap = Math.abs(other.x - tile.x) < 1;
        const yOverlap = Math.abs(other.y - tile.y) < 1;

        return xOverlap && yOverlap;
    });

    if (isBlockedFromAbove) return false;

    // Check 2: Are both sides blocked at the same level?
    // A tile blocks if it's at the adjacent x position with same/similar y
    const leftBlocked = activeTiles.some(other => {
        return other.z === tile.z &&
            Math.abs(other.y - tile.y) < 0.5 &&
            Math.abs(other.x - (tile.x - 1)) < 0.5;
    });

    const rightBlocked = activeTiles.some(other => {
        return other.z === tile.z &&
            Math.abs(other.y - tile.y) < 0.5 &&
            Math.abs(other.x - (tile.x + 1)) < 0.5;
    });

    // Tile is free if at least one side is open
    return !(leftBlocked && rightBlocked);
}

/**
 * Check if two tiles can be matched
 * Both tiles must be free and have the same character
 * 
 * @param {Object} tile1 - First tile
 * @param {Object} tile2 - Second tile
 * @param {Array} allTiles - All tiles in the game
 * @returns {boolean} True if tiles can be matched
 */
export function canMatch(tile1, tile2, allTiles) {
    if (tile1.id === tile2.id) return false;
    if (tile1.character !== tile2.character) return false;
    if (tile1.matched || tile2.matched) return false;

    return isTileFree(tile1, allTiles) && isTileFree(tile2, allTiles);
}

/**
 * Find a valid matching pair for hint
 * Returns the first valid pair found, or null if no moves available
 * 
 * @param {Array} tiles - All tiles in the game
 * @returns {Array|null} [tile1, tile2] or null
 */
export function findHint(tiles) {
    const activeTiles = tiles.filter(t => !t.matched);
    const freeTiles = activeTiles.filter(t => isTileFree(t, activeTiles));

    // Find matching pair among free tiles
    for (let i = 0; i < freeTiles.length; i++) {
        for (let j = i + 1; j < freeTiles.length; j++) {
            if (freeTiles[i].character === freeTiles[j].character) {
                return [freeTiles[i], freeTiles[j]];
            }
        }
    }

    return null;
}

/**
 * Check if the game is solvable (has at least one valid move)
 * 
 * @param {Array} tiles - All tiles in the game
 * @returns {boolean} True if game has valid moves
 */
export function hasMoves(tiles) {
    return findHint(tiles) !== null;
}

/**
 * Shuffle tile characters while maintaining positions
 * Ensures the resulting layout is solvable
 * 
 * @param {Array} tiles - All tiles in the game
 * @returns {Array} New array with shuffled characters
 */
export function shuffleTiles(tiles) {
    const activeTiles = tiles.filter(t => !t.matched);
    const matchedTiles = tiles.filter(t => t.matched);

    // Extract characters from active tiles
    let characters = activeTiles.map(t => t.character);

    // Fisher-Yates shuffle
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }

    // Reassign characters to tiles
    const shuffledActive = activeTiles.map((tile, index) => ({
        ...tile,
        character: characters[index]
    }));

    // Combine with matched tiles
    const newTiles = [...shuffledActive, ...matchedTiles];

    // Verify solvability - if not solvable, reshuffle
    if (!hasMoves(newTiles) && activeTiles.length > 1) {
        return shuffleTiles(tiles); // Recursive retry
    }

    return newTiles;
}

/**
 * Generate tiles for a new game
 * Creates pairs of characters distributed across the layout
 * 
 * @param {string} difficulty - Difficulty level key
 * @returns {Array} Array of tile objects
 */
export function generateTiles(difficulty) {
    const config = DIFFICULTY_LEVELS[difficulty];
    const layout = getLayout(difficulty);

    // Ensure we have enough positions
    const tileCount = Math.min(layout.length, config.tileCount);
    const pairCount = Math.floor(tileCount / 2);

    // Select characters for pairs
    const availableChars = [...config.characters];
    const selectedChars = [];

    for (let i = 0; i < pairCount; i++) {
        // Cycle through available characters
        const charIndex = i % availableChars.length;
        selectedChars.push(availableChars[charIndex]);
        selectedChars.push(availableChars[charIndex]); // Add pair
    }

    // Shuffle the characters
    for (let i = selectedChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedChars[i], selectedChars[j]] = [selectedChars[j], selectedChars[i]];
    }

    // Create tiles with positions from layout
    const tiles = layout.slice(0, tileCount).map((pos, index) => ({
        id: `tile-${index}`,
        x: pos.x,
        y: pos.y,
        z: pos.z,
        character: selectedChars[index],
        matched: false
    }));

    // Verify solvability
    if (!hasMoves(tiles)) {
        // Regenerate if no valid moves
        return generateTiles(difficulty);
    }

    return tiles;
}

/**
 * Format time in MM:SS format
 * 
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get leaderboard from localStorage
 * 
 * @param {string} difficulty - Difficulty level
 * @returns {Array} Array of score entries sorted by time
 */
export function getLeaderboard(difficulty) {
    const key = `aksharam-leaderboard-${difficulty}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

/**
 * Save score to leaderboard
 * 
 * @param {string} difficulty - Difficulty level
 * @param {string} name - Player name
 * @param {number} time - Completion time in seconds
 * @returns {number} Player's rank (1-indexed)
 */
export function saveScore(difficulty, name, time) {
    const key = `aksharam-leaderboard-${difficulty}`;
    const leaderboard = getLeaderboard(difficulty);

    const entry = {
        name,
        time,
        date: new Date().toISOString()
    };

    leaderboard.push(entry);

    // Sort by time (ascending - lower is better)
    leaderboard.sort((a, b) => a.time - b.time);

    // Keep only top 10
    const trimmed = leaderboard.slice(0, 10);

    localStorage.setItem(key, JSON.stringify(trimmed));

    // Return player's rank
    return trimmed.findIndex(e => e.name === name && e.time === time && e.date === entry.date) + 1;
}

export default {
    isTileFree,
    canMatch,
    findHint,
    hasMoves,
    shuffleTiles,
    generateTiles,
    formatTime,
    getLeaderboard,
    saveScore
};
