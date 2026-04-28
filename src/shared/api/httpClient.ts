import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://mines-be.vercel.app/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Player-Id": "654",
  },
});
