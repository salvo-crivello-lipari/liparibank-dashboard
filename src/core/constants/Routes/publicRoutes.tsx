import type { RouteObject } from 'react-router-dom'
import ROUTES from './routes.const'
import { DashboardPage, InsurancePage } from '@/core/constants/Routes/lazyPages'

export const publicRoutes: RouteObject[] = [
  {
    path: ROUTES.APP,
    element: <DashboardPage />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: ROUTES.INSURANCE,
    element: <InsurancePage />,
  },
]
