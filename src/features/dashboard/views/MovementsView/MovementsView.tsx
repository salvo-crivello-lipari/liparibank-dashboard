import { mocks } from '@/dbMocks'
import { MovementRow } from '@/features/dashboard/components/MovementsRow/MovementRow'
import type { TMovement } from '@/types/db.types'
import { type ReactElement } from 'react'
import styles from './MovementsView.module.css'

const movements = mocks.movements as TMovement[]

export function MovementsView(): ReactElement {
  return (
    <div className={styles.movementsViewBox}>
      {movements.map((movement) => {
        return <MovementRow movement={movement} />
      })}
    </div>
  )
}
