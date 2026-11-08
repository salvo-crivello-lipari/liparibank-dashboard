import { lazy } from 'react'

const LoginPage = lazy(() => import('@/features/login/page/LoginPage'))

const DashboardPage = lazy(() => import('@/features/dashboard/page/DashboardPage'))
const InvestmentsPage = lazy(() => import('@/features/investments/page/InvestmentsPage'))
const AccountsPage = lazy(() => import('@/features/accounts/page/AccountsPage'))
const PoliciesPage = lazy(() => import('@/features/insurancePolicies/page/PoliciesPage'))
const AdminPage = lazy(() => import('@/features/admin/page/AdminPage'))

export { DashboardPage, InvestmentsPage, AccountsPage, PoliciesPage, AdminPage, LoginPage }
