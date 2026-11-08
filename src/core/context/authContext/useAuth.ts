import { useContext } from 'react'
import { AuthContext } from './authContext'
import type { TAuthContext } from './auth.types'

const useAuth = (): TAuthContext => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export default useAuth
