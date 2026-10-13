import { memo, type ReactElement, type RefObject } from 'react'
import styles from './FilterPanel.module.css'
import type { TFilters } from '../../hooks/useFilters'

const TRANSACTIONS_TYPES: TFilters['type'][] = ['ALL', 'CREDIT', 'DEBIT']

type TFilterPanelProps = {
  filters: TFilters
  searchInputRef: RefObject<HTMLInputElement | null>
  onTypeChange: (type: TFilters['type']) => void
  onSearchChange: (text: TFilters['searchText']) => void
  onSortByChange: (sortBy: TFilters['sortBy']) => void
  onSortOrderChange: (sortOrder: TFilters['sortOrder']) => void
  onReset: () => void
}

const FilterPanel = (props: TFilterPanelProps): ReactElement => {
  console.log('FilterPanel re-rendered')
  const {
    filters,
    searchInputRef,
    onReset,
    onSearchChange,
    onSortByChange,
    onSortOrderChange,
    onTypeChange,
  } = props

  return (
    <div className={styles.panel}>
      <div className={styles.typeGroup}>
        {TRANSACTIONS_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className={`${styles.typeBtn} ${filters.type === type ? styles.active : ''}`}
            onClick={() => onTypeChange(type)}
          >
            {type === 'ALL' ? 'Tutti' : type === 'CREDIT' ? 'Accrediti' : 'Addebiti'}
          </button>
        ))}
      </div>

      <div className={styles.searchRow}>
        <input
          ref={searchInputRef}
          id="transaction-search"
          className={styles.searchInput}
          type="search"
          placeholder="Cerca per descrizione..."
          value={filters.searchText}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Cerca transazioni per descrizione"
        />

        <button type="button" className={styles.resetBtn} onClick={onReset}>
          Azzera filtri
        </button>
      </div>

      <div className={styles.sortRow}>
        <div className={styles.sortGroup}>
          <label className={styles.filterLabel} htmlFor="sort-by">
            Ordina per
          </label>

          <select
            id="sort-by"
            className={styles.sortSelect}
            value={filters.sortBy}
            onChange={(event) => onSortByChange(event.target.value as TFilters['sortBy'])}
          >
            <option value="date">Data</option>
            <option value="amount">Importo</option>
          </select>
        </div>

        <div className={styles.sortGroup}>
          <label className={styles.filterLabel} htmlFor="sort-order">
            Ordinamento
          </label>

          <select
            id="sort-order"
            className={styles.sortSelect}
            value={filters.sortOrder}
            onChange={(event) => onSortOrderChange(event.target.value as TFilters['sortOrder'])}
          >
            <option value="desc">Decrescente</option>
            <option value="asc">Crescente</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default memo(FilterPanel)
