export const gameKeys = {
  all: ["game"] as const,
  byId: (gameId: string) => [...gameKeys.all, gameId] as const,
  balance: () => [...gameKeys.all, "balance"] as const,
};
