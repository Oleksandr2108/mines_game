export type GameStatus = "idle" | "in_progress" | "won" | "lost";

export interface BalanceResponse {
balance: number;
}


export interface GameCell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

export interface GameState {
  id: string;
  status: GameStatus;
  board: GameCell[][];
  minesCount: number;
  revealedCount: number;
}

export interface StartGamePayload {
  rows: number;
  cols: number;
  mines: number;
}

export interface RevealCellPayload {
  row: number;
  col: number;
}
