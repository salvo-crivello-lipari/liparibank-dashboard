import { useCallback, useEffect, useState } from 'react'
import { useApiCall } from '@/core/api/useApiCall'
import type { TUser } from '@/types/db.types'
import ENDPOINTS from '@/core/api/endpoints'
import { createUrl } from '@/core/api/createUrl'
import CONFIG from '@/core/config/config'
import useAuth from '@/core/context/authContext/useAuth'

type TUseFetchUser = {
  user: TUser | null
  loading: boolean
}

export function useFetchUser(): TUseFetchUser {
  const { get } = useApiCall()
  const { user: authUser } = useAuth()
  const [user, setUser] = useState<TUser | null>(null)
  const [loading, setLoading] = useState(true)

  const getUser = useCallback(
    async (signal?: AbortSignal | undefined): Promise<TUser | null> => {
      if (!authUser) return null

      const url = createUrl(CONFIG.BASE_URL)
        .addPathParam(ENDPOINTS.USERS)
        .addPathParam(authUser?.id)
        .build()

      return await get<TUser>({ url, signal })
    },
    [get, authUser]
  )

  useEffect(() => {
    const controller = new AbortController()

    ;(async (): Promise<void> => {
      const response = await getUser(controller.signal)
      if (controller.signal.aborted) return
      if (response) setUser(response)
      setLoading(false)
    })()

    return (): void => controller.abort()
  }, [getUser])

  return { user, loading }
}
