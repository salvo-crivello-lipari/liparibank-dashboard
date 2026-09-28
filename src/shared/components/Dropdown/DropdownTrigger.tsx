import { useDropdownContext } from './dropdown.context'
import styles from './Dropdown.module.css'
import type { TButtonProps } from '@/types/common.types'
import clsx from 'clsx'
import { type ReactElement } from 'react'

export function DropdownTrigger({
  children,
  onClick,
  className,
  ...props
}: TButtonProps): ReactElement {
  const { isOpen, toggle } = useDropdownContext()

  return (
    <button
      {...props}
      className={clsx(styles.dropdownTrigger, className)}
      type="button"
      aria-haspopup="true"
      aria-expanded={isOpen}
      onClick={(event) => {
        onClick?.(event)
        toggle()
      }}
    >
      {children}
    </button>
  )
}
