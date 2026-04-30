import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MINE_COUNT_OPTIONS } from "../model/constants";
import type {
  CellType,
  GameResult,
  RevealCellResponse,
  RevealedCell,
} from "../model/types";

export type Difficulty = "easy" | "medium" | "hard";
export type LocalGameStatus = "idle" | "in_progress" | "won" | "lost";

interface GameStoreState {
  balance: number;
  betAmount: number;
  balanceLimit: number;
  minesCount: number;
  gameId?: string;
  revealedCells: RevealedCell[];
  fullBoard: CellType[][] | null;
  hitMineCell: RevealedCell | null;
  loadingCellKey: string | null;
  lastRevealResponse: RevealCellResponse | null;
  gameResult: GameResult | null;
  setBalance: (balance: number) => void;
  setGameId: (id: string) => void;
  setMinesCount: (count: number) => void;
  setBalanceLimit: (balance: number) => void;
  setBetAmount: (amount: number) => void;
  doubleBet: () => void;
  halfBet: () => void;
  maxBet: () => void;
  setRevealedCells: (cells: RevealedCell[]) => void;
  setFullBoard: (board: CellType[][] | null) => void;
  setHitMineCell: (cell: RevealedCell | null) => void;
  setLoadingCellKey: (key: string | null) => void;
  setLastRevealResponse: (response: RevealCellResponse | null) => void;
  setGameResult: (result: GameResult | null) => void;
  resetBoardState: () => void;
}

const MIN_BET = 1;
const MAX_BET = 1_0000;

function getMaxAllowed(balanceLimit: number) {
  return Math.max(0, Math.min(balanceLimit, MAX_BET));
}

function clampBet(amount: number, balanceLimit: number) {
  const maxAllowed = getMaxAllowed(balanceLimit);
  const minAllowed = maxAllowed < MIN_BET ? 0 : MIN_BET;
  return Math.max(minAllowed, Math.min(amount, maxAllowed));
}

export const useGameStore = create<GameStoreState>()(
  persist(
    (set) => ({
      balance: 0,
      betAmount: MIN_BET,
      balanceLimit: MAX_BET,
      minesCount: MINE_COUNT_OPTIONS[0],
      gameId: undefined,
      revealedCells: [],
      fullBoard: null,
      hitMineCell: null,
      loadingCellKey: null,
      lastRevealResponse: null,
      gameResult: null,
      setBalance: (balance: number) => set({ balance }),
      setGameId: (id: string) =>
        set({
          gameId: id,
          revealedCells: [],
          fullBoard: null,
          hitMineCell: null,
          loadingCellKey: null,
          lastRevealResponse: null,
        }),
      setBalanceLimit: (balance: number) =>
        set((state) => ({
          balanceLimit: Math.max(0, balance),
          betAmount: clampBet(state.betAmount, balance),
        })),
      setBetAmount: (amount: number) => {
        set((state) => ({
          betAmount: clampBet(amount, state.balanceLimit),
        }));
      },
      doubleBet: () =>
        set((state) => ({
          betAmount: clampBet(state.betAmount * 2, state.balanceLimit),
        })),
      halfBet: () =>
        set((state) => ({
          betAmount: clampBet(
            Math.floor(state.betAmount / 2),
            state.balanceLimit,
          ),
        })),
      maxBet: () =>
        set((state) => ({
          betAmount: getMaxAllowed(state.balanceLimit),
        })),

      setMinesCount: (count: number) => set({ minesCount: count }),
      setRevealedCells: (cells: RevealedCell[]) =>
        set({ revealedCells: cells }),
      setFullBoard: (board: CellType[][] | null) => set({ fullBoard: board }),
      setHitMineCell: (cell: RevealedCell | null) => set({ hitMineCell: cell }),
      setLoadingCellKey: (key: string | null) => set({ loadingCellKey: key }),
      setLastRevealResponse: (response: RevealCellResponse | null) =>
        set({ lastRevealResponse: response }),
      setGameResult: (result: GameResult | null) => set({ gameResult: result }),
      resetBoardState: () =>
        set({
          revealedCells: [],
          fullBoard: null,
          hitMineCell: null,
          loadingCellKey: null,
          lastRevealResponse: null,
        }),
    }),
    {
      name: "mines-game-store",
      partialize: (state) => ({
        betAmount: state.betAmount,
        minesCount: state.minesCount,
        gameId: state.gameId,
      }),
    },
  ),
);
