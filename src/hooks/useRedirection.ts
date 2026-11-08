import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/core/constants/Routes/routes.const'

type TUseRedirection = {
  openLoginPage: () => void
  openDashboardPage: () => void
  openAccountsPage: () => void
  openInvestmentsPage: () => void
  openPoliciesPage: () => void
  openAdminPage: () => void
}

function useRedirection(): TUseRedirection {
  const navigate = useNavigate()

  const openLoginPage = useCallback((): void => {
    navigate(ROUTES.LOGIN, { replace: true })
  }, [navigate])

  const openDashboardPage = useCallback((): void => {
    navigate(ROUTES.DASHBOARD, { replace: true })
  }, [navigate])

  const openAccountsPage = useCallback((): void => {
    navigate(ROUTES.ACCOUNTS, { replace: true })
  }, [navigate])

  const openInvestmentsPage = useCallback((): void => {
    navigate(ROUTES.INVESTMENTS, { replace: true })
  }, [navigate])

  const openPoliciesPage = useCallback((): void => {
    navigate(ROUTES.POLICIES, { replace: true })
  }, [navigate])

  const openAdminPage = useCallback((): void => {
    navigate(ROUTES.ADMIN, { replace: true })
  }, [navigate])

  return {
    openLoginPage,
    openDashboardPage,
    openAccountsPage,
    openInvestmentsPage,
    openPoliciesPage,
    openAdminPage,
  }
}

export default useRedirection
