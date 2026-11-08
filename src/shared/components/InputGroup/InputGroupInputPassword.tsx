import type { ReactElement, ComponentPropsWithoutRef } from 'react'
import styles from './InputGroup.module.css'
import clsx from 'clsx'

type TInputGroupInputPasswordProps = ComponentPropsWithoutRef<'input'>

export function InputGroupInputPassword({
  className,
  ...props
}: TInputGroupInputPasswordProps): ReactElement {
  return <input {...props} type="password" className={clsx(styles.input, className)} />
}
