import { mocks } from '@/dbMocks'
import { AccountSummaryCard } from '@/features/dashboard/components/AccountSummaryCard/AccountSummaryCard'
import type { TAccount } from '@/types/db.types'
import { type ReactElement } from 'react'
import styles from './AccountViews.module.css'

const accounts = mocks.accounts as TAccount[]

export function AccountViews(): ReactElement {
  return (
    <div className={styles.accountsViewBox}>
      {accounts.map((account) => {
        return <AccountSummaryCard account={account} />
      })}
    </div>
  )
}
