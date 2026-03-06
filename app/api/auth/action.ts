"use server"

const API_TIMEOUT_MS = 60000;

async function apiFetch<T>(
  urlPath: string,
  options: RequestInit = {},
  timeoutMs = API_TIMEOUT_MS
): Promise<T> {

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL;
  if (!BASE_URL) {
    throw new Error("Thiếu biến môi trường API_BASE_URL hoặc NEXT_PUBLIC_API_URL");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const isFormData = options.body instanceof FormData;
  const defaultHeaders: Record<string, string> = {};

  if (!isFormData) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: defaultHeaders,
    cache: 'no-store',
    signal: controller.signal,
  };

  const finalOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...(defaultOptions.headers as Record<string, string>),
      ...((options.headers || {}) as Record<string, string>),
    },
  };

  const fullUrl = `${BASE_URL}${urlPath}`;
  console.log(`[API Fetch]: ${finalOptions.method} ${fullUrl}`);

  try {
    const response = await fetch(fullUrl, finalOptions);
    clearTimeout(timeout);

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      throw new Error(errorJson.detail || errorJson.message || `Đã xảy ra lỗi HTTP ${response.status}`);
    }

    if (response.status === 204) {
      return null as T;
    }

    const text = await response.text();
    if (!text) {
      return null as T;
    }

    const data: T = JSON.parse(text);
    return data;

  } catch (error) {
    clearTimeout(timeout);
    console.error("Lỗi apiFetch:", error);
    throw error;
  }
}

export async function fetchAuthenticated<T>(
  urlPath: string,
  options: RequestInit = {}
): Promise<T> {

  const apiKey = process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    throw new Error('Chưa cấu hình NEXT_PUBLIC_API_KEY trong file .env');
  }

  const authHeaders: Record<string, string> = {
    'X-API-KEY': apiKey,
  };

  const finalOptions: RequestInit = {
    ...options,
    headers: {
      ...authHeaders,
      ...((options.headers || {}) as Record<string, string>),
    },
  };

  return apiFetch<T>(urlPath, finalOptions);
}

export async function fetchPublic<T>(
  urlPath: string,
  options: RequestInit = {}
): Promise<T> {
  return apiFetch<T>(urlPath, options);
}