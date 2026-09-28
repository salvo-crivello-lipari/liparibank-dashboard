import type { THttpMethod } from '@/core/api/httpMethod.types'
import CONFIG from '@/core/config/config'
import { isNotNullOrUndefined } from '@/shared/utils/utils'

const { ERROR_NAMES } = CONFIG

type TFetcherOptions<B> = {
  method: THttpMethod
  body?: B
  headers?: Record<string, string>
  signal?: AbortSignal
}

type TErrorDetails = {
  title: string
  message: string
  status: number
}

type TSuccess<R> = {
  data: R
  error: false
  errorDetails: null
}

type TFail = {
  data: null
  error: true
  errorDetails: TErrorDetails
}

export type TFetcherResponse<R> = TSuccess<R> | TFail

export async function fetcher<B, R>(
  url: string,
  fetcherOption: TFetcherOptions<B>
): Promise<TFetcherResponse<R>> {
  const { method, body, headers, signal } = fetcherOption

  const defaultHeader: HeadersInit = {
    ...(isNotNullOrUndefined(body) ? { 'Content-Type': 'application/json' } : {}),
  }

  let response

  try {
    response = await fetch(url, {
      method,
      signal,
      headers: { ...defaultHeader, ...headers },
      ...(isNotNullOrUndefined(body) ? { body: JSON.stringify(body) } : {}),
    })
  } catch (error) {
    return {
      data: null,
      error: true,
      errorDetails: generateErrorDetails(error),
    }
  }

  if (!response.ok) {
    const exceptionText = await response.text()

    return {
      data: null,
      error: true,
      errorDetails: generateErrorDetails(exceptionText, response),
    }
  }

  if (response.status === 204) return { data: null as R, error: false, errorDetails: null }

  let responseData: unknown

  try {
    const contentType = response.headers.get('Content-Type') || ''
    responseData = contentType.includes('application/json')
      ? await response.json()
      : await response.text()
  } catch {
    return {
      data: null,
      error: true,
      errorDetails: generateErrorDetails('Invalid response body', response),
    }
  }

  return { data: responseData as R, error: false, errorDetails: null }
}

function generateErrorDetails(error: unknown, response?: Response): TErrorDetails {
  if (!response) {
    const isAbort = error instanceof DOMException && error.name === 'AbortError'
    const hasErrorMessage = error instanceof Error
    return {
      title: isAbort ? ERROR_NAMES.ABORTED : ERROR_NAMES.NETWORK,
      message: isAbort ? 'Request aborted' : hasErrorMessage ? error.message : 'Network error',
      status: 0,
    }
  }

  const fallbackMessage = typeof error === 'string' ? error : undefined

  return {
    title: response.status === 401 ? ERROR_NAMES.AUTHENTICATION : ERROR_NAMES.TECHNICAL,
    message: fallbackMessage || response.statusText || 'Unknown error',
    status: response.status,
  }
}
