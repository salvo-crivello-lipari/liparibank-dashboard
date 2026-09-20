import type { ReactElement } from 'react'
import styles from './Header.module.css'
import ToggleThemeButton from '@/core/layout/Header/ToggleThemeButton/ToggleThemeButton'

export const Header = (): ReactElement => {
  return (
    <header className={styles.header}>
      <div className={styles.logoBox}>
        <div className={styles.logo}>
          <span className={styles.logoIcon} aria-hidden="true">
            🏦
          </span>
          <span className={styles.logoText}>LipariBank</span>
        </div>
      </div>

      <nav className={styles.headerNav} aria-label="User navigation">
        <span className={styles.userGreeting}>Benvenuto, Utente</span>
        <ToggleThemeButton />
      </nav>
    </header>
  )
}
