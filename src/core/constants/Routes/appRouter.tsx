import { createBrowserRouter } from 'react-router-dom'
import ROUTES from '@/core/constants/Routes/routes.const'
import { publicRoutes } from '@/core/constants/Routes/publicRoutes'
import AppShell from '@/core/layout/AppShell/AppShell'
import { privateRoutes } from './privateRoutes'
import ProtectedRoute from './ProtectedRoute'
import ErrorPage from '@/features/error/page/ErrorPage'

export const appRouter = (): ReturnType<typeof createBrowserRouter> => {
  console.log('Creating app router')

  return createBrowserRouter([
    {
      path: ROUTES.APP,
      errorElement: <ErrorPage />,
      children: publicRoutes,
    },
    {
      path: ROUTES.APP,
      element: <ProtectedRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <AppShell />,
          children: privateRoutes,
        },
      ],
    },
  ])
}
