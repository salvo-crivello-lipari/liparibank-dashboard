import { useDropdownContext } from './dropdown.context'
import styles from './Dropdown.module.css'
import type { TDivProps } from '@/types/common.types'
import clsx from 'clsx'
import { useEffect, type ReactElement } from 'react'

type TDropdownContentProps = TDivProps & {
  side?: 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
}

export function DropdownContent({
  children,
  side = 'bottom',
  align = 'end',
  className,
  ...props
}: TDropdownContentProps): ReactElement {
  const { isOpen, close } = useDropdownContext()

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleKeyDown)

    return (): void => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, close])

  if (!isOpen) return <></>

  return (
    <div
      {...props}
      className={clsx(styles.dropdownContent, className)}
      data-side={side}
      data-align={align}
    >
      {children}
    </div>
  )
}
