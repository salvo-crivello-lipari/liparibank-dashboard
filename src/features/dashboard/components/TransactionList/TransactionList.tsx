import { type ReactElement } from 'react'
import { useFilters } from '../../hooks/useFilters'
import type { TMovement } from '@/types/db.types'
import FilterPanel from '../FilterPanel/FilterPanel'
import { TransactionStats } from '../transactionsStats/TransactionStats'
import MovementRow from '../MovementsRow/MovementRow'
import styles from './TransactionList.module.css'

type TTransactionListProps = {
  movements: TMovement[] | null
  isLoading: boolean
}
export function TransactionList({ movements, isLoading }: TTransactionListProps): ReactElement {
  const {
    filters,
    filteredTransactions,
    totals,
    searchInputRef,
    handleResetFilters,
    handleSearchChange,
    handleSortByChange,
    handleSortOrderChange,
    handleTypeChange,
  } = useFilters(movements)

  if (isLoading) return <LoadingState />

  return (
    <div className={styles.container}>
      <FilterPanel
        filters={filters}
        searchInputRef={searchInputRef}
        onTypeChange={handleTypeChange}
        onSearchChange={handleSearchChange}
        onSortByChange={handleSortByChange}
        onSortOrderChange={handleSortOrderChange}
        onReset={handleResetFilters}
      />

      {filteredTransactions.length > 0 && <TransactionStats totals={totals} />}

      {filteredTransactions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.list}>
          {filteredTransactions.map((movement) => (
            <MovementRow key={movement.id} movement={movement} />
          ))}
        </div>
      )}
    </div>
  )
}

function LoadingState(): ReactElement {
  return (
    <div className={styles.container} aria-busy="true" aria-label="Caricamento transazioni">
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
    </div>
  )
}

function EmptyState(): ReactElement {
  return <p className={styles.empty}>Nessuna transazione trovata.</p>
}
