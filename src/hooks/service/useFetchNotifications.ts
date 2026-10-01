import { useCallback, useEffect, useState } from 'react'
import { useApiCall } from '@/core/api/useApiCall'
import type { TNotification, TUser } from '@/types/db.types'
import { createUrl } from '@/core/api/createUrl'
import CONFIG from '@/core/config/config'
import ENDPOINTS from '@/core/api/endpoints'

type TUseFetchNotificationProps = {
  userId: TUser['id']
}
type TUseFetchNotifications = {
  notifications: TNotification[] | null
  loading: boolean
}

export function useFetchNotification({
  userId,
}: TUseFetchNotificationProps): TUseFetchNotifications {
  const { get } = useApiCall()
  const [notifications, setNotifications] = useState<TNotification[] | null>(null)
  const [loading, setLoading] = useState(true)

  const getNotifications = useCallback(
    async (signal?: AbortSignal | undefined): Promise<TNotification[] | null> => {
      const url = createUrl(CONFIG.BASE_URL)
        .addPathParam(ENDPOINTS.NOTIFICATIONS)
        .addQueryParam({ userId })
        .build()

      return await get<TNotification[]>({ url, signal })
    },
    [get, userId]
  )

  useEffect(() => {
    const controller = new AbortController()

    ;(async (): Promise<void> => {
      const response = await getNotifications(controller.signal)
      if (controller.signal.aborted) return
      if (response) setNotifications(response)
      setLoading(false)
    })()

    return (): void => controller.abort()
  }, [getNotifications, userId])

  return { notifications, loading }
}
