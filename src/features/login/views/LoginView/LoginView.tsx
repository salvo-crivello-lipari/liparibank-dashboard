import type { ReactElement } from 'react'
import LoginCard from '../../components/LoginCard/LoginCard'
import styles from './LoginView.module.css'
import { DemoCredentials } from '../../components/DemoCredentials/DemoCredentials'

export function LoginView(): ReactElement {
  return (
    <div className={styles.loginView}>
      <LoginCard />
      <DemoCredentials />
    </div>
  )
}
