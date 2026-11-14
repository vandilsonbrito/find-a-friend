import { isAxiosError } from 'axios'

export type ApiError =
  | { kind: 'http'; status: number }
  | { kind: 'network' | 'timeout' | 'unknown' }

export const getApiError = (error: unknown): ApiError => {
  if (!isAxiosError(error)) return { kind: 'unknown' }
  if (error.response) return { kind: 'http', status: error.response.status }
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return { kind: 'timeout' }
  }
  return { kind: 'network' }
}

export const API_ERROR_MESSAGES = {
  network:
    'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
  timeout: 'O servidor demorou para responder. Tente novamente em instantes.',
  tooManyRequests: 'Muitas tentativas seguidas. Aguarde um minuto e tente novamente.',
  server: 'Erro interno do servidor. Tente novamente.',
} as const

/**
 * Turns any error thrown by an API call into a message for the user.
 * `statusMessages` lets each screen override the text for specific HTTP
 * statuses (e.g. 401 on login, 409 on sign up); anything else falls back
 * to the generic connection/server messages and then to `fallback`.
 */
export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
  statusMessages: Partial<Record<number, string>> = {},
): string => {
  const apiError = getApiError(error)

  if (apiError.kind === 'network') return API_ERROR_MESSAGES.network
  if (apiError.kind === 'timeout') return API_ERROR_MESSAGES.timeout
  if (apiError.kind === 'http') {
    const custom = statusMessages[apiError.status]
    if (custom) return custom
    if (apiError.status === 429) return API_ERROR_MESSAGES.tooManyRequests
    if (apiError.status >= 500) return API_ERROR_MESSAGES.server
  }

  return fallback
}
