# 🎮 My Career Portfolio - Interactive AI Playground

A modern, interactive career portfolio built with React and Vite, featuring an immersive AI-powered game arcade alongside a professional timeline showcasing 8+ years of software engineering experience.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [File Mapping & Relationships](#file-mapping--relationships)
- [Installation & Setup](#installation--setup)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)

---

## 🎯 Overview

This portfolio combines professional career information with interactive AI-powered games, demonstrating both technical expertise and creative problem-solving abilities. The project showcases:

- **Professional Timeline**: Career journey with detailed work experience
- **AI Game Arcade**: 6 interactive games with AI opponents and algorithms
- **Modern UI/UX**: Cyberpunk-inspired design with smooth animations
- **Responsive Design**: Optimized for all device sizes

---

## ✨ Features

### Professional Components
- **Header Section**: Profile photo, contact information, and social links (LinkedIn, WhatsApp, Email)
- **Career Timeline**: Chronological work history with skills and descriptions
- **Responsive Layout**: Mobile-first design approach

### Interactive Games
1. **Tic-Tac-Toe**: Unbeatable AI using Minimax algorithm
2. **Chess**: Multi-difficulty AI (Easy/Medium/Hard) with strategic evaluation
3. **Snake**: BFS pathfinding algorithm for AI autopilot
4. **2048**: Corner heuristic AI solver
5. **Minesweeper**: Probability constraint-based AI solver
6. **Connect Four**: Strategic AI with win/block detection

---

## 🛠 Tech Stack

### Core Technologies
- **React 19.2.6**: UI library for building component-based interfaces
- **Vite 8.0.12**: Next-generation frontend build tool
- **JavaScript (ES6+)**: Modern JavaScript features

### Game-Specific Libraries
- **chess.js 1.4.0**: Chess game logic and move validation
- **react-chessboard 5.10.0**: Chess board UI component

### Development Tools
- **ESLint**: Code linting and quality assurance
- **gh-pages**: GitHub Pages deployment automation

---

## 📁 Project Structure

```
my-career-portfolio/
├── public/                      # Static assets
│   ├── coding-bg.mp4           # Background video (unused in current version)
│   ├── favicon.svg             # Site favicon
│   ├── icons.svg               # Icon sprite sheet
│   └── profile.jpg             # Profile photo
│
├── src/                        # Source code
│   ├── components/             # React components
│   │   ├── Header.jsx          # Profile header with contact info
│   │   ├── Timeline.jsx        # Career timeline component
│   │   ├── TicTacToe.jsx       # Tic-Tac-Toe game with Minimax AI
│   │   ├── ChessGame.jsx       # Chess game with multi-level AI
│   │   ├── SnakeGame.jsx       # Snake game with BFS pathfinding
│   │   ├── Game2048.jsx        # 2048 game with heuristic AI
│   │   ├── Minesweeper.jsx     # Minesweeper with constraint solver
│   │   └── ConnectFour.jsx     # Connect Four with strategic AI
│   │
│   ├── assets/                 # Asset files
│   │   ├── hero.png            # Hero image
│   │   ├── react.svg           # React logo
│   │   └── vite.svg            # Vite logo
│   │
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── main.jsx                # Application entry point
│   ├── index.css               # Global styles
│   └── careerData.js           # Career timeline data
│
├── index.html                  # HTML entry point
├── package.json                # Project dependencies
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
└── .gitignore                  # Git ignore rules
```

---

## 🏗 Component Architecture

### Application Flow

```
index.html
    ↓
main.jsx (Entry Point)
    ↓
App.jsx (Root Component)
    ├── Header.jsx (Profile & Contact)
    ├── Game Selector UI (Arcade Dashboard)
    ├── Game Modal Overlay
    │   ├── TicTacToe.jsx
    │   ├── ChessGame.jsx
    │   ├── SnakeGame.jsx
    │   ├── Game2048.jsx
    │   ├── Minesweeper.jsx
    │   └── ConnectFour.jsx
    └── Timeline.jsx (Career History)
         ↓
    careerData.js (Data Source)
```

---

## 🗺 File Mapping & Relationships

### Core Application Files

| File | Purpose | Dependencies | Used By |
|------|---------|--------------|---------|
| `index.html` | HTML entry point | - | Browser |
| `main.jsx` | React app initialization | `App.jsx`, `index.css` | `index.html` |
| `App.jsx` | Root component & layout | All game components, `Header.jsx`, `Timeline.jsx`, `careerData.js` | `main.jsx` |
| `careerData.js` | Career data storage | - | `App.jsx`, `Timeline.jsx` |

### Component Relationships

#### 1. **Header Component** (`Header.jsx`)
- **Purpose**: Displays profile information and contact links
- **Dependencies**: None (standalone)
- **Data**: Hardcoded profile information
- **Features**:
  - Profile photo with fallback
  - LinkedIn, WhatsApp, Email links
  - Responsive flexbox layout

#### 2. **Timeline Component** (`Timeline.jsx`)
- **Purpose**: Renders career history timeline
- **Dependencies**: None
- **Props**: `data` (array from `careerData.js`)
- **Features**:
  - Chronological work history
  - Skill tags for each position
  - Themed styling with blue accents

#### 3. **Game Components**

##### TicTacToe.jsx
- **Algorithm**: Minimax with alpha-beta pruning
- **Modes**: Player vs Player, Player vs AI
- **State Management**: 
  - `board`: 9-cell array
  - `isXNext`: Turn tracker
  - `gameMode`: Mode selector
- **AI Logic**: Unbeatable minimax algorithm

##### ChessGame.jsx
- **Dependencies**: `chess.js`, `react-chessboard`
- **Modes**: Local 2P, AI (Easy/Medium/Hard)
- **State Management**:
  - `game`: Chess.js instance
  - `board`: 8x8 board state
  - `selectedSquare`: Move selection
  - `difficulty`: AI level
- **AI Logic**: 
  - Easy: 70% random moves
  - Medium: Greedy material capture
  - Hard: Lookahead with defensive checks

##### SnakeGame.jsx
- **Algorithm**: BFS (Breadth-First Search) pathfinding
- **Modes**: Manual (keyboard), AI autopilot
- **State Management**:
  - `snake`: Array of coordinates
  - `food`: Target coordinates
  - `dir`: Movement direction
  - `isBot`: AI toggle
- **AI Logic**: BFS finds shortest safe path to food

##### Game2048.jsx
- **Algorithm**: Corner heuristic evaluation
- **Modes**: Manual (buttons/arrows), AI solver
- **State Management**:
  - `board`: 4x4 grid
  - `score`: Current score
  - `isBot`: AI toggle
- **AI Logic**: Weighted corner strategy prioritizing high-value tiles in corners

##### Minesweeper.jsx
- **Algorithm**: Constraint satisfaction + flood fill
- **Modes**: Manual play, AI step-by-step solver
- **State Management**:
  - `grid`: 8x8 cell array with mine/count data
  - `gameOver`: Loss state
  - `victory`: Win state
- **AI Logic**: 
  - Rule-based constraint solving
  - Flood fill for safe cell revelation
  - Probabilistic guessing fallback

##### ConnectFour.jsx
- **Algorithm**: Win/block detection with lookahead
- **Modes**: Player vs Player, Player vs AI
- **State Management**:
  - `board`: 6x7 grid
  - `isYellowTurn`: Turn tracker
  - `winner`: Game result
  - `gameMode`: Mode selector
- **AI Logic**: 
  - Immediate win detection
  - Block opponent wins
  - Random valid move fallback

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      App.jsx (State)                     │
│  - activeGame: string (game selector)                    │
│  - Manages game modal visibility                         │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌───────────────┐  ┌─────────────────┐  ┌──────────────┐
│  Header.jsx   │  │  Game Buttons   │  │ Timeline.jsx │
│  (Static)     │  │  (6 games)      │  │ (Props)      │
└───────────────┘  └─────────────────┘  └──────────────┘
                            │                   │
                            ↓                   ↓
                   ┌─────────────────┐  ┌──────────────┐
                   │  Game Modal     │  │ careerData.js│
                   │  (Conditional)  │  │ (Data Source)│
                   └─────────────────┘  └──────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ TicTacToe    │   │ ChessGame    │   │ SnakeGame    │
│ (Minimax AI) │   │ (Multi-AI)   │   │ (BFS AI)     │
└──────────────┘   └──────────────┘   └──────────────┘
        ↓                   ↓                   ↓
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Game2048     │   │ Minesweeper  │   │ ConnectFour  │
│ (Heuristic)  │   │ (Constraint) │   │ (Strategic)  │
└──────────────┘   └──────────────┘   └──────────────┘
```

### State Management Pattern

Each game component follows this pattern:
1. **Local State**: Uses React `useState` for game state
2. **Effect Hooks**: `useEffect` for AI automation and game loops
3. **Event Handlers**: User interactions trigger state updates
4. **Conditional Rendering**: Menu → Game → Results flow

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prasanatma/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run deploy` | Deploy to GitHub Pages |

---

## 🌐 Deployment

### GitHub Pages Deployment

The project is configured for automatic deployment to GitHub Pages:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Configuration**
   - Base path is set in `vite.config.js`: `/my-portfolio/`
   - Deployment branch: `gh-pages`
   - Live URL: `https://prasanatma.github.io/my-portfolio/`

### Environment Configuration

The `vite.config.js` includes:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/', // GitHub Pages base path
})
```

---

## 🎨 Design System

### Color Palette
- **Primary Background**: `#06060f` (Dark navy)
- **Accent Color**: `#00bcd4` (Cyan blue)
- **Success**: `#25D366` (Green)
- **Warning**: `#ffc107` (Yellow)
- **Danger**: `#dc3545` (Red)

