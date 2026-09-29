export default abstract class CONFIG {
  //================================================
  // PRIVATE METHODS
  //================================================

  private static getBaseUrl(): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    if (!baseUrl) throw new Error('Missing VITE_API_BASE_URL')
    return baseUrl
  }

  //================================================
  // CONFIG VARS
  //================================================

  static readonly BASE_URL = CONFIG.getBaseUrl()

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
