import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'

export type TDivProps = HTMLAttributes<HTMLDivElement>

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export type TParamValue = string | number | boolean | null | undefined

export type TParam<T extends string = string> = {
  [K in T]: TParamValue
}
