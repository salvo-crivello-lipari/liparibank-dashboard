import type { ReactElement, ReactNode } from 'react'
import styles from './Button.module.css'
import type { TButtonProps } from '@/types/common.types'
import clsx from 'clsx'

type TButtonMainProps = {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
  icon?: ReactNode
} & TButtonProps

const Button = ({ label, variant = 'primary', icon, ...props }: TButtonMainProps): ReactElement => {
  return (
    <button className={clsx(styles.button, styles[variant])} type="button" {...props}>
      {icon}
      {label}
    </button>
  )
}

export default Button
