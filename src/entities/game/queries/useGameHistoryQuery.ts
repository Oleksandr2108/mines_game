import { useQuery } from "@tanstack/react-query";
import { gameApi } from "../api/gameApi";
import { gameKeys } from "./gameKeys";

export function useGameHistoryQuery() {
  return useQuery({
    queryKey: gameKeys.history(),
    queryFn: () => gameApi.getHistory(),
  });
}
