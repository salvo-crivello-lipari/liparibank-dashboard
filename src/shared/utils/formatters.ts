import CONFIG from '@/core/config/config'

const { CURRENCY_LOCALE } = CONFIG

const currencyFormatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
  style: 'currency',
  currency: 'EUR',
})

const signedCurrencyFormatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
  style: 'currency',
  currency: 'EUR',
  signDisplay: 'exceptZero',
})

const dateFormatter = new Intl.DateTimeFormat(CURRENCY_LOCALE, {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export const formatCurrency = (value: number): string => currencyFormatter.format(value)

export const formatSignedCurrency = (value: number): string => signedCurrencyFormatter.format(value)

export const formatDate = (value: Date | string | number): string =>
  dateFormatter.format(new Date(value))

export const formatMaskIban = (iban: string): string => {
  const clean = iban.replace(/\s/g, '').toUpperCase()
  if (clean.length <= 8) return clean
  return `${clean.slice(0, 4)} •••• ${clean.slice(-4)}`
}
