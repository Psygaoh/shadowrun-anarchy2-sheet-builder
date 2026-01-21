# AGENTS

## Purpose
Guidelines for this Angular 21 app connected to Supabase and hosted on Vercel. Keep changes small, testable, and aligned with existing patterns.

## References
- Angular v21 docs: https://angular.dev/
- Angular configuration: https://angular.dev/reference/configs
- Supabase Angular tutorial: https://supabase.com/docs/guides/getting-started/tutorials/with-angular
- Supabase JS client: https://supabase.com/docs/reference/javascript/installing
- Vercel Angular docs: https://vercel.com/docs/frameworks/angular
- Vercel environment variables: https://vercel.com/docs/projects/environment-variables

## General practices
- Prefer simple, explicit code over cleverness.
- Keep modules and components small and focused; delete dead code.
- Document non-obvious decisions in code comments or README updates.
- Avoid breaking changes without a migration plan.
- Always clean up after yourself (remove temp scripts, unused files, and dead config).
- Follow gitflow: create a feature branch, work and commit there, then open a merge request for approval.

## Angular 21 conventions
- Use standalone components by default.
- Prefer `signals` for local reactive state; use `RxJS` for streams and external events.
- Keep `ChangeDetectionStrategy.OnPush` on all components unless you have a strong reason.
- Use `@defer` and route-level lazy loading for heavy features.
- Use a hybrid layout: feature folders with internal layers.
- Use `inject()` in constructors sparingly; prefer it for optional or lazy dependencies.

## Folder layout (hybrid)
- Feature modules live in `src/app/features/<feature>`.
- Each feature can contain `ui`, `data`, and `domain` subfolders.
- Cross-feature shared UI goes in `src/app/shared/ui`.
- Cross-feature shared domain logic goes in `src/app/shared/domain`.
- App shell, routing, and providers live in `src/app/core`.

## State and data flow
- Keep data fetching in services; components should orchestrate only.
- Avoid global mutable state; use signal stores or RxJS subjects with clear ownership.
- Keep DTO mapping in a single place (e.g., `src/app/data/mappers`).

## Supabase integration
- Put the Supabase client in a single service with typed helpers.
- Always use `env`-driven config (Supabase URL and anon key).
- Prefer row-level security policies; never ship service-role keys.
- Handle auth state centrally; do not duplicate auth subscriptions.
- Treat Supabase responses as untrusted: validate or narrow types.

## Security
- Never log secrets or PII in the client.
- Use parameterized queries or Supabase RPCs; avoid string-built SQL.
- Sanitize user inputs before storing or rendering.

## Vercel hosting
- Ensure `vercel.json` is aligned with Angular output (if needed).
- Store all secrets in Vercel environment variables.
- Verify `baseHref` and routing rewrites for SPA routing.

## Testing and quality
- Add unit tests for critical logic and edge cases.
- Add an e2e smoke test for auth and key flows.
- RUN LINT / compiler and fix errors.
- Run lint + tests before pushing changes.

## Performance
- Use images via `ngOptimizedImage` and proper sizing.
- Avoid unnecessary change detection triggers and subscriptions.
- Prefer lazy-loaded routes for non-critical features.

## Accessibility
- Use semantic HTML and keyboard-friendly interactions.
- Ensure color contrast and focus states are visible.

## Review checklist
- No secrets committed.
- Data access goes through services.
- Tests updated or added.
- App still builds and routes correctly.
