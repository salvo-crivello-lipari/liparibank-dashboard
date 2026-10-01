import type { ReactElement } from 'react'
import CONFIG from '@/core/config/config'
import { useTheme } from '@/hooks/useTheme'
import styles from './ToggleThemeButton.module.css'
import { Moon, Sun } from 'lucide-react'

export function ToggleThemeButton(): ReactElement {
  const { appTheme, applyTheme } = useTheme()

  return (
    <div role="group" aria-label="Theme" className={styles.toggleBox}>
      {Object.values(CONFIG.THEMES).map((theme) => {
        const isActive = theme === appTheme
        const isLightMode = theme === CONFIG.THEMES.LIGHT

        return (
          <button
            key={theme}
            type="button"
            className={styles.button}
            aria-label={`Use ${theme} theme`}
            aria-pressed={isActive}
            onClick={() => applyTheme(theme)}
          >
            {isLightMode ? <Sun aria-hidden /> : <Moon aria-hidden />}
          </button>
        )
      })}
    </div>
  )
}
