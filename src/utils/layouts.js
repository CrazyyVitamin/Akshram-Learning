/**
 * Level Layouts for Mahjong Solitaire
 * 
 * Each layout defines tile positions using a 3D coordinate system:
 * - x: column position (0, 1, 2, ...)
 * - y: row position (0, 1, 2, ...)
 * - z: layer/height (0 = bottom, higher = stacked on top)
 * 
 * The Tile component will convert these to pixel positions.
 */

/**
 * Navagantuk (Easy) Layout - 36 tiles
 * Simple flat layout with no stacking
 * 6 rows × 6 columns, single layer
 */
export const NAVAGANTUK_LAYOUT = [];

// Create a 6x6 flat grid (z=0)
for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
        NAVAGANTUK_LAYOUT.push({
            x: col,
            y: row,
            z: 0
        });
    }
}

/**
 * Anubhavi (Medium) Layout - 72 tiles
 * Two-layer pyramid with stacking
 * Base layer: 48 tiles (8x6), Top layer: 24 tiles (6x4)
 */
export const ANUBHAVI_LAYOUT = [];

// Base layer (z=0) - 8x6 grid = 48 tiles
for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
        ANUBHAVI_LAYOUT.push({
            x: col,
            y: row,
            z: 0
        });
    }
}

// Second layer (z=1) - 6x4 grid = 24 tiles (centered)
for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
        ANUBHAVI_LAYOUT.push({
            x: col + 1,  // Offset by 1 to center
            y: row + 1,
            z: 1
        });
    }
}

/**
 * Shreshtha (Hard) Layout - 144 tiles
 * Classic Mahjong pyramid with 4+ layers
 * Inspired by traditional Turtle layout
 */
export const SHRESHTHA_LAYOUT = [];

// Layer 0 (Base) - 12x6 grid = 72 tiles
for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 12; col++) {
        SHRESHTHA_LAYOUT.push({
            x: col,
            y: row,
            z: 0
        });
    }
}

// Layer 1 - 10x4 = 40 tiles (centered)
for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 10; col++) {
        SHRESHTHA_LAYOUT.push({
            x: col + 1,
            y: row + 1,
            z: 1
        });
    }
}

// Layer 2 - 6x3 = 18 tiles (centered)
for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 6; col++) {
        SHRESHTHA_LAYOUT.push({
            x: col + 3,
            y: row + 1.5,
            z: 2
        });
    }
}

// Layer 3 - 4x2 = 8 tiles (centered)
for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
        SHRESHTHA_LAYOUT.push({
            x: col + 4,
            y: row + 2,
            z: 3
        });
    }
}

// Layer 4 - 2x2 = 4 tiles
for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
        SHRESHTHA_LAYOUT.push({
            x: col + 5,
            y: row + 2,
            z: 4
        });
    }
}

// Cap - 2 tiles at the very top
SHRESHTHA_LAYOUT.push({ x: 5.5, y: 2.5, z: 5 });
SHRESHTHA_LAYOUT.push({ x: 6.5, y: 2.5, z: 5 });

// Total: 72 + 40 + 18 + 8 + 4 + 2 = 144 tiles ✓

/**
 * Get layout by difficulty level
 */
export function getLayout(difficulty) {
    switch (difficulty) {
        case 'navagantuk':
            return NAVAGANTUK_LAYOUT;
        case 'anubhavi':
            return ANUBHAVI_LAYOUT;
        case 'shreshtha':
            return SHRESHTHA_LAYOUT;
        default:
            return NAVAGANTUK_LAYOUT;
    }
}

export default { NAVAGANTUK_LAYOUT, ANUBHAVI_LAYOUT, SHRESHTHA_LAYOUT, getLayout };
