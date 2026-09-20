import type { ReactElement } from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from '@/core/constants/Routes/appRouter'

function App(): ReactElement {
  console.log('Rendering App component')

  return <RouterProvider router={appRouter()} />
}

export default App
