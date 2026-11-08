import type { TUser } from '@/types/db.types'

export type TAuthUser = TUser & {
  accountIds: string[]
}

export type TAuthContext = {
  user: TAuthUser | null
  isAuthenticated: boolean
  login: (user: TAuthUser) => void
  logout: () => void
}
