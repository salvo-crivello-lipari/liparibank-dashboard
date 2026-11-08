import type { RouteObject } from 'react-router-dom'
import ROUTES from './routes.const'
import { LoginPage } from './lazyPages'

export const publicRoutes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
]
