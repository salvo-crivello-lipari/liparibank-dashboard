import { AccountCard } from '@/features/accounts/components/AccountCard'
import type { ReactElement } from 'react'

export default function DashboardPage(): ReactElement {
  return (
    <div>
      Dashboard Page
      <div style={{ display: 'flex', gap: '20px' }}>
        <AccountCard balance={1000} name="MARIO" type="BUSINESS" />
        <AccountCard balance={1000} name="MARCO" type="PRIVATE" />
      </div>
    </div>
  )
}
