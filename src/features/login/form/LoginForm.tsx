import useAuth from '@/core/context/authContext/useAuth'
import { useLogin } from '@/hooks/service/useLogin'
import useRedirection from '@/hooks/useRedirection'

import type { ReactElement } from 'react'
import { loginFormSchema, type TLoginFormValues } from './loginForm.schema'

import { InputGroup } from '@/shared/components/InputGroup'
import Button from '@/shared/components/Button/Button'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import styles from './LoginForm.module.css'

export const LoginForm = (): ReactElement => {
  const { login: setAuthUser } = useAuth()
  const { login: authenticate, loading, error } = useLogin()
  const { openDashboardPage } = useRedirection()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  })

  const submitForm = async (values: TLoginFormValues): Promise<void> => {
    const user = await authenticate(values.email)

    if (!user) return

    setAuthUser({
      ...user,
      accountIds: [],
    })

    openDashboardPage()
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <InputGroup>
          <InputGroup.Label htmlFor="email">Email</InputGroup.Label>

          <InputGroup.InputText
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Inserisci la tua email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-message' : undefined}
            {...register('email')}
          />

          {errors.email && (
            <InputGroup.Message id="email-message" variant="error">
              {errors.email.message}
            </InputGroup.Message>
          )}
        </InputGroup>

        <footer className={styles.footer}>
          <Button
            label={loading ? 'Accesso in corso...' : 'Accedi'}
            variant="primary"
            type="submit"
            disabled={loading}
          />
        </footer>
      </form>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </>
  )
}
