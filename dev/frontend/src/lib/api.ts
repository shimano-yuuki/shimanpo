// API通信の抽象化レイヤー
// 外部ライブラリ（axios等）との分離を目的とする

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type HealthResponse = {
  status: string;
};

/**
 * ヘルスチェックAPIを呼び出す
 */
export const fetchHealth = async (): Promise<HealthResponse> => {
  const response = await apiClient.get<HealthResponse>('/health');
  return response.data;
};
