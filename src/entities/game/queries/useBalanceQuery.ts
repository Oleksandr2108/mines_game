import { useQuery } from "@tanstack/react-query";
import { gameApi } from "../api/gameApi";
import { gameKeys } from "./gameKeys";

export function useBalanceQuery() {
  return useQuery({
    queryKey:  gameKeys.balance(),
    queryFn: () => gameApi.getBalance(),
  });
}