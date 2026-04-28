import { create } from "zustand";
import { MINE_COUNT_OPTIONS } from "../model/constants";
export type Difficulty = "easy" | "medium" | "hard";
export type LocalGameStatus = "idle" | "in_progress" | "won" | "lost";

interface GameStoreState {
  betAmount: number;
  balanceLimit: number;
  minesCount: number;
  gameId?: string;
  setGameId: (id: string) => void;
  setMinesCount: (count: number) => void;
  setBalanceLimit: (balance: number) => void;
  setBetAmount: (amount: number) => void;
  doubleBet: () => void;
  halfBet: () => void;
  maxBet: () => void;
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

export const useGameStore = create<GameStoreState>((set) => ({
  betAmount: MIN_BET,
  balanceLimit: MAX_BET,
  minesCount: MINE_COUNT_OPTIONS[0],
  gameId: undefined,
  setGameId: (id: string) => set({ gameId: id }),
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
      betAmount: clampBet(Math.floor(state.betAmount / 2), state.balanceLimit),
    })),
  maxBet: () =>
    set((state) => ({
      betAmount: getMaxAllowed(state.balanceLimit),
    })),

  setMinesCount: (count: number) => set({ minesCount: count }),
}));
