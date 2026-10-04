import { useCallback, useEffect, useState } from 'react'
import { useApiCall } from '@/core/api/useApiCall'
import type { TMovement } from '@/types/db.types'
import ENDPOINTS from '@/core/api/endpoints'
import { createUrl } from '@/core/api/createUrl'
import CONFIG from '@/core/config/config'

type TUseFetchUser = {
  movements: TMovement[] | null
  loading: boolean
}

export function useFetchMovements(): TUseFetchUser {
  const { get } = useApiCall()
  const [movements, setMovements] = useState<TMovement[] | null>(null)
  const [loading, setLoading] = useState(true)

  const getMovements = useCallback(async (): Promise<TMovement[] | null> => {
    const url = createUrl(CONFIG.BASE_URL).addPathParam(ENDPOINTS.MOVEMENTS).build()

    return await get<TMovement[]>({ url })
  }, [get])

  useEffect(() => {
    ;(async (): Promise<void> => {
      const response = await getMovements()
      if (response) setMovements(response)
      setLoading(false)
    })()
  }, [getMovements])

  return { movements, loading }
}
