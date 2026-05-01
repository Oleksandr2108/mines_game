import { useGameStore } from "../store/useGameStore";

export function useIsGameActive(): boolean {
  return useGameStore((s) => s.lastRevealResponse?.status === "active");
}
