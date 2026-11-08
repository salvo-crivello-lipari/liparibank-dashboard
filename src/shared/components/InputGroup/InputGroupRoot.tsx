import type { ReactElement } from 'react'
import type { TDivProps } from '@/types/common.types'
import styles from './InputGroup.module.css'
import clsx from 'clsx'

export function InputGroupRoot({ children, className, ...props }: TDivProps): ReactElement {
  return (
    <div {...props} className={clsx(styles.inputGroup, className)}>
      {children}
    </div>
  )
}
