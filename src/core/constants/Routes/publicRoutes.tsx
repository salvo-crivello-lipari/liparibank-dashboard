import { Navigate, type RouteObject } from 'react-router-dom'
import ROUTES from './routes.const'
import {
  DashboardPage,
  InvestmentsPage,
  AccountsPage,
  AdminPage,
  PoliciesPage,
} from '@/core/constants/Routes/lazyPages'

export const publicRoutes: RouteObject[] = [
  { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: ROUTES.INVESTMENTS,
    element: <InvestmentsPage />,
  },
  {
    path: ROUTES.POLICIES,
    element: <PoliciesPage />,
  },
  {
    path: ROUTES.ACCOUNTS,
    element: <AccountsPage />,
  },
  {
    path: ROUTES.ADMIN,
    element: <AdminPage />,
  },
]
