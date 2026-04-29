import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gameApi } from "../api/gameApi";
import { gameKeys } from "./gameKeys";

export function useGameCashOutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gameApi.cashOut,
    onSuccess: (data) => {
      queryClient.setQueryData(gameKeys.balance(), { balance: data.balance });
      queryClient.setQueryData(gameKeys.active(), null);
    },
  });
}
