import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'theme';
export const THEMES = [
  'sr4',
  'sr5',
  'sr6',
  'darkAnarchy',
  'matrix',
  'lightAnarchy',
] as const;
export type ThemeKey = (typeof THEMES)[number];

const THEME_CLASS: Record<ThemeKey, string> = {
  sr4: 'theme-sr4',
  sr5: 'theme-sr5',
  sr6: 'theme-sr6',
  darkAnarchy: 'theme-darkAnarchy',
  matrix: 'theme-matrix',
  lightAnarchy: 'theme-lightAnarchy',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme = signal<ThemeKey>('sr4');
  readonly theme = this._theme.asReadonly();

  constructor() {
    const stored = this.readStoredTheme();
    this.applyTheme(stored);
  }

  setTheme(next: ThemeKey) {
    if (!THEMES.includes(next)) {
      return;
    }
    this.applyTheme(next);
  }

  get themes() {
    return THEMES;
  }

  private readStoredTheme(): ThemeKey {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && THEMES.includes(stored as ThemeKey)) {
      return stored as ThemeKey;
    }
    return 'sr4';
  }

  private applyTheme(theme: ThemeKey) {
    const root = document.documentElement;
    root.classList.remove(...Object.values(THEME_CLASS));
    root.classList.add(THEME_CLASS[theme]);
    this._theme.set(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }
}
