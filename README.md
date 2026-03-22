# ShadowrunAnarchy2SheetBuilder

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.


## Planning documents

To keep execution aligned, use these docs together:

- `goal.md` — project outcome, phases, and success criteria.
- `agent.md` — execution checklist and sequencing for the next implementation steps.

## Current styling status

The app currently uses a CSS-variable theme system defined in `src/styles.css`.
Tailwind is not yet configured in this repository (no Tailwind/PostCSS config files present).

If you only see a purple-heavy screen, start at `/` and verify the header + hero content are visible; the
background palette is intentionally neon/dark and may need token tuning rather than framework changes.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
