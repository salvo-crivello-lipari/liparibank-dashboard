export default abstract class CONFIG {
  static readonly STORAGE_KEYS = {
    THEME: 'theme',
  }

  static readonly THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
  } as const
}
