const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

type RequestData = Record<string, unknown>;

type RequestOptions = {
  headers?: HeadersInit;
};

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<TResponse>(
  path: string,
  options: RequestInit = {}
): Promise<TResponse> {
  const token = localStorage.getItem('access_token');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(getErrorMessage(data), response.status, data);
  }

  return data as TResponse;
}

async function parseResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getErrorMessage(data: unknown) {
  if (
    data &&
    typeof data === 'object' &&
    'message' in data &&
    typeof data.message === 'string'
  ) {
    return data.message;
  }

  return 'Request failed.';
}

export const api = {
  get<TResponse>(path: string, options?: RequestOptions) {
    return request<TResponse>(path, {
      method: 'GET',
      ...options,
    });
  },

  post<TResponse>(
    path: string,
    data?: RequestData,
    options?: RequestOptions
  ) {
    return request<TResponse>(path, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  put<TResponse>(path: string, data?: RequestData, options?: RequestOptions) {
    return request<TResponse>(path, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  patch<TResponse>(
    path: string,
    data?: RequestData,
    options?: RequestOptions
  ) {
    return request<TResponse>(path, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  delete<TResponse>(path: string, options?: RequestOptions) {
    return request<TResponse>(path, {
      method: 'DELETE',
      ...options,
    });
  },
};
