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
        background: linear-gradient(
          135deg,
          hsl(var(--card)),
          rgba(var(--glow-primary-rgb), var(--glow-primary-alpha))
        );
        border: 1px solid var(--feature-card-border);
        box-shadow: 0 24px 60px var(--feature-card-shadow);
        position: relative;
        overflow: hidden;
      }

      .hero::after {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--feature-card-overlay);
        pointer-events: none;
        opacity: 0.8;
        z-index: 0;
      }

      .hero > * {
        position: relative;
        z-index: 1;
      }

      .cta {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .welcome {
        font-weight: 600;
        color: hsl(var(--foreground));
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
