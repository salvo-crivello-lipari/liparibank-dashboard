import { isNullOrUndefined } from '@/shared/utils/utils'
import type { TParam } from '@/types/common.types'

type TCreateUrl = {
  addPathParam: (param: TParam | string) => TCreateUrl
  addQueryParam: (param: TParam) => TCreateUrl
  build: () => string
}

export function createUrl(baseUrl: string): TCreateUrl {
  const pathSegments: string[] = []
  const queryParams = new URLSearchParams()

  function addPathParam(param: TParam | string): TCreateUrl {
    if (typeof param === 'string') {
      pathSegments.push(encodeURIComponent(param))
    } else {
      Object.values(param).forEach((value) => {
        if (value === null || value === undefined) return

        pathSegments.push(encodeURIComponent(String(value)))
      })
    }

    return api
  }

  function addQueryParam(param: TParam): TCreateUrl {
    Object.entries(param).forEach(([key, value]) => {
      if (isNullOrUndefined(value)) return
      queryParams.set(key, String(value))
    })

    return api
  }

  function build(): string {
    const path = [baseUrl.replace(/\/+$/, ''), ...pathSegments].join('/')
    const queryString = queryParams.toString()
    return queryString ? `${path}/?${queryString}` : path
  }

  const api: TCreateUrl = {
    addPathParam,
    addQueryParam,
    build,
  }

  return api
}
