import { httpClient } from "../../../shared/api/httpClient";
import { isAxiosError } from "axios";
import type {
  ActiveGameResponse,
  BalanceResponse,
  GameState,
  RevealCellResponse,
  RevealCellPayload,
  StartGamePayload,
  GameCashOutResponse,
  GameHistoryResponse,
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

  async getActiveGame(): Promise<ActiveGameResponse | null> {
    try {
      const response =
        await httpClient.get<ActiveGameResponse>("/games/active");
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const backendMessage = (
          error.response?.data as { error?: string } | undefined
        )?.error;

        if (
          status === 404 ||
          status === 400 ||
          backendMessage === "No active game"
        ) {
          return null;
        }
      }
      throw error;
    }
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

  async cashOut(gameId: string): Promise<GameCashOutResponse> {
    const response = await httpClient.post<GameCashOutResponse>(
      `/games/${gameId}/cashout`,
    );
    return response.data;
  },
  async getHistory(): Promise<GameHistoryResponse> {
    const response = await httpClient.get<GameHistoryResponse>(`/history`);
    return response.data;
  },
};