### Typography
- **Font Family**: "Segoe UI", Roboto, Helvetica, Arial, sans-serif
- **Responsive**: Scales appropriately for mobile devices

### Layout
- **Max Width**: 900px for main content
- **Grid Background**: Animated cyberpunk-style grid pattern
- **Modal Overlay**: Full-screen game experience

---

## 🧩 Key Features Breakdown

### AI Algorithms Implemented

1. **Minimax Algorithm** (Tic-Tac-Toe)
   - Recursive game tree exploration
   - Optimal move selection
   - Unbeatable AI opponent

2. **Heuristic Evaluation** (Chess, 2048)
   - Material value assessment
   - Position scoring
   - Multi-level difficulty

3. **Pathfinding** (Snake)
   - BFS shortest path
   - Collision avoidance
   - Dynamic target tracking

4. **Constraint Satisfaction** (Minesweeper)
   - Rule-based deduction
   - Probability calculation
   - Safe cell identification

5. **Strategic Lookahead** (Connect Four)
   - Win condition checking
   - Defensive blocking
   - Offensive positioning

---

## 📱 Responsive Design

- **Desktop**: Full-featured experience with optimal spacing
- **Tablet**: Adjusted layouts with maintained functionality
- **Mobile**: Touch-optimized controls and compact UI

