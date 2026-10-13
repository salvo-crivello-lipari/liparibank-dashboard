import { useFetchMovements } from '@/hooks/service/useFetchMovements'
import { type ReactElement } from 'react'
import { TransactionList } from '../../components/TransactionList/TransactionList'
import styles from './MovementsView.module.css'

export function MovementsView(): ReactElement {
  const { movements, loading } = useFetchMovements()

  return (
    <div className={styles.movementsViewBox}>
      <h2>Movimenti Recenti</h2>
      <TransactionList movements={movements} isLoading={loading} />
    </div>
  )
}
