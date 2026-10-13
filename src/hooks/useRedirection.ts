import ROUTES from '@/core/constants/Routes/routes.const'
import { useNavigate } from 'react-router-dom'

const { DASHBOARD, INSURANCE } = ROUTES

type TUseRedirection = {
  openDashboardPage: () => void
  openInsurancePage: () => void
}

/**
 * Navigation Utility to that simplify and centralized navigation actions.
 *
 * @returns {TUseRedirection}
 */
function useRedirection(): TUseRedirection {
  const navigate = useNavigate()

  const openDashboardPage = (): void => {
    navigate(DASHBOARD, { replace: true })
  }
  const openInsurancePage = (): void => {
    navigate(INSURANCE, { replace: true })
  }

  return { openDashboardPage, openInsurancePage }
}

export default useRedirection
