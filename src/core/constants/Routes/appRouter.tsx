import { createBrowserRouter } from 'react-router-dom'
import ROUTES from '@/core/constants/Routes/routes.const'
import { publicRoutes } from '@/core/constants/Routes/publicRoutes'
import AppShell from '@/core/layout/AppShell/AppShell'

export const appRouter = (): ReturnType<typeof createBrowserRouter> => {
  console.log('Creating app router')

  return createBrowserRouter([
    {
      path: ROUTES.APP,
      element: <AppShell />,
      children: publicRoutes,
    },
  ])
}
