export type GameStatus = "idle" | "in_progress" | "won" | "lost";

export type GameResult =
  | { type: "mine"; betAmount: number }
  | { type: "cashout"; multiplier: number; winAmount: number; profit: number };

export interface BalanceResponse {
  balance: number;
}

export type CellType = "gem" | "mine";

export interface RevealedCell {
  row: number;
  col: number;
  type: CellType;
}

export interface GameState {
  gameId: string;
  minesCount: number;
  betAmount: number;
  status: "active" | "won" | "lost";
  revealedCells: RevealedCell[];
  balance: number;
}

export interface GameCashOutResponse {
  status: "won";
  cashedOutMultiplier: number;
  winAmount: number;
  profit: number;
  balance: number;
  fullBoard: CellType[][];
}

export interface ActiveGameResponse {
  gameId: string;
  minesCount: number;
  betAmount: number;
  currentMultiplier: number;
  status: "active";
  revealedCells: RevealedCell[];
  gemsFound: number;
  nextMultiplier: number;
}

export type RevealCellResponse =
  | {
      currentMultiplier: number;
      gemsFound: number;
      nextMultiplier: number;
      result: "gem";
      revealedCells: RevealedCell[];
      status: "active" | "won";
    }
  | {
      balance: number;
      fullBoard: CellType[][];
      result: "mine";
      revealedCell: RevealedCell;
      status: "lost";
    };

export interface StartGamePayload {
  betAmount: number;
  minesCount: number;
}

export interface RevealCellPayload {
  row: number;
  col: number;
}

export interface GameHistoryItem {
  gameId: string;
  betAmount: number;
  minesCount: number;
  status: GameStatus;
  multiplier: number | null;
  profit: number | null;
  gemsFound: number;
  createdAt: string;
}

export interface GameHistoryResponse {
  games: GameHistoryItem[];
}
