import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import type { ReactElement } from 'react'
import ROUTES from '@/core/constants/Routes/routes.const'
import Button from '@/shared/components/Button/Button'
import styles from './ErrorPage.module.css'

function ErrorPage(): ReactElement {
  const error = useRouteError()
  const navigate = useNavigate()

  let title = 'Ops! Qualcosa è andato storto.'
  let message = 'Si è verificato un errore imprevisto.'

  if (isRouteErrorResponse(error)) {
    title = `${error.status} - ${error.statusText}`
    message = error.data?.message ?? 'Non è stato possibile completare la richiesta.'
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <main className={styles.errorPage}>
      <div className={styles.errorContent}>
        <span className={styles.errorCode}>ERRORE</span>

        <h1>{title}</h1>

        <p>{message}</p>

        <div className={styles.actions}>
          <Button
            label="Torna alla Dashboard"
            variant="primary"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          />

          <Button
            label="Torna alla Home"
            variant="secondary"
            onClick={() => navigate(ROUTES.APP)}
          />
        </div>
      </div>
    </main>
  )
}

export default ErrorPage
