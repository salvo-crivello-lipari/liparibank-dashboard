import type { ReactElement, HTMLAttributes } from 'react'
import styles from './InputGroup.module.css'
import clsx from 'clsx'

type TInputGroupMessageProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'error' | 'success'
}

export function InputGroupMessage({
  children,
  variant = 'default',
  className,
  ...props
}: TInputGroupMessageProps): ReactElement {
  return (
    <span {...props} className={clsx(styles.message, styles[variant], className)}>
      {children}
    </span>
  )
}
