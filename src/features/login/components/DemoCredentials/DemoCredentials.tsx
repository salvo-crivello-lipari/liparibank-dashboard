import type { ReactElement } from 'react'
import styles from './DemoCredentials.module.css'

const DEMO_USERS = [
  {
    role: 'Customer',
    email: 'mario.rossi@email.com',
  },
  {
    role: 'Admin',
    email: 'admin@liparibank.it',
  },
]

export function DemoCredentials(): ReactElement {
  return (
    <section className={styles.credentials}>
      <header className={styles.header}>
        <h3>Credenziali demo</h3>
        <p className={styles.description}>
          Utilizza uno dei seguenti account per accedere alla demo.
        </p>
      </header>

      <ul className={styles.userList}>
        {DEMO_USERS.map((user) => (
          <li key={user.email} className={styles.user}>
            <span className={styles.role}>{user.role}</span>
            <span className={styles.email}>{user.email}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
