import { Suspense, type ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './AppShell.module.css'
import { Header } from '@/core/layout/Header/Header'

const AppShell = (): ReactElement => {
  return (
    <div className={styles.appShell}>
      <Header />
      <div className={styles.mainWrapper}>
        {/* <Sidebar /> */}
        <main className={styles.content} role="main">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default AppShell
