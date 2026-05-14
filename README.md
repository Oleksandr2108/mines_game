# Mines Game

A browser-based Mines gambling game built with React and TypeScript. The player places a bet, selects a mines count, and reveals cells on a 5×5 grid — each safe cell increases the multiplier, hitting a mine ends the game. The player can cash out at any time to secure winnings.

---

## Live Demo

Backend API: `https://mines-be.vercel.app/api/`

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Zustand 5** | Global client state management |
| **TanStack React Query 5** | Server state, caching, mutations |
| **Axios** | HTTP client |
| **Tailwind CSS 4** | Utility-first styling |
| **tailwind-merge + clsx** | Conditional class merging |

---

## Project Structure

```
src/
├── App.tsx                        # Root layout (3-column grid)
├── main.tsx                       # Entry point, QueryClientProvider setup
│
├── assets/                        # SVG/PNG icons (dollar, bomb, gem, money bag)
│
├── components/
│   ├── BetHistory/
│   │   └── BetHistory.tsx         # Recent games list (horizontal scroll on mobile)
│   │
│   ├── BetSide/
│   │   ├── BetSide.tsx            # Betting panel layout
│   │   ├── useGameSession.ts      # Hook: game start/cashout logic, store sync
│   │   ├── BetAmountBox/
│   │   │   └── BetAmountBox.tsx   # Bet input + preset amounts + 1/2, x2, Max buttons
│   │   ├── BetBalance/
│   │   │   └── BetBalance.tsx     # Displays current balance
│   │   ├── BetButton/
│   │   │   └── BetButton.tsx      # Start Game / Cash Out button (fixed on mobile)
│   │   ├── BoxTag/
│   │   │   └── BoxTag.tsx         # Reusable clickable tag with disabled/active states
│   │   ├── InfoActiveGame/
│   │   │   └── InfoActiveGame.tsx # Shows multiplier, profit, gems found during game
│   │   └── MinesCountsBox/
│   │       └── MinesCountsBox.tsx # Mine count selector (1, 3, 5, 10, 24)
│   │
│   ├── GameResultPopup/
│   │   └── GameResultPopup.tsx    # Modal: win (cashout) or lose (mine hit) result
│   │
│   ├── Loader/
│   │   └── Loader.tsx             # Full-screen page loader and in-game start loader
│   │
│   ├── MinesGrid/
│   │   ├── MinesGrid.tsx          # 5×5 game grid
│   │   ├── useGridState.ts        # Hook: cell visuals, click handling, board state
│   │   └── Cell/
│   │       └── Cell.tsx           # Individual cell (inactive/hidden/gem/mine/loading)
│   │
│   └── Title/
│       └── Title.tsx              # Reusable uppercase heading
│
├── entities/
│   └── game/
│       ├── index.ts               # Barrel exports
│       ├── api/
│       │   └── gameApi.ts         # All API calls (start, reveal, cashout, history)
│       ├── model/
│       │   ├── constants.ts       # MINE_COUNT_OPTIONS
│       │   ├── types.ts           # All TypeScript interfaces and types
│       │   └── useIsGameActive.ts # Hook: returns true when game is in progress
│       ├── queries/
│       │   ├── gameKeys.ts              # React Query key factory
│       │   ├── useActiveGameQuery.ts    # Fetches active game on load
│       │   ├── useBalanceQuery.ts       # Fetches player balance
│       │   ├── useGameCashOutMutation.ts
│       │   ├── useGameHistoryQuery.ts
│       │   ├── useRevealCellMutation.ts
│       │   └── useStartGameMutation.ts
│       └── store/
│           └── useGameStore.ts    # Zustand store (bet, board, game state)
│
├── shared/
│   ├── api/
│   │   └── httpClient.ts          # Axios instance with base URL and player ID header
│   └── lib/
│       ├── formatMoney.ts         # Formats number to 2 decimal places
│       └── react-query/
│           └── queryClient.ts     # React Query global config
│
└── utils/
    └── styleUtils.ts              # cn() helper (clsx + tailwind-merge)
```

---

## Game Flow

1. Player sets **bet amount** and **mines count**
2. Clicks **Start Game** → POST `/games`
3. Grid activates — player clicks cells to reveal gems or mines
4. Each gem increases the multiplier; hitting a mine ends the game with a loss
5. Player can **Cash Out** at any time (available after revealing at least 1 gem) → POST `/games/{id}/cashout`
6. Result popup shows win/loss summary
7. Game history updates automatically

---

## State Management

- **Zustand** holds all client-side game state: bet amount, board cells, revealed cells, loading state, game result. `betAmount`, `minesCount`, and `gameId` are persisted to `localStorage`.
- **React Query** manages server state: balance, active game, history — with automatic caching and invalidation on mutations.

---

## Key Design Decisions

- `useGameSession` — separates all game orchestration logic from the `BetSide` layout component
- `useGridState` — separates cell logic from the `MinesGrid` render component
- `useIsGameActive` — single source of truth for whether a game is active, used across multiple components
- `useShallow` from Zustand — used in all store subscriptions to prevent unnecessary re-renders
