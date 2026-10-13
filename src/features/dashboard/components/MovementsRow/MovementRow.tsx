import { memo, type ReactElement } from 'react'
import styles from './MovementRow.module.css'
import { formatDate, formatSignedCurrency } from '@/shared/utils/formatters'
import type { TMovement } from '@/types/db.types'
import clsx from 'clsx'

const TYPE_BADGES = {
  CREDIT: {
    label: '↑ Entrata',
    className: styles.credit,
  },
  DEBIT: {
    label: '↓ Uscita',
    className: styles.debit,
  },
} as const

export type TMovementRowProps = {
  movement: TMovement
}

function MovementRow({ movement }: TMovementRowProps): ReactElement {
  const { description, date, amount, category, id, type } = movement
  const badge = TYPE_BADGES[type]

  const amountClassName = amount > 0 ? styles.credit : amount < 0 ? styles.debit : styles.neutral

  function handleMovementClick(): void {
    console.log(`Movimento selezionato: ${id}`)
  }

  return (
    <div className={styles.row} role="button" onClick={handleMovementClick}>
      <span className={clsx(styles.badge, badge.className)}>{badge.label}</span>
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

export default memo(MovementRow)
