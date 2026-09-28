import { useCallback, useEffect, useRef, useState, type ReactElement, type ReactNode } from 'react'
import styles from './Dropdown.module.css'
import { DropdownContext } from './dropdown.context'

export function DropdownGroup({ children }: { children: ReactNode }): ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent): void {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        close()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, close])

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
      }}
    >
      <div ref={containerRef} className={styles.dropdownGroup}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}
