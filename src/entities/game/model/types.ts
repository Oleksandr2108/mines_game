export type GameStatus = "idle" | "in_progress" | "won" | "lost";

export interface BalanceResponse {
  balance: number;
}

export interface GameCell {
  row: number;
  col: number;
  type: "gem" | "mine";
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

export interface RevealGemResponse {
  currentMultiplier: number;
  gemsFound: number;
  nextMultiplier: number;
  result: "gem";
  revealedCells: RevealedCell[];
  status: "active" | "won";
}

export interface RevealMineResponse {
  balance: number;
  fullBoard: CellType[][];
  result: "mine";
  revealedCell: RevealedCell;
  status: "lost";
}

export type RevealCellResponse = RevealGemResponse | RevealMineResponse;

export interface StartGamePayload {
  betAmount: number;
  minesCount: number;
}

export interface RevealCellPayload {
  row: number;
  col: number;
}
