import type { ReactElement } from 'react'
import styles from './LoginCard.module.css'
import { LoginForm } from '../../form/LoginForm'

const LoginCard = (): ReactElement => {
  return (
    <section className={styles.loginCard}>
      <header className={styles.header}>
        <h1>Benvenuto in LipariBank</h1>
        <p>Accedi alla tua area personale</p>
      </header>

      <LoginForm />
    </section>
  )
}

export default LoginCard
