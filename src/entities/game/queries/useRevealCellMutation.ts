import { useMutation } from "@tanstack/react-query";
import { gameApi } from "../api/gameApi";
import type { RevealCellPayload } from "../model/types";

interface RevealCellMutationArgs {
  gameId: string;
  payload: RevealCellPayload;
}

export function useRevealCellMutation() {
  return useMutation({
    mutationFn: ({ gameId, payload }: RevealCellMutationArgs) =>
      gameApi.revealCell(gameId, payload),
  });
}
