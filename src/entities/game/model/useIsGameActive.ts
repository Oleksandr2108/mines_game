import { useGameStore } from "../store/useGameStore";
import { GAME_STATUS_ACTIVE } from "./constants";

export function useIsGameActive(): boolean {
  return useGameStore(
    (s) => s.lastRevealResponse?.status === GAME_STATUS_ACTIVE,
  );
}
