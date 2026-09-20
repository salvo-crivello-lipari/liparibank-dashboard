import CONFIG from '@/core/config/config'
import { useEffect, useState } from 'react'

const { THEMES, STORAGE_KEYS } = CONFIG
const { LIGHT, DARK } = THEMES

export type TTheme = (typeof THEMES)[keyof typeof THEMES]

export type TUseTheme = {
  appTheme: TTheme
  applyTheme: (theme: TTheme) => void
}

/**
 * Custom hook to manage theme (light/dark) in the application.
 */
export function useTheme(): TUseTheme {
  const [appTheme, setAppTheme] = useState<TTheme>(getInitialTheme)

  function getInitialTheme(): TTheme {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME)
    if (savedTheme === LIGHT || savedTheme === DARK) return savedTheme

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT
  }

  function applyTheme(theme: TTheme): void {
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
    setAppTheme(theme)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', appTheme === DARK)
  }, [appTheme])

  return { appTheme, applyTheme }
}
