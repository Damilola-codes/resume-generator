import api  from './api';

export const ACCESS_KEY = 'accessToken';
export const REFRESH_KEY = 'refreshToken';

export async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem(ACCESS_KEY, data.access_token);
  localStorage.setItem(REFRESH_KEY, data.refresh_token);
  return data;
}

export function storeTokens(accessToken: string, refreshToken?: string) {
  localStorage.setItem(ACCESS_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_KEY, refreshToken);
  }
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export function logoutAndRedirect() {
  clearTokens();
  window.location.href = '/login';
}
