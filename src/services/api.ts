// src/services/api.ts
import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { getAccessToken, getRefreshToken, storeTokens, clearTokens, logoutAndRedirect } from './auth';

const API_BASE = 'https://api.revampinsights.com';

// Main axios instance used across the app
const authApi: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Separate axios instance for refresh calls (no interceptors)
// const refreshInstance: AxiosInstance = axios.create({
//   baseURL: API_BASE,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//})
//

// Attach access token (if present) to outgoing requests
authApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    // headers can be AxiosRequestHeaders or plain object; cast to be safe
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// --- Refresh queue handling ---
let isRefreshing = false;
type FailedQueueItem = {
  resolve: (value?: AxiosRequestConfig) => void;
  reject: (error: Error | AxiosError) => void;
  config: AxiosRequestConfig;
};
let failedQueue: FailedQueueItem[] = [];

function processQueue(error: Error | AxiosError | null, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // inject new token into the queued request headers
      prom.config.headers = prom.config.headers ?? {};
      if (token) {
        (prom.config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
      prom.resolve(prom.config);
    }
  });
  failedQueue = [];
}

// Response interceptor to catch 401 and attempt refresh
authApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;

    // If there's no config or status is not 401, just reject
    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Avoid retrying the same request infinitely
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    // If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        failedQueue.push({
          resolve: (cfg?: AxiosRequestConfig) => {
            // cfg will be passed to api() and return a promise resolving to AxiosResponse
            if (cfg) {
              resolve(authApi(cfg));
            }
          },
          reject,
          config: originalRequest,
        });
      });
    }

    // Start refresh flow
    isRefreshing = true;

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Call refresh endpoint using the refreshInstance (no interceptors)
      // Call refresh endpoint using bare instance
const resp = await authApi.post('/auth/refresh', { refresh_token: refreshToken });

      const data = resp.data;

      if (!data || !data.access_token) {
        throw new Error('Invalid refresh response: missing access_token');
      }

      // Store new tokens; if backend rotated refresh token, update it too
      storeTokens(data.access_token, data.refresh_token ?? refreshToken);

      // Resume queued requests with the new token
      processQueue(null, data.access_token);

      // Retry the original request with new token
      // ensure Authorization header is set on originalRequest
      originalRequest.headers = originalRequest.headers ?? {};
      (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${data.access_token}`;

      return authApi(originalRequest);
    } catch (refreshError) {
      // Refresh failed -> reject queued requests and force logout
      processQueue(refreshError instanceof Error ? refreshError : new Error(String(refreshError)), null);
      clearTokens();
      // redirect to login (or use router navigation)
      logoutAndRedirect();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default authApi;
