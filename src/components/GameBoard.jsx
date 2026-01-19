/**
 * GameBoard Component
 * Renders the Mahjong tile layout with proper 3D stacking
 */

import { useMemo } from 'react';
import Tile from './Tile';

export function GameBoard({
    tiles,
    selectedTile,
    freeTiles,
    onTileClick
}) {
    // Calculate board dimensions based on tile positions
    const dimensions = useMemo(() => {
        if (tiles.length === 0) return { width: 500, height: 500 };

        const maxX = Math.max(...tiles.map(t => t.x));
        const maxY = Math.max(...tiles.map(t => t.y));
        const maxZ = Math.max(...tiles.map(t => t.z));

        const TILE_WIDTH = 66;
        const TILE_HEIGHT = 78;

        return {
            width: (maxX + 1) * TILE_WIDTH + maxZ * 4 + 80,
            height: (maxY + 1) * TILE_HEIGHT + 80,
        };
    }, [tiles]);

    // Get free tile IDs for quick lookup
    const freeTileIds = useMemo(() => {
        return new Set(freeTiles.map(t => t.id));
    }, [freeTiles]);

    return (
        <div className="relative mx-auto overflow-visible p-8">
            <div
                className="relative mx-auto"
                style={{
                    width: `${dimensions.width}px`,
                    height: `${dimensions.height}px`,
                    perspective: '1200px',
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Sort tiles by z for proper rendering order */}
                {[...tiles]
                    .sort((a, b) => a.z - b.z || a.y - b.y || a.x - b.x)
                    .map(tile => (
                        <Tile
                            key={tile.id}
                            tile={tile}
                            isSelected={selectedTile?.id === tile.id}
                            isFree={freeTileIds.has(tile.id)}
                            onClick={onTileClick}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GameBoard;
