export const MINE_COUNT_OPTIONS = [1, 3, 5, 10, 24] as const;

export type MineCountOption = (typeof MINE_COUNT_OPTIONS)[number];

export const GAME_STATUS_WON = "won" as const;
export const GAME_STATUS_LOST = "lost" as const;
export const GAME_STATUS_ACTIVE = "active" as const;
export const NO_ACTIVE_GAME_MESSAGE = "No active game" as const;

export const HTTP_STATUS_NOT_FOUND = 404 as const;
export const HTTP_STATUS_BAD_REQUEST = 400 as const;

export const GAME_OUTCOMES = {
  WON: GAME_STATUS_WON,
  LOST: GAME_STATUS_LOST,
} as const;

export type GameOutcome = (typeof GAME_OUTCOMES)[keyof typeof GAME_OUTCOMES];
