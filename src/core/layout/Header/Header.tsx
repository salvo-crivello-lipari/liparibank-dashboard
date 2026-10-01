import type { ReactElement } from 'react'
import styles from './Header.module.css'
import { ToggleThemeButton } from '@/core/layout/Header/components/ToggleThemeButton/ToggleThemeButton'
import { NotificationBell } from '@/core/layout/Header/components/NotificationBell/NotificationBell'
import { useFetchUser } from '@/hooks/service/useFetchUser'
import { isNotNullOrUndefined } from '@/shared/utils/utils'

export const Header = (): ReactElement => {
  const { user } = useFetchUser()

  const userGreetingText = isNotNullOrUndefined(user) ? `Benvenuto, ${user.firstName}` : ''

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
        <span className={styles.userGreeting}>{userGreetingText}</span>
        <div className={styles.flexRow}>
          <ToggleThemeButton />
          {isNotNullOrUndefined(user) && <NotificationBell userId={user.id} />}
        </div>
      </nav>
    </header>
  )
}
