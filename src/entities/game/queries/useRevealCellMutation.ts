import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameApi } from "../api/gameApi";
import { gameKeys } from "./gameKeys";
import type { RevealCellPayload } from "../model/types";

interface RevealCellMutationArgs {
  gameId: string;
  payload: RevealCellPayload;
}

export function useRevealCellMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gameId, payload }: RevealCellMutationArgs) =>
      gameApi.revealCell(gameId, payload),
    onSuccess: (data) => {
      if (data.result === "mine") {
        queryClient.setQueryData(gameKeys.balance(), { balance: data.balance });
        queryClient.invalidateQueries({ queryKey: gameKeys.history() });
      }
    },
  });
}
