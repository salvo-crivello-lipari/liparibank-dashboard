import { type ReactElement } from 'react'
import styles from './AccountCard.module.css'

export type TAccountCardType = 'PRIVATE' | 'BUSINESS'

export type TTAccountCardProps = {
  name: string
  balance: number
  type: TAccountCardType
}

const typeClassMapper: Record<TAccountCardType, string> = {
  PRIVATE: styles.private,
  BUSINESS: styles.business,
}

const currencyFormatter = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' })

export function AccountCard({ name, balance, type }: TTAccountCardProps): ReactElement {
  return (
    <article className={`${styles.card} ${typeClassMapper[type]}`}>
      <span className={styles.name}>{name}</span>
      <p className={styles.balance}>{currencyFormatter.format(balance)}</p>
    </article>
  )
}
