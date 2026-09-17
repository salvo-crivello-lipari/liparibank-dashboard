import { lazy } from 'react'

const DashboardPage = lazy(() => import('@/features/dashboard/page/DashboardPage'))

const InsurancePage = lazy(() => import('@/features/insurance/page/InsurancePage'))

export { DashboardPage, InsurancePage }
