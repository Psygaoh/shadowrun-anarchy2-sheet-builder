import { Component, inject } from '@angular/core';

import { ThemeKey, ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <div class="theme-switcher">
      <label for="themeSelect">Theme</label>
      <select id="themeSelect" [value]="theme()" (change)="onChange($event)">
        <option value="sr4">SR4 Azure Neon</option>
        <option value="sr5">SR5 Crimson Flux</option>
        <option value="sr6">SR6 Ultraviolet</option>
        <option value="darkAnarchy">Dark Anarchy</option>
        <option value="matrix">Matrix</option>
        <option value="lightAnarchy">Light Anarchy</option>
      </select>
    </div>
  `,
  styles: [
    `
      .theme-switcher {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-weight: 600;
        color: hsl(var(--muted-foreground));
      }

      select {
        border-radius: calc(var(--radius) - 6px);
        border: 1px solid hsl(var(--border));
        background: hsl(var(--card));
        color: hsl(var(--foreground));
        padding: 0.35rem 0.6rem;
        font-weight: 600;
      }
    `,
  ],
})
export class ThemeSwitcherComponent {
  private readonly themeService = inject(ThemeService);
  readonly theme = this.themeService.theme;

  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.themeService.setTheme(target.value as ThemeKey);
  }
}
