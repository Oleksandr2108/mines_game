import { useQuery } from "@tanstack/react-query";
import { gameApi } from "../api/gameApi";
import { gameKeys } from "./gameKeys";

export function useGameQuery(gameId: string | null) {
  return useQuery({
    queryKey: gameId ? gameKeys.byId(gameId) : gameKeys.all,
    queryFn: () => gameApi.getGameState(gameId as string),
    enabled: Boolean(gameId),
  });
}
