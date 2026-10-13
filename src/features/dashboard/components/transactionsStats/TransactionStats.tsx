import { type ReactElement } from 'react'
import styles from './TransactionStats.module.css'
import { formatCurrency } from '@/shared/utils/formatters'

type TTransactionStatsProps = {
  totals: {
    income: number
    expenses: number
    count: number
  }
}

export const TransactionStats = ({ totals }: TTransactionStatsProps): ReactElement => {
  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <span className={styles.label}>Transazioni</span>
        <span className={styles.value}>{totals.count}</span>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Entrate</span>
        <span className={styles.value}>{formatCurrency(totals.income)}</span>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Uscite</span>
        <span className={styles.value}>{formatCurrency(totals.expenses)}</span>
      </div>
    </div>
  )
}
