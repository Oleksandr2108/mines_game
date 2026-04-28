import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameApi } from "../api/gameApi";
import { gameKeys } from "./gameKeys";

export function useStartGameMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gameApi.startGame,
    onSuccess: (data) => {
      queryClient.setQueryData(gameKeys.byId(data.id), data);
    },
  });
}
