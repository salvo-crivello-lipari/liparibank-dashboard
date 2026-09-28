export default abstract class CONFIG {
  static readonly ERROR_NAMES = {
    TECHNICAL: 'Technical Error',
    NETWORK: 'Network Error',
    AUTHENTICATION: 'Authentication Error',
    ABORTED: 'Aborted',
  }

  static readonly STORAGE_KEYS = {
    THEME: 'theme',
  }

  static readonly THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
  } as const

  static readonly CURRENCY_LOCALE = 'it-IT'
}
