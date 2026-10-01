import { useFetchNotification } from '@/hooks/service/useFetchNotifications'
import { Dropdown } from '@/shared/components/Dropdown'
import type { TNotification, TUser } from '@/types/db.types'
import { Bell } from 'lucide-react'
import { type ReactElement } from 'react'
import styles from './NotificationBell.module.css'
import { isBlankOrEmpty } from '@/shared/utils/utils'

type TNotificationProps = {
  userId: TUser['id']
}

export function NotificationBell({ userId }: TNotificationProps): ReactElement {
  const { notifications } = useFetchNotification({ userId })

  const unreadCount = notifications?.filter((notification) => !notification.read).length ?? 0

  return (
    <Dropdown.Group>
      <Dropdown.Trigger onClick={(e) => e.stopPropagation}>
        <Bell />
        <NotificationBadge unreadCount={unreadCount} />
      </Dropdown.Trigger>

      <Dropdown.Content>
        {isBlankOrEmpty(notifications) ? (
          <NotificationEmptyState />
        ) : (
          <NotificationList notifications={notifications} />
        )}
      </Dropdown.Content>
    </Dropdown.Group>
  )
}

function NotificationBadge({ unreadCount }: { unreadCount: number }): ReactElement {
  if (unreadCount < 1) return <></>
  return <span className={styles.notificationBadge}>{unreadCount}</span>
}

function NotificationEmptyState(): ReactElement {
  return <p>Nessuna notifica disponibile.</p>
}

function NotificationList({ notifications }: { notifications: TNotification[] }): ReactElement {
  return (
    <ul className={styles.notificationList}>
      {notifications.map((notification) => (
        <li key={notification.id} className={styles.notificationItem} data-read={notification.read}>
          <strong>{notification.title}</strong>
          <p>{notification.message}</p>
        </li>
      ))}
    </ul>
  )
}
