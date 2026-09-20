import { type ReactElement } from 'react'
import styles from './AccountSummaryCard.module.css'
import { formatCurrency, formatMaskIban } from '@/shared/utils/formatters'
import type { TAccount, TAccountType } from '@/types/db.types'

export type TAccountSummaryCardProps = {
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

export function AccountSummaryCard({ account }: TAccountSummaryCardProps): ReactElement {
  const { name, iban, balance, type } = account

  return (
    <article className={`${styles.card} ${cardClassMapper[type]}`}>
      <header className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={`${styles.badge} ${badgeClassMapper[type]}`}>{typeLabel[type]}</span>
      </header>
      <p className={styles.iban}>{formatMaskIban(iban)}</p>
      <p className={styles.balance}>{formatCurrency(balance)}</p>
    </article>
  )
}
