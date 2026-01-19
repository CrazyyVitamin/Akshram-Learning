# अक्षरम (Aksharam) 🎴

**Hindi Varnmala Mahjong Solitaire**

A beautiful, premium Mahjong Solitaire game featuring the Hindi alphabet (Devanagari script). Learn Hindi letters while enjoying the classic tile-matching puzzle experience with stunning 3D visuals!

![Made with React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## ✨ Features

- 🔤 **Hindi Varnmala Tiles** - Vowels (स्वर), Consonants (व्यंजन), and Conjuncts (संयुक्त अक्षर)
- 🎯 **Three Difficulty Levels**
  - **नवागंतुक (Navagantuk)** - Easy: 36 tiles, single layer
  - **अनुभवी (Anubhavi)** - Medium: 72 tiles, 2 layers
  - **श्रेष्ठ (Shreshtha)** - Hard: 144 tiles, 4+ layers
- 🎨 **Premium 3D Tiles** - Thick, tactile tiles with realistic shadows
- 🌅 **Bright Indian Aesthetic** - Cream parchment background with elegant motifs
- ⏱️ **Live Timer** - Starts on your first move
- 🔀 **Shuffle Feature** - Rearrange tiles with +10 second time penalty
- 🏆 **Leaderboard** - Separate high scores per difficulty level
- 🔊 **Sound Effects** - Satisfying click feedback
- 📱 **Responsive Design** - Works on desktop and mobile

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd aksharam
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit `http://localhost:5173`

---

## 🎮 How to Play

1. **Enter your name** on the landing screen
2. **Choose a difficulty level**
3. **Match tiles** - Click two identical Hindi letters to remove them
4. **Rules:**
   - Tiles must be "free" to be selected
   - A tile is free if:
     - No tile is stacked on top of it
     - At least one side (left OR right) is open
5. **Win** by clearing all tiles in the fastest time!

> **Note:** No hints are provided - find matches on your own! Using shuffle adds +10 seconds to your time.

---

## 🏗️ Project Structure

```
aksharam/
├── src/
│   ├── components/
│   │   ├── Tile.jsx           # 3D tile with animations & sound
│   │   ├── GameBoard.jsx      # Renders 3D tile layout
│   │   ├── GameScreen.jsx     # Main game play area
│   │   ├── LandingScreen.jsx  # Welcome & name input
│   │   ├── LevelSelect.jsx    # Difficulty selection
│   │   ├── Leaderboard.jsx    # Tabbed high scores display
│   │   ├── Timer.jsx          # Game timer component
│   │   ├── Controls.jsx       # Shuffle/Restart buttons
│   │   └── WinScreen.jsx      # Victory celebration
│   ├── hooks/
│   │   └── useGameLogic.js    # Game state management
│   ├── utils/
│   │   ├── tileData.js        # Hindi characters & levels config
│   │   ├── layouts.js         # 3D coordinate layouts
│   │   └── gameUtils.js       # Freedom algorithm, matching logic
│   ├── App.jsx                # Main app with navigation
│   ├── index.css              # Tailwind + 3D tile styles
│   └── main.jsx               # Entry point
├── package.json
└── README.md
```

---

## 🧮 Tile Blocking Algorithm

The game uses a 3D coordinate system `(x, y, z)` to determine tile clickability:

```javascript
/**
 * A tile is "free" (clickable) when:
 * 
 * 1. NO BLOCKING FROM ABOVE:
 *    No tile at layer z+1 overlaps this tile's area
 *    (checks if upper tile's x/y is within 1 unit of this tile)
 *    
 * 2. AT LEAST ONE SIDE OPEN:
 *    Left side: No tile at (x-1, y, z) with same y
 *    Right side: No tile at (x+1, y, z) with same y
 *    Must have at least one side open
 */
function isTileFree(tile, allTiles) {
  // Filter out matched tiles
  const activeTiles = allTiles.filter(t => !t.matched && t.id !== tile.id);
  
  // Check for tiles blocking from above
  const isBlockedFromAbove = activeTiles.some(other => {
    if (other.z <= tile.z) return false;
    const xOverlap = Math.abs(other.x - tile.x) < 1;
    const yOverlap = Math.abs(other.y - tile.y) < 1;
    return xOverlap && yOverlap;
  });
  
  if (isBlockedFromAbove) return false;
  
  // Check horizontal blocking
  const leftBlocked = activeTiles.some(other => 
    other.z === tile.z && 
    Math.abs(other.y - tile.y) < 0.5 && 
    Math.abs(other.x - (tile.x - 1)) < 0.5
  );
  
  const rightBlocked = activeTiles.some(other => 
    other.z === tile.z && 
    Math.abs(other.y - tile.y) < 0.5 && 
    Math.abs(other.x - (tile.x + 1)) < 0.5
  );
  
  return !(leftBlocked && rightBlocked);
}
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **Vite** | Build Tool |
| **Tailwind CSS** | Styling & 3D Effects |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **Web Audio API** | Sound Effects |
| **localStorage** | Leaderboard Persistence |

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Cream | `#FFF8E7` | Background, tile faces |
| Saffron | `#FF9933` | Buttons, accents |
| Maroon | `#800020` | Text, tile sides |
| Gold | `#FFD700` | Highlights, selected tiles |
| Parchment | `#FAF3E0` | Background texture |

---

## 📜 Hindi Characters Used

### स्वर (Vowels)
अ आ इ ई उ ऊ ऋ ए ऐ ओ औ अं अः

### व्यंजन (Consonants)
क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह

### संयुक्त अक्षर (Conjuncts)
क्ष त्र ज्ञ श्र

---

## 📝 License

MIT License - Feel free to use and modify!

---

Made with ♥ for learning Hindi