---

## 🔧 Customization Guide

### Adding New Career Data

Edit `src/careerData.js`:
```javascript
export const careerData = [
  {
    id: 1,
    role: "Your Role",
    company: "Company Name",
    duration: "MM/YYYY - MM/YYYY",
    description: "Your description",
    skills: ["Skill1", "Skill2", "Skill3"]
  }
];
```

### Updating Profile Information

Edit `src/components/Header.jsx`:
- Update `linkedinUrl` with your LinkedIn profile
- Update `whatsappUrl` with your phone number
- Replace `profile.jpg` in the `public/` folder

### Adding New Games

1. Create new component in `src/components/`
2. Import in `App.jsx`
3. Add button in game selector section
4. Add conditional rendering in game modal

---

## 📄 License

This project is open source and available for personal and educational use.

---

## 👤 Author

**Prasanatma P Anvekar**
- LinkedIn: [prasanatma-p-anvekar](https://www.linkedin.com/in/prasanatma-p-anvekar-aab440112)
- Email: prasanatmaanvekar@gmail.com
- GitHub: [@Prasanatma](https://github.com/Prasanatma)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for blazing-fast build tooling
- chess.js for chess game logic
- Open source community for inspiration

---

## 📊 Project Statistics

- **Total Components**: 8 (1 layout + 1 timeline + 6 games)
- **Lines of Code**: ~1,500+ lines
- **AI Algorithms**: 5 different implementations
- **Game Modes**: 12+ variations (PvP + AI modes)
- **Dependencies**: 3 production, 8 development

---

**Built with ❤️ using React + Vite**
