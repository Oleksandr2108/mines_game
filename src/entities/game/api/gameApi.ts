import { httpClient } from "../../../shared/api/httpClient";
import type {
  BalanceResponse,
  GameState,
  RevealCellResponse,
  RevealCellPayload,
  StartGamePayload,
} from "../model/types";

export const gameApi = {
  async getGameState(): Promise<GameState> {
    const response = await httpClient.get<GameState>(`/games`);
    return response.data;
  },

  async getBalance(): Promise<BalanceResponse> {
    const response = await httpClient.get<BalanceResponse>("/balance");
    return response.data;
  },

  async startGame(payload: StartGamePayload): Promise<GameState> {
    const response = await httpClient.post<GameState>("/games", payload);
    return response.data;
  },

  async revealCell(
    gameId: string,
    payload: RevealCellPayload,
  ): Promise<RevealCellResponse> {
    const response = await httpClient.post<RevealCellResponse>(
      `/games/${gameId}/reveal`,
      payload,
    );
    return response.data;
  },
};
