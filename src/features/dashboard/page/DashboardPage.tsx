import { AccountViews } from '@/features/dashboard/views/AccountsView/AccountViews'
import { MovementsView } from '@/features/dashboard/views/MovementsView/MovementsView'
import type { ReactElement } from 'react'

export default function DashboardPage(): ReactElement {
  return (
    <div>
      <AccountViews />
      <MovementsView />
    </div>
  )
}
