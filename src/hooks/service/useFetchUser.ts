import { useCallback, useEffect, useState } from 'react'
import { useApiCall } from '@/core/api/useApiCall'
import type { TUser } from '@/types/db.types'
import ENDPOINTS from '@/core/api/endpoints'
import { createUrl } from '@/core/api/createUrl'
import CONFIG from '@/core/config/config'

const CURRENT_USER_ID = 'USR-001' // TODO: change mock with real logic

type TUseFetchUser = {
  user: TUser | null
  loading: boolean
}

export function useFetchUser(): TUseFetchUser {
  const { get } = useApiCall()
  const [user, setUser] = useState<TUser | null>(null)
  const [loading, setLoading] = useState(true)

  const getUser = useCallback(
    async (signal?: AbortSignal | undefined): Promise<TUser | null> => {
      const url = createUrl(CONFIG.BASE_URL)
        .addPathParam(ENDPOINTS.USERS)
        .addPathParam(CURRENT_USER_ID)
        .build()

      return await get<TUser>({ url, signal })
    },
    [get]
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
