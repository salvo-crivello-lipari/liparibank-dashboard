import { useCallback } from 'react'
import { fetcher, type TFetcherResponse } from '@/core/api/fetcher'
import { HTTP_METHODS, type THttpMethod } from '@/core/api/httpMethod.types'
import CONFIG from '@/core/config/config'

const { ERROR_NAMES } = CONFIG

type TApiOptions<B = never> = {
  url: string
  body?: B
  headers?: Record<string, string>
  signal?: AbortSignal
  silent?: boolean
}

type TUseApiCall = {
  get: <R>(options: TApiOptions<never>) => Promise<R | null>
  post: <B, R>(options: TApiOptions<B>) => Promise<R | null>
  put: <B, R>(options: TApiOptions<B>) => Promise<R | null>
  patch: <B, R>(options: TApiOptions<B>) => Promise<R | null>
  delete: <R>(options: TApiOptions<never>) => Promise<R | null>
}

export function useApiCall(): TUseApiCall {
  const handleGlobalError = useCallback(<R>(response: TFetcherResponse<R>, silent?: boolean) => {
    if (!response.error || silent) return

    const { title, message, status } = response.errorDetails

    switch (title) {
      case ERROR_NAMES.ABORTED:
        break
      case ERROR_NAMES.AUTHENTICATION:
        // TODO: add centralized logic for logout
        break
      default:
        console.error(status, title, message)
      //  TODO: add centralized logic for general error (showError etc.)
    }
  }, [])

  const call = useCallback(
    async <B, R>(method: THttpMethod, options: TApiOptions<B>): Promise<R | null> => {
      const response = await fetcher<B, R>(options.url, {
        method,
        body: options.body,
        headers: options.headers,
        signal: options.signal,
      })

      handleGlobalError(response, options.silent)

      return response.data
    },
    [handleGlobalError]
  )

  const get = useCallback(
    <R>(options: TApiOptions<never>) => call<never, R>(HTTP_METHODS.GET, options),
    [call]
  )

  const post = useCallback(
    <B, R>(options: TApiOptions<B>) => call<B, R>(HTTP_METHODS.POST, options),
    [call]
  )

  const put = useCallback(
    <B, R>(options: TApiOptions<B>) => call<B, R>(HTTP_METHODS.PUT, options),
    [call]
  )

  const patch = useCallback(
    <B, R>(options: TApiOptions<B>) => call<B, R>(HTTP_METHODS.PATCH, options),
    [call]
  )

  const del = useCallback(
    <R>(options: TApiOptions<never>) => call<never, R>(HTTP_METHODS.DELETE, options),
    [call]
  )

  return { get, post, put, patch, delete: del }
}
