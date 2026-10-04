import { useState, type ReactElement } from 'react'
import styles from './AccountBalanceCard.module.css'
import { formatCurrency, formatMaskIban } from '@/shared/utils/formatters'
import type { TAccount, TAccountType } from '@/types/db.types'
import { useInterval } from '@/hooks/useInterval'
import { sleep } from '@/shared/utils/utils'
import { RefreshCcw } from 'lucide-react'
import Button from '@/shared/components/Button/Button'

export type TAccountBalanceCardProps = {
  account: TAccount
}

const cardClassMapper: Record<TAccountType, string> = {
  PRIVATE: styles.private,
  BUSINESS: styles.business,
}

const badgeClassMapper: Record<TAccountType, string> = {
  PRIVATE: styles.badgePrivate,
  BUSINESS: styles.badgeBusiness,
}

const typeLabel: Record<TAccountType, string> = {
  PRIVATE: 'Privato',
  BUSINESS: 'Business',
}

export function AccountBalanceCard({ account }: TAccountBalanceCardProps): ReactElement {
  const { name, iban, balance, type } = account
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentBalance, setCurrentBalance] = useState(balance)
  useInterval(applyBalanceChange, 30_000)

  function applyBalanceChange(): void {
    const delta = Math.random() < 0.5 ? 10 : -10
    setCurrentBalance((currentBalance) => currentBalance + delta)
  }

  const handleRefresh = async (): Promise<void> => {
    setIsRefreshing(true)
    await sleep(1_000)
    setIsRefreshing(false)
  }

  return (
    <article className={`${styles.card} ${cardClassMapper[type]}`}>
      <header className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={`${styles.badge} ${badgeClassMapper[type]}`}>{typeLabel[type]}</span>
      </header>
      <p className={styles.iban}>{formatMaskIban(iban)}</p>
      <p className={styles.balance}>
        {isRefreshing ? `Loading...` : formatCurrency(currentBalance)}
      </p>
      <Button
        onClick={handleRefresh}
        disabled={isRefreshing}
        label="Aggiorna"
        icon={<RefreshCcw aria-hidden size={'1.2rem'} />}
      />
    </article>
  )
}
