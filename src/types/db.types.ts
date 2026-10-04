export type TAccountType = 'PRIVATE' | 'BUSINESS'

export type TAccount = {
  id: string
  name: string
  type: TAccountType
  balance: number
  iban: string
}

export type TMovementType = 'CREDIT' | 'DEBIT'

export type TMovement = {
  id: string
  accountId: string
  date: string
  description: string
  amount: number
  type: TMovementType
  category: string
}

export type TInvestmentType = 'BOND' | 'ETF'

export type TInvestment = {
  id: string
  accountId: string
  name: string
  type: TInvestmentType
  quantity: number
  purchasePrice: number
  currentPrice: number
}

export type TBranch = {
  id: string
  name: string
  city: string
  address: string
  phone: string
}

export type TUserRole = 'CUSTOMER' | 'ADMIN'

export type TUser = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: TUserRole
}

export type TNotificationType = 'INFO' | 'WARNING' | 'SUCCESS'

export type TNotification = {
  id: string
  userId: string
  accountId: string | null
  title: string
  message: string
  type: TNotificationType
  read: boolean
  createdAt: string
}
