import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header class="header">
      <a class="brand" routerLink="/">Shadowrun Sheet Builder</a>

      <div class="spacer"></div>

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
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e6e6e6;
      }

      .brand {
        font-weight: 700;
        text-decoration: none;
        color: #1d1d1d;
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
        color: #666;
      }

      .value {
        font-weight: 600;
      }

      .button {
        border: none;
        border-radius: 999px;
        padding: 0.6rem 1.2rem;
        background: #111827;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        font-weight: 600;
      }

      .button.ghost {
        background: transparent;
        color: #111827;
        border: 1px solid #111827;
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
