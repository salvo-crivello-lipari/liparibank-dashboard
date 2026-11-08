import { createBrowserRouter } from 'react-router-dom'
import ROUTES from '@/core/constants/Routes/routes.const'
import { publicRoutes } from '@/core/constants/Routes/publicRoutes'
import AppShell from '@/core/layout/AppShell/AppShell'
import { privateRoutes } from './privateRoutes'
import ProtectedRoute from './ProtectedRoute'

export const appRouter = (): ReturnType<typeof createBrowserRouter> => {
  console.log('Creating app router')

  return createBrowserRouter([
    {
      path: ROUTES.APP,
      children: publicRoutes,
    },
    {
      path: ROUTES.APP,
      element: <ProtectedRoute />,
      children: [
        {
          element: <AppShell />,
          children: privateRoutes,
        },
      ],
    },
  ])
}
