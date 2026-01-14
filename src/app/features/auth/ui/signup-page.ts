import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-signup-page',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="page">
      <h2>Create account</h2>

      <form class="card" (ngSubmit)="signup()">
        <label>
          Username
          <input
            name="username"
            type="text"
            [(ngModel)]="username"
            required
            autocomplete="username"
          />
        </label>

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
            minlength="6"
            autocomplete="new-password"
          />
        </label>

        <button class="button" type="submit">Create account</button>

        @if (errorMessage) {
          <p class="error">{{ errorMessage }}</p>
        }
      </form>

      <p class="muted">
        Already have an account?
        <a routerLink="/login">Login</a>
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
        border: 1px solid #e6e6e6;
        border-radius: 16px;
        background: #fff;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        font-weight: 600;
      }

      input {
        padding: 0.6rem 0.8rem;
        border-radius: 10px;
        border: 1px solid #cbd5e1;
      }

      .button {
        border: none;
        border-radius: 999px;
        padding: 0.6rem 1.2rem;
        background: #111827;
        color: #fff;
        cursor: pointer;
        font-weight: 600;
      }

      .error {
        color: #b91c1c;
        font-weight: 600;
      }

      .muted {
        margin-top: 1rem;
        color: #6b7280;
      }
    `,
  ],
})
export class SignupPageComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  async signup() {
    this.errorMessage = '';
    const { error } = await this.auth.signUp(this.email, this.password, this.username);
    if (error) {
      this.errorMessage = error.message;
      return;
    }
    await this.router.navigateByUrl('/');
  }
}
