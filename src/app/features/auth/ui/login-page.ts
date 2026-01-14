import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="page">
      <h2>Login</h2>

      <form class="card" (ngSubmit)="login()">
        <label>
          Email
          <input
            name="email"
            type="email"
            [(ngModel)]="email"
            required
            autocomplete="email"
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            [(ngModel)]="password"
            required
            autocomplete="current-password"
          />
        </label>

        <button class="button" type="submit">Login</button>

        @if (errorMessage) {
          <p class="error">{{ errorMessage }}</p>
        }
      </form>

      <p class="muted">
        No account yet?
        <a routerLink="/signup">Create one</a>
      </p>
    </section>
  `,
  styles: [
    `
      .page {
        max-width: 420px;
        margin: 2rem auto;
        padding: 0 1rem;
      }

      .card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        border: 1px solid hsl(var(--border));
        border-radius: var(--radius);
        background: hsl(var(--card));
        box-shadow: 0 24px 60px var(--feature-card-shadow);
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        font-weight: 600;
      }

      input {
        padding: 0.6rem 0.8rem;
        border-radius: calc(var(--radius) - 6px);
        border: 1px solid hsl(var(--input));
        background: hsl(var(--background));
        color: hsl(var(--foreground));
      }

      .error {
        color: hsl(var(--destructive));
        font-weight: 600;
      }

      .muted {
        margin-top: 1rem;
        color: hsl(var(--muted-foreground));
      }
    `,
  ],
})
export class LoginPageComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  async login() {
    this.errorMessage = '';
    const { error } = await this.auth.signIn(this.email, this.password);
    if (error) {
      this.errorMessage = error.message;
      return;
    }
    await this.router.navigateByUrl('/');
  }
}
