import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import type { ReactElement } from 'react'
import ROUTES from '@/core/constants/Routes/routes.const'

type TMenuItem = {
  label: string
  path: string
}

const menuItems: TMenuItem[] = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
  },
  {
    label: 'Insurance',
    path: ROUTES.INSURANCE,
  },
]

export function Sidebar(): ReactElement {
  return (
    <aside className={styles.sidebar}>
      <nav aria-label="navigation">
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? styles.active : styles.link)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
