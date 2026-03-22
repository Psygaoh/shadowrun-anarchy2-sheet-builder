# Goal: Stabilize UI foundation and execute next delivery steps

## Context
The current app is rendering with the existing neon theme token system. We need a clear plan to verify whether Tailwind is actually configured, avoid visual regressions (like the current "purple screen" confusion), and move into incremental feature work.

## Primary outcome
Create a predictable, testable front-end baseline where:
1. Styling source of truth is explicit (plain CSS tokens, Tailwind, or hybrid).
2. Theme behavior is intentional and documented.
3. Next feature work can proceed without UI uncertainty.

## Success criteria
- [ ] A documented styling decision exists (Tailwind **yes/no**, plus rationale).
- [ ] A smoke-check path confirms the app renders expected content (header + home hero).
- [ ] Team can run one command sequence to validate build integrity.
- [ ] README links to execution docs (`goal.md` and `agent.md`).

## Delivery phases

### Phase 1 — Baseline verification
- Confirm what is currently installed/configured for styling.
- Validate routes and baseline page composition.
- Record findings in `agent.md`.

### Phase 2 — Styling decision
- Decide one of:
  - **Option A (recommended short-term):** keep CSS variable system as primary and defer Tailwind.
  - **Option B:** fully integrate Tailwind with explicit migration plan.
- Document decision and immediate implications.

### Phase 3 — Implementation hygiene
- Ensure build compiles cleanly.
- Keep changes small, reversible, and aligned with Angular standalone patterns.
- Track outstanding UX issues (such as over-saturated backdrop perception).

### Phase 4 — Feature-ready setup
- Prepare next development slice:
  - UI shell refinements
  - character workflow improvements
  - auth flow smoke checks
- Maintain a task checklist in `agent.md` to keep execution visible.

## Near-term next steps
1. Run `npm run build` as baseline check.
2. Confirm styling stack and document result.
3. If Tailwind is needed, create a dedicated setup PR with migration scope and rollback strategy.
4. Continue feature work only after styling decision is locked.
