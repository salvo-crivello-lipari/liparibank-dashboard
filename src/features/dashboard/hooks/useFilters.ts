import { useDebounce } from '@/hooks/useDebounce'
import { isNullOrUndefined } from '@/shared/utils/utils'
import type { TMovement } from '@/types/db.types'
import { useCallback, useMemo, useReducer, useRef, type RefObject } from 'react'

export type TFilters = {
  searchText: string
  type: 'ALL' | TMovement['type']
  sortBy: 'date' | 'amount'
  sortOrder: 'asc' | 'desc'
}

type TFilterAction =
  | { type: 'SET_TYPE'; payload: TFilters['type'] }
  | { type: 'SET_SEARCH'; payload: TFilters['searchText'] }
  | { type: 'SET_SORT_BY'; payload: TFilters['sortBy'] }
  | { type: 'SET_SORT_ORDER'; payload: TFilters['sortOrder'] }
  | { type: 'RESET' }

const defaultFilters: TFilters = {
  type: 'ALL',
  searchText: '',
  sortBy: 'date',
  sortOrder: 'desc',
}

const filterReducer = (state: TFilters, action: TFilterAction): TFilters => {
  switch (action.type) {
    case 'SET_TYPE':
      return {
        ...state,
        type: action.payload,
      }
    case 'SET_SEARCH':
      return {
        ...state,
        searchText: action.payload,
      }
    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload,
      }
    case 'SET_SORT_ORDER':
      return {
        ...state,
        sortOrder: action.payload,
      }
    case 'RESET':
      return {
        ...defaultFilters,
      }
    default:
      return state
  }
}

type TTotal = {
  income: number
  expenses: number
  count: number
}

type TUseFilters = {
  filters: TFilters
  totals: TTotal
  filteredTransactions: TMovement[]
  searchInputRef: RefObject<HTMLInputElement | null>
  handleTypeChange: (type: TFilters['type']) => void
  handleSearchChange: (text: TFilters['searchText']) => void
  handleSortByChange: (sortBy: TFilters['sortBy']) => void
  handleSortOrderChange: (sortOrder: TFilters['sortOrder']) => void
  handleResetFilters: () => void
}

export function useFilters(transactions: TMovement[] | null): TUseFilters {
  const [filters, dispatch] = useReducer(filterReducer, defaultFilters)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const debouncedSearchText = useDebounce(filters.searchText, 300)

  const filteredTransactions = useMemo(() => {
    if (isNullOrUndefined(transactions)) return []

    const filtered = transactions.filter((tx) => {
      const matchesType = filters.type === 'ALL' || tx.type === filters.type
      const matchesSearch = tx.description.toLowerCase().includes(debouncedSearchText.toLowerCase())
      return matchesType && matchesSearch
    })

    return [...filtered].sort((a, b) => {
      const multiplier = filters.sortOrder === 'asc' ? 1 : -1

      if (filters.sortBy === 'amount') {
        return (a.amount - b.amount) * multiplier
      }

      return a.date.localeCompare(b.date) * multiplier
    })
  }, [debouncedSearchText, filters, transactions])

  const totals = useMemo(() => {
    const totalsData = filteredTransactions.reduce(
      (acc, tx) => {
        if (tx.type === 'CREDIT') {
          acc.income += tx.amount
        } else {
          acc.expenses += tx.amount
        }

        acc.count += 1
        return acc
      },
      { income: 0, expenses: 0, count: 0 }
    )

    return totalsData
  }, [filteredTransactions])

  const handleTypeChange = useCallback((type: TFilters['type']) => {
    dispatch({ type: 'SET_TYPE', payload: type })
  }, [])

  const handleSearchChange = useCallback((text: TFilters['searchText']) => {
    dispatch({ type: 'SET_SEARCH', payload: text })
  }, [])

  const handleResetFilters = useCallback(() => {
    dispatch({ type: 'RESET' })
    searchInputRef.current?.focus()
  }, [])

  const handleSortByChange = useCallback((sortBy: TFilters['sortBy']) => {
    dispatch({
      type: 'SET_SORT_BY',
      payload: sortBy,
    })
  }, [])

  const handleSortOrderChange = useCallback((sortOrder: TFilters['sortOrder']) => {
    dispatch({
      type: 'SET_SORT_ORDER',
      payload: sortOrder,
    })
  }, [])

  return {
    filters,
    totals,
    filteredTransactions,
    searchInputRef,
    handleTypeChange,
    handleSearchChange,
    handleSortByChange,
    handleSortOrderChange,
    handleResetFilters,
  }
}
