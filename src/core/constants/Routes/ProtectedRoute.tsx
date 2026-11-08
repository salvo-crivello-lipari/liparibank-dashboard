import { Navigate, Outlet, useLocation } from 'react-router-dom'
import ROUTES from '@/core/constants/Routes/routes.const'
import useAuth from '@/core/context/authContext/useAuth'
import type { ReactElement } from 'react'

const ProtectedRoute = (): ReactElement => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
