import { useState, useMemo, useCallback, type ReactNode, type ReactElement } from 'react'

import { AuthContext } from './authContext'
import type { TAuthUser } from './auth.types'

type TAuthProviderProps = {
  children: ReactNode
}

const AuthProvider = ({ children }: TAuthProviderProps): ReactElement => {
  const [user, setUser] = useState<TAuthUser | null>(null)

  const login = useCallback((user: TAuthUser): void => {
    setUser(user)
  }, [])

  const logout = useCallback((): void => {
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
