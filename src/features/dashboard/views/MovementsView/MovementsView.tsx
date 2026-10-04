import { MovementRow } from '@/features/dashboard/components/MovementsRow/MovementRow'
import { type ReactElement } from 'react'
import styles from './MovementsView.module.css'
import { useFetchMovements } from '@/hooks/service/useFetchMovements'
import { isNotNullOrUndefined } from '@/shared/utils/utils'

export function MovementsView(): ReactElement {
  const { movements } = useFetchMovements()

  return (
    <div className={styles.movementsViewBox}>
      <h2>Movimenti Recenti</h2>
      {isNotNullOrUndefined(movements) &&
        movements.map((movement) => {
          return <MovementRow key={movement.id} movement={movement} />
        })}
    </div>
  )
}
