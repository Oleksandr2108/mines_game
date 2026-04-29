import { useQuery } from "@tanstack/react-query";
import { gameApi } from "../api/gameApi";
import { gameKeys } from "./gameKeys";

export function useActiveGameQuery() {
  return useQuery({
    queryKey: gameKeys.active(),
    queryFn: () => gameApi.getActiveGame(),
    refetchOnWindowFocus: true,
  });
}
