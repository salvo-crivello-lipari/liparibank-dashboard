import { useFetchAccounts } from '@/hooks/service/useFetchAccounts'
import { isNotNullOrUndefined } from '@/shared/utils/utils'
import { type ReactElement } from 'react'
import { AccountBalanceCard } from '../../components/AccountBalanceCard/AccountBalanceCard'
import styles from './AccountViews.module.css'

export function AccountViews(): ReactElement {
  const { accounts, loading } = useFetchAccounts()

  return (
    <div className={styles.accountsViewBox}>
      {!loading &&
        isNotNullOrUndefined(accounts) &&
        accounts.map((account) => {
          return <AccountBalanceCard key={account.id} account={account} />
        })}
    </div>
  )
}
