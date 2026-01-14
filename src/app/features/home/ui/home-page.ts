import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  template: `
    <section class="page">
      <div class="hero">
        <div>
          <h1>Shadowrun Anarchy Sheet Builder</h1>
          <p>Build and manage character sheets with a clean, fast workflow.</p>
        </div>

        <div class="cta">
          @if (!user()) {
            <a class="button ghost" routerLink="/login">Login</a>
            <a class="button" routerLink="/signup">Create account</a>
          } @else {
            <p class="welcome">Welcome back, {{ displayName }}</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .page {
        padding: 2.5rem 1.5rem;
      }

      .hero {
        max-width: 780px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2.5rem;
        border-radius: 24px;
        background: linear-gradient(135deg, #f8fafc, #e2e8f0);
        border: 1px solid #e2e8f0;
      }

      .cta {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .button {
        border: none;
        border-radius: 999px;
        padding: 0.7rem 1.4rem;
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

      .welcome {
        font-weight: 600;
      }
    `,
  ],
})
export class HomePageComponent {
  private readonly auth = inject(AuthService);
  readonly user = this.auth.user;

  get displayName() {
    const current = this.user();
    const username = current?.user_metadata?.['username'];
    return username ?? current?.email ?? 'User';
  }

  constructor() {}
}
