import { type ReactElement } from 'react'
import styles from './MovementRow.module.css'
import { formatDate, formatSignedCurrency } from '@/shared/utils/formatters'
import type { TMovement } from '@/types/db.types'

export type TMovementRowProps = {
  movement: TMovement
}

export function MovementRow({ movement }: TMovementRowProps): ReactElement {
  const { description, date, amount, category } = movement

  const amountClassName = amount > 0 ? styles.credit : amount < 0 ? styles.debit : styles.neutral

  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <span className={styles.description}>{description}</span>
        <time className={styles.date} dateTime={date}>
          {formatDate(date)}
        </time>
      </div>
      <span className={styles.category}>{category}</span>
      <span className={`${styles.amount} ${amountClassName}`}>{formatSignedCurrency(amount)}</span>
    </div>
  )
}
