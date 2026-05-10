export const MINE_COUNT_OPTIONS = [1, 3, 5, 10, 24] as const;

export type MineCountOption = (typeof MINE_COUNT_OPTIONS)[number];

export const GAME_STATUS_WON = "won" as const;
export const GAME_STATUS_LOST = "lost" as const;

export const GAME_OUTCOMES = {
  WON: GAME_STATUS_WON,
  LOST: GAME_STATUS_LOST,
} as const;

export type GameOutcome = (typeof GAME_OUTCOMES)[keyof typeof GAME_OUTCOMES];
