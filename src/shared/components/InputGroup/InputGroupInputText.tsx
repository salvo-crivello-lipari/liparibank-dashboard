import type { ReactElement, ComponentPropsWithoutRef } from 'react'
import styles from './InputGroup.module.css'
import clsx from 'clsx'

type TInputGroupInputTextProps = ComponentPropsWithoutRef<'input'>

export function InputGroupInputText({
  className,
  ...props
}: TInputGroupInputTextProps): ReactElement {
  return <input {...props} className={clsx(styles.input, className)} />
}
