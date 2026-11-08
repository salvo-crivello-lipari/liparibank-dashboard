import type { ReactElement, LabelHTMLAttributes } from 'react'
import styles from './InputGroup.module.css'
import clsx from 'clsx'

type TInputGroupLabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function InputGroupLabel({
  children,
  className,
  ...props
}: TInputGroupLabelProps): ReactElement {
  return (
    <label {...props} className={clsx(styles.label, className)}>
      {children}
    </label>
  )
}
