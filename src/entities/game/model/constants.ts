export const MINE_COUNT_OPTIONS = [1, 3, 5, 10, 24] as const;

export type MineCountOption = (typeof MINE_COUNT_OPTIONS)[number];
