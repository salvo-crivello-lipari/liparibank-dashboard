import { createContext, useContext } from 'react'

export type TDropdownContext = {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

export const DropdownContext = createContext<TDropdownContext | null>(null)

export function useDropdownContext(): TDropdownContext {
  const context = useContext(DropdownContext)

  if (!context) {
    throw new Error('Dropdown components must be used within DropdownGroup')
  }

  return context
}
