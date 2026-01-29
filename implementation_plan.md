# Implementation Plan - Aksharam Game Updates

This plan details the changes to modernize the game's theme, adjust game mechanics (shuffle penalty, hints), and improve animation smoothness.

## User Review Required

> [!IMPORTANT]
> **Theme Change**: The theme will be updated to a "Premium Mystic/Cosmic" dark theme (Deep Purples, Golds, Neon accents) to replace the current "Bright Indian Parchment" theme.
> **Hint Count**: The hint counts will be set to: Easy (1), Medium (2), Hard (3) as strictly requested, reversing the detailed standard where easier levels usually get more hints.
> **Shuffle Penalty**: The 10-second time penalty for shuffling will be removed entirely.

## Proposed Changes

### Styles & Theme
#### [MODIFY] [index.css](file:///d:/Projects/Antigravity/aksharam/src/index.css)
- Update `:root` variables to a new "Cosmic Wisdom" color palette.
- Replace background gradients with a dark, premium deep-space or mystic background.
- Update Tile 3D colors to suit the dark theme (e.g., Ivory/Gold or Jade/Silver).
- Update Button styles to be glassmorphic/neon.

### Game Logic & Configuration
#### [MODIFY] [tileData.js](file:///d:/Projects/Antigravity/aksharam/src/utils/tileData.js)
- Update `DIFFICULTY_LEVELS` objects:
  - `navagantuk` (Easy): Set `hints: 1`
  - `anubhavi` (Medium): Set `hints: 2`
  - `shreshtha` (Hard): Set `hints: 3`

#### [MODIFY] [useGameLogic.js](file:///d:/Projects/Antigravity/aksharam/src/hooks/useGameLogic.js)
- Remove `SHUFFLE_PENALTY` constant and logic in `useShuffle`.
- Add `hintsRemaining` state (initialized from config).
- Add `activeHint` state (to store the pair of tiles currently being hinted).
- Add `useHint` function:
  - Calls `findHint`.
  - If pair found, set `activeHint` and decrement `hintsRemaining`.
  - Clear `activeHint` after a few seconds or when a tile is clicked.
- Return `hintsRemaining`, `activeHint`, and `useHint`.

### Components
#### [MODIFY] [Controls.jsx](file:///d:/Projects/Antigravity/aksharam/src/components/Controls.jsx)
- Remove penalty text from Shuffle button.
- Add "Hint" button with `Lightbulb` icon.
- Display `hintsRemaining` badge on the button.

#### [MODIFY] [GameScreen.jsx](file:///d:/Projects/Antigravity/aksharam/src/components/GameScreen.jsx)
- Pass `hintsRemaining`, `useHint`, and `activeHint` to children.
- Pass `activeHint` to `GameBoard` (which passes to `Tile`).
- Remove "Shuffle Penalty" warning logic from the "Stuck" screen.

#### [MODIFY] [GameBoard.jsx](file:///d:/Projects/Antigravity/aksharam/src/components/GameBoard.jsx)
- Accept `activeHint` prop.
- Check if a tile is in `activeHint` and pass `isHinted` prop to `Tile`.

#### [MODIFY] [Tile.jsx](file:///d:/Projects/Antigravity/aksharam/src/components/Tile.jsx)
- Add `isHinted` prop.
- Add animation/style for `isHinted` (e.g., pulsing glow).
- **Smoothness**: Adjust `framer-motion` spring transition to be softer (lower stiffness, lower damping) for a smoother feel.

## Verification Plan

### Manual Verification
1.  **Theme Check**: accurate dark theme colors, readable text, premium look.
2.  **Shuffle**: Click shuffle, verify NO time is added to timer.
3.  **Hints**:
    - Start Easy game, check Hint count is 1.
    - Click Hint, see two tiles glow.
    - Check Hint count decreases.
    - Repeat for Medium (2) and Hard (3).
4.  **Smoothness**: Play the game, observe tile entry/exit/hover animations. They should feel "buttery" and not jerky.
