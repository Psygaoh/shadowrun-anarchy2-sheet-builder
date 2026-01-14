import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { ThemeSwitcherComponent } from './theme-switcher.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ThemeSwitcherComponent],
  template: `
    <header class="header">
      <a class="brand" routerLink="/">Shadowrun Sheet Builder</a>

      <div class="spacer"></div>

      <app-theme-switcher />

      @if (user()) {
        <div class="user">
          <span class="label">Signed in as</span>
          <span class="value">{{ displayName() }}</span>
        </div>
        <button class="button" type="button" (click)="logout()">Logout</button>
      } @else {
        <a class="button ghost" routerLink="/login">Login</a>
        <a class="button" routerLink="/signup">Create account</a>
      }
    </header>
  `,
  styles: [
    `
      .header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.1rem 1.8rem;
        border-bottom: 1px solid var(--header-app-border);
        background: var(--header-app-bg);
        backdrop-filter: blur(var(--header-blur));
      }

      .brand {
        font-weight: 700;
        text-decoration: none;
        color: hsl(var(--foreground));
      }

      .spacer {
        flex: 1;
      }

      .user {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        text-align: right;
      }

      .label {
        font-size: 0.75rem;
        color: hsl(var(--muted-foreground));
      }

      .value {
        font-weight: 600;
      }
    `,
  ],
})
export class HeaderComponent {
  private readonly auth = inject(AuthService);
  readonly user = this.auth.user;
  readonly displayName = computed(() => {
    const current = this.user();
    if (!current) {
      return '';
    }
    const username = current.user_metadata?.['username'];
    return username ?? current.email ?? 'User';
  });

  logout() {
    void this.auth.signOut();
  }
}
