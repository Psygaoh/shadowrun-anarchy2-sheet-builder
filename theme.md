
# Theme System (Language-Agnostic)

This project uses a CSS-variable theme system with a small switcher that toggles a theme key (e.g. `sr4`) which maps to a root CSS class (e.g. `.theme-sr4`). The same structure can be reused in any stack by applying the right class to the root element (or document body) and defining the variables below.

## Core idea
- Each theme is a CSS class that defines a consistent set of design tokens.
- Components use tokens, never hardcoded colors.
- A theme switcher sets the active theme key; the UI updates by CSS only.

## Required tokens
These tokens are used across the UI and must exist in every theme. Colors are stored in HSL or RGB triplets so you can use them in `hsl()` or `rgba()` in any framework.

```
--background
--foreground
--card
--card-foreground
--popover
--popover-foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--muted
--muted-foreground
--accent
--accent-foreground
--destructive
--destructive-foreground
--border
--input
--ring
--radius
```

### Charts (optional but present in all themes)
```
--chart-1
--chart-2
--chart-3
--chart-4
--chart-5
```

## Neon UI extensions
These tokens drive the neon glow, gradients, headers, and CTA styles.

```
--primary-rgb
--brand-weak
--brand-strong
--label-color

--cta-primary-start
--cta-primary-mid
--cta-primary-end
--cta-primary-hover-start
--cta-primary-hover-mid
--cta-primary-hover-end
--cta-primary-shadow
--cta-primary-text
--cta-secondary-border
--cta-secondary-hover-border
--cta-secondary-bg
--cta-secondary-hover-bg
--cta-secondary-text
--cta-secondary-hover-text

--feature-card-border
--feature-card-bg
--feature-card-shadow
--feature-card-overlay

--footer-link
--footer-link-hover
--header-landing-bg
--header-landing-border
--header-app-bg
--header-app-border
--header-blur
--footer-landing-bg
--footer-landing-border
--footer-app-bg
--footer-app-border

--glow-primary-rgb
--glow-primary-alpha
--glow-primary-blur
--glow-secondary-rgb
--glow-secondary-alpha
--glow-secondary-blur
--grid-primary-rgb
--grid-primary-alpha
--grid-secondary-rgb
--grid-secondary-alpha
--backdrop-top
--backdrop-middle
--backdrop-bottom
--backdrop-bottom-rgb
--backdrop-bottom-alpha
```

## Theme classes
Each theme is a class attached to the root element. Default theme is `sr4`.

```
.theme-sr4
.theme-sr5
.theme-sr6
.theme-darkAnarchy
.theme-matrix
.theme-lightAnarchy
```

## Switcher contract
Language-agnostic behavior:
- Maintain a `theme` string value.
- Map it to a CSS class on the root element.
- Persist user choice (localStorage, cookies, user profile, etc.).

Minimal mapping:
```
sr4 -> theme-sr4
sr5 -> theme-sr5
sr6 -> theme-sr6
darkAnarchy -> theme-darkAnarchy
matrix -> theme-matrix
lightAnarchy -> theme-lightAnarchy
```

## Token usage examples
Use HSL triplets for general colors:
```
background-color: hsl(var(--background));
color: hsl(var(--foreground));
border-color: hsl(var(--border));
box-shadow: 0 0 30px var(--cta-primary-shadow);
```

Use RGB triplets for glows:
```
background-color: rgba(var(--glow-primary-rgb), var(--glow-primary-alpha));
```

## Theme palettes (key tokens)
These values are the reference palettes used in this project. They can be copied as-is into other projects.

### SR4 - Azure Neon (dark)
- background: 215 65% 5%
- foreground: 210 20% 97%
- primary: 186 85% 60%
- secondary: 233 38% 20%
- brand-weak: rgba(34, 211, 238, 0.75)
- brand-strong: rgba(34, 211, 238, 1)
- label-color: rgba(34, 211, 238, 0.78)
- cta-primary: #22d3ee -> #38bdf8 -> #a855f7
- glow-primary: 34 211 238 / 0.32
- glow-secondary: 168 85 247 / 0.22
- backdrop: #020817 -> #030a1f -> #00040b

### SR5 - Crimson Flux (dark)
- background: 345 70% 4%
- foreground: 350 25% 96%
- primary: 349 86% 55%
- secondary: 26 94% 45%
- brand-weak: rgba(244, 63, 94, 0.78)
- brand-strong: rgba(244, 63, 94, 1)
- label-color: rgba(244, 63, 94, 0.82)
- cta-primary: #f43f5e -> #fb7185 -> #f97316
- glow-primary: 244 63 94 / 0.35
- glow-secondary: 251 191 36 / 0.24
- backdrop: #140009 -> #1f0012 -> #080003

### SR6 - Ultraviolet (dark)
- background: 264 68% 5%
- foreground: 268 40% 95%
- primary: 275 82% 65%
- secondary: 200 88% 56%
- brand-weak: rgba(192, 132, 252, 0.78)
- brand-strong: rgba(192, 132, 252, 1)
- label-color: rgba(192, 132, 252, 0.82)
- cta-primary: #c084fc -> #a855f7 -> #3b82f6
- glow-primary: 192 132 252 / 0.32
- glow-secondary: 59 130 246 / 0.24
- backdrop: #0b0217 -> #120329 -> #050111

### Dark Anarchy - Gilded Night (dark)
- background: 222 45% 2.3%
- foreground: 48 90% 88%
- primary: 48 100% 52%
- secondary: 32 94% 46%
- brand-weak: rgba(250, 204, 21, 0.75)
- brand-strong: rgba(250, 204, 21, 1)
- label-color: rgba(250, 204, 21, 0.78)
- cta-primary: #facc15 -> #f59e0b -> #fef08a
- glow-primary: 250 204 21 / 0.38
- glow-secondary: 249 115 22 / 0.22
- backdrop: #0a0703 -> #130f05 -> #040301

### Matrix - Emerald Phreak (dark)
- background: 140 58% 3%
- foreground: 140 28% 92%
- primary: 141 100% 50%
- secondary: 162 82% 45%
- brand-weak: rgba(101, 255, 134, 0.78)
- brand-strong: rgba(101, 255, 134, 1)
- label-color: rgba(101, 255, 134, 0.78)
- cta-primary: #22ff71 -> #32e875 -> #0ea5e9
- glow-primary: 34 255 140 / 0.35
- glow-secondary: 14 197 222 / 0.18
- backdrop: #020d07 -> #04140a -> #010604

### Light Anarchy - Streetlight (light)
- background: 47 40% 96%
- foreground: 330 45% 26%
- primary: 330 74% 62%
- secondary: 44 92% 60%
- brand-weak: rgba(236, 72, 153, 0.8)
- brand-strong: rgba(236, 72, 153, 1)
- label-color: rgba(236, 72, 153, 0.75)
- cta-primary: #f5a3c7 -> #f5ce69 -> #ffe1a6
- glow-primary: 236 72 153 / 0.18
- glow-secondary: 250 204 21 / 0.16
- backdrop: #fdfaf5 -> #fffdfc -> #fbe7f2

## Creating a new theme
1) Copy an existing theme class.
2) Update the HSL base tokens first (`--background`, `--foreground`, `--primary`, `--secondary`).
3) Adjust neon and CTA tokens to match the new palette.
4) Verify contrast for text on `--background` and `--card`.
5) Ensure `color-scheme` matches (`dark` or `light`) for native controls.

## Files in this repo (reference)
- Global theme imports and utilities: `app/globals.css`
- Theme definitions: `app/themes/*.css`
- Theme switcher: `components/theme/theme-switcher.tsx`
