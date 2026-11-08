import type { ReactElement } from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from '@/core/constants/Routes/appRouter'
import AuthProvider from './core/context/authContext/AuthProvider'

function App(): ReactElement {
  console.log('Rendering App component')

  return (
    <AuthProvider>
      <RouterProvider router={appRouter()} />
    </AuthProvider>
  )
}

export default App
