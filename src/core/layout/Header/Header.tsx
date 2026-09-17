import React from 'react'
import styles from './Header.module.css'

export const Header: React.FC = () => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🏦</span>
        <span className={styles.logoText}>LipariBank</span>
      </div>
      <nav className={styles.headerNav} aria-label="User navigation">
        <span className={styles.userGreeting}>Benvenuto, Utente</span>
      </nav>
    </header>
  )
}
