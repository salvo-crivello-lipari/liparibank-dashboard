import { useCallback, useState } from 'react'

import { useApiCall } from '@/core/api/useApiCall'
import type { TUser } from '@/types/db.types'

import ENDPOINTS from '@/core/api/endpoints'
import { createUrl } from '@/core/api/createUrl'
import CONFIG from '@/core/config/config'

type TUseLogin = {
  login: (email: string) => Promise<TUser | null>
  loading: boolean
  error: string | null
}

export function useLogin(): TUseLogin {
  const { get } = useApiCall()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(
    async (email: string): Promise<TUser | null> => {
      setLoading(true)
      setError(null)

      try {
        const url = createUrl(CONFIG.BASE_URL)
          .addPathParam(ENDPOINTS.USERS)
          .addQueryParam({ email })
          .build()

        const response = await get<TUser[]>({ url })

        const user = response?.[0] ?? null

        if (!user) {
          setError('User not found')
          return null
        }

        return user
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unable to login')

        return null
      } finally {
        setLoading(false)
      }
    },
    [get]
  )

  return { login, loading, error }
}
