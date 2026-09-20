import type { ReactElement } from 'react'
import CONFIG from '@/core/config/config'
import { useTheme } from '@/hooks/useTheme'
import styles from './ToggleThemeButton.module.css'

const THEME_ICONS: Record<string, string> = {
  [CONFIG.THEMES.LIGHT]: '☀',
  [CONFIG.THEMES.DARK]: '☾',
}

export function ToggleThemeButton(): ReactElement {
  const { appTheme, applyTheme } = useTheme()

  return (
    <div role="group" aria-label="Theme" className={styles.toggleBox}>
      {Object.values(CONFIG.THEMES).map((theme) => {
        const isActive = theme === appTheme

        return (
          <button
            key={theme}
            type="button"
            className={styles.button}
            aria-label={`Use ${theme} theme`}
            aria-pressed={isActive}
            onClick={() => applyTheme(theme)}
          >
            <span aria-hidden="true">{THEME_ICONS[theme]}</span>
          </button>
        )
      })}
    </div>
  )
}
