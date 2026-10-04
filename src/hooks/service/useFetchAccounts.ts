import { useCallback, useEffect, useState } from 'react'
import { useApiCall } from '@/core/api/useApiCall'
import type { TAccount } from '@/types/db.types'
import ENDPOINTS from '@/core/api/endpoints'
import { createUrl } from '@/core/api/createUrl'
import CONFIG from '@/core/config/config'

type TUseFetchUser = {
  accounts: TAccount[] | null
  loading: boolean
}

export function useFetchAccounts(): TUseFetchUser {
  const { get } = useApiCall()
  const [accounts, setAccounts] = useState<TAccount[] | null>(null)
  const [loading, setLoading] = useState(true)

  const getAccounts = useCallback(async (): Promise<TAccount[] | null> => {
    const url = createUrl(CONFIG.BASE_URL).addPathParam(ENDPOINTS.ACCOUNTS).build()

    return await get<TAccount[]>({ url })
  }, [get])

  useEffect(() => {
    ;(async (): Promise<void> => {
      const response = await getAccounts()
      if (response) setAccounts(response)
      setLoading(false)
    })()
  }, [getAccounts])

  return { accounts, loading }
}
