# Design System — Yuanhhou Portfolio UI

This document is the authoritative reference for how this design system is built: tokens, theming, internationalisation, and accessibility. It reflects what is actually implemented in the codebase, not aspirational goals.

---

## Table of Contents

1. [Token Architecture](#1-token-architecture)
2. [Multi-Theme](#2-multi-theme)
3. [Internationalisation (i18n)](#3-internationalisation-i18n)
4. [Accessibility — WCAG AA](#4-accessibility--wcag-aa)
5. [Component Patterns](#5-component-patterns)
6. [File Structure](#6-file-structure)

---

## 1. Token Architecture

Tokens follow a **two-layer hierarchy**: primitives define the raw palette; semantics map those primitives to purpose-driven names per theme.

### Layer 1 — Primitives

**Files:** `packages/ui/src/tokens/primitives.css`, `tokens-sizing.css`, `tokens-typography.css`

Primitives are scoped to `:root` and are never referenced directly in components. Components always use semantic tokens.

#### Naming convention

```
--yuanhhou-{hue}-{shade}-alpha-{opacity}
```

Examples:
- `--yuanhhou-blue-550-alpha-100` → fully opaque blue-550
- `--yuanhhou-grey-800-alpha-10` → grey-800 at 10% opacity
- `--yuanhhou-border-radius-circle` → 9999px (pill)

#### Available colour families

| Family | Notes |
|--------|-------|
| Blue | Primary brand colour scale |
| Green | Success states |
| Red | Danger/error states |
| Orange | Warning states |
| Purple | Promote / EVA theme brand |
| Grey | Neutral surface, text, border |
| Lime | Neon accent (Product B only) |
| Camel, Sage | Luxury/MUJI palette (Product C) |

#### Spacing & sizing

```
--yuanhhou-spacing-{n}   →  0px – 160px  (n = 0–2000)
--yuanhhou-size-{n}      →  1px – 112px  (n = 10–1400)
--yuanhhou-border-radius-{n}  →  0 | 50 (4px) | 100 (8px) | 125 (10px) | 200 (16px) | circle (9999px)
```

#### Typography primitives

| Token | Value |
|-------|-------|
| `--yuanhhou-font-family-primary` | Inter, system font stack |
| `--yuanhhou-font-family-mono` | Monaco, Courier New |
| `--yuanhhou-font-weight-300/400/500/600/700` | Light → Bold |
| Display sizes | 32px – 48px |
| Heading sizes | 18px – 28px |
| Body sizes | 12px – 16px |

---

### Layer 2 — Semantic Tokens

**Files:** `packages/ui/src/tokens/semantics-product-{a,b,c}.css`

Semantic tokens are the only tokens components should reference. Each theme file redefines the same set of names using different primitive values.

#### Background tokens

```css
--background-primary              /* Page/app surface */
--background-secondary            /* Alternate surface */
--background-card-primary         /* Card face */
--background-card-secondary       /* Card alternate */
--background-card-inverted        /* Dark card on light theme */

--background-brand-primary        /* Solid brand fill */
--background-brand-secondary      /* Tinted brand fill */

--background-{status}-primary     /* Solid status fill */
--background-{status}-secondary   /* Tinted status fill */
/* status = success | danger | warning | info | promote */

--background-interaction-primary  /* Hover layer (translucent) */
--background-interaction-hover    /* Active hover */
--background-interaction-active   /* Pressed */

--background-overlay              /* Modal scrim */

--background-toggle-off           /* Toggle track, unchecked */
--background-toggle-on            /* Toggle track, checked */
```

#### Foreground (text & icon) tokens

```css
--foreground-primary              /* Body text */
--foreground-secondary            /* Secondary text */
--foreground-tertiary             /* Placeholder / hint */
--foreground-disabled             /* Disabled text */
--foreground-on-primary           /* Text on dark/inverted surfaces */

--foreground-brand-primary        /* Brand-coloured text */
--foreground-brand-on-primary     /* Text ON solid brand fill */
--foreground-brand-on-secondary   /* Text ON tinted brand fill */

--foreground-{status}-primary     /* Status-coloured text */
--foreground-{status}-on-primary  /* Text ON solid status fill */
--foreground-{status}-on-secondary /* Text ON tinted status fill */

--foreground-toggle-thumb         /* Toggle thumb colour */
```

#### Border tokens

```css
--border-primary      /* High-contrast border */
--border-secondary    /* Mid-contrast border */
--border-tertiary     /* Subtle border */
--border-inverted     /* Border on dark surfaces */
--border-focus        /* Keyboard focus ring colour */
--border-focus-inset  /* Inner focus ring (double-ring pattern) */
--border-{status}     /* success | danger | warning | info | promote | brand */
```

#### Radius tokens

```css
--radius-none
--radius-small         /* 4px */
--radius-medium        /* 8px */
--radius-large         /* 10px */
--radius-xlarge        /* 16px */
--radius-full          /* 9999px — pill */

/* Component-specific */
--radius-card
--radius-button
--radius-button-small
--radius-input
--radius-badge
--radius-accordion
--radius-modal
--radius-tooltip
```

Component-specific radii allow each theme to set different rounding per component type independently from the scale.

#### Shadow tokens

```css
--shadow-card-hover    /* Lift effect on card hover */
--shadow-card-active   /* Pressed card */
--shadow-elevated      /* Modals, dropdowns */
```

---

## 2. Multi-Theme

**Files:** `packages/ui/src/ThemeProvider.tsx`, `packages/ui/src/tokens/semantics-product-{a,b,c}.css`

### Themes

| ID | Name | Mood | Brand colour |
|----|------|------|-------------|
| `product-a` | Light / Blue | Professional, clean | `#0070be` (blue-550) |
| `product-b` | Dark / EVA | Bold, cinematic | `#8000c8` (purple), `#a0ff3c` neon accent |
| `product-c` | Light / MUJI | Quiet luxury, minimal | `#6e5032` (camel-700) |

### How it works

The `ThemeProvider` React component writes a `data-theme` attribute to the DOM. Every semantic token file re-declares its tokens under the matching selector:

```css
/* semantics-product-a.css */
:root,
[data-theme="product-a"] { --background-primary: …; }

/* semantics-product-b.css */
[data-theme="product-b"] { --background-primary: …; }

/* semantics-product-c.css */
[data-theme="product-c"] { --background-primary: …; }
```

Components reference semantic tokens only — they never hard-code colours — so they recolour automatically when the `data-theme` attribute changes.

### ThemeProvider API

```tsx
import { ThemeProvider, useTheme, useCurrentTheme } from './ThemeProvider';

// applyTo options:
// 'root'     → writes data-theme to <html> (default)
// 'body'     → writes data-theme to <body>
// 'provider' → wraps children in a themed <div> (nested theming)

<ThemeProvider defaultTheme="product-a" applyTo="root">
  {children}
</ThemeProvider>
```

### Hooks

```tsx
const { theme, setTheme, toggleTheme } = useTheme();
// toggleTheme cycles: product-a → product-b → product-c → product-a

const theme = useCurrentTheme(); // read-only, throws if outside ThemeProvider
```

### Persistence

The chosen theme is stored in `localStorage` under the key `yuanhhou-theme` and restored on the next page load.

### Radius & shadow diverge by theme

Each theme uses the same token names but different values, so a `Card` component automatically adopts the correct rounding per theme without any conditional logic:

| Token | Product A | Product B | Product C |
|-------|-----------|-----------|-----------|
| `--radius-card` | 8px | larger/rounder | 0–4px |
| `--shadow-elevated` | Subtle grey | Glowing purple tint | Soft natural lift |

---

## 3. Internationalisation (i18n)

**Files:** `packages/ui/src/i18n.ts`, `packages/ui/src/locales/{en,ja,zh-TW}/translation.json`

### Setup

```ts
// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en:    { translation: en },
    ja:    { translation: ja },
    'zh-TW': { translation: zhTW },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});
```

### Supported languages

| Code | Language |
|------|----------|
| `en` | English (default & fallback) |
| `ja` | Japanese |
| `zh-TW` | Traditional Chinese |

### Component usage

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <span aria-label={t('aria.skipToContent')}>{t('nav.home')}</span>;
}
```

### Translation file structure

All languages mirror the same nested key structure:

```json
{
  "portfolio": {
    "logo": "…",
    "nav": { "home": "…", "about": "…" },
    "hero": { "title": "…", "subtitle": "…", "cta": "…" },
    "settings": { "language": "…", "theme": "…" },
    "work": { "card1": { "title": "…", "body": "…" } },
    "onboarding": { "greeting": { "morning": "…" } }
  },
  "sections": { "accordion": "…", "badge": "…", "button": "…" },
  "badges": { "neutral": "…", "danger": "…", "warning": "…", "success": "…", "promote": "…" },
  "accordion": { "q1": { "title": "…", "content": "…" } },
  "aria": {
    "skipToContent": "…",
    "languageChanged": "Language changed to {{lang}}",
    "viewChanged": "View changed to {{view}}"
  },
  "footer": { "resumeLabel": "…", "linkedinLabel": "…" },
  "about": { "…": "…" },
  "interestingFacts": { "…": "…" }
}
```

### Conventions

- **Variable interpolation:** `{{variableName}}` syntax, e.g. `"Language changed to {{lang}}"`.
- **Accessibility namespace:** `aria.*` keys are dedicated to screen reader strings. Always use these for `aria-label` values rather than embedding raw strings.
- **No inline strings in components.** Every user-visible string lives in translation files, including button labels, section headings, and status messages.

---

## 4. Accessibility — WCAG AA

The target is **WCAG 2.1 Level AA** across all three themes.

### Colour contrast

All foreground/background pairings in semantic token files are documented with their contrast ratio. The minimum is 4.5:1 for normal text and 3:1 for large text and UI components.

Examples from the token files:

```css
/* Product A */
--foreground-promote-primary: var(--yuanhhou-purple-600);          /* 7:1 on light ✓ */
--foreground-promote-on-primary: var(--yuanhhou-grey-0-alpha-100); /* white on purple-600 = 7:1 ✓ */
--foreground-promote-on-secondary: var(--yuanhhou-purple-700);     /* dark purple on purple-100 = 5:1 ✓ */

/* Product B (dark theme — all values verified at design time) */
--foreground-primary: var(--yuanhhou-grey-0-alpha-100);            /* #ffffff — 16:1 on purple-900 ✓ */
--foreground-success-primary: var(--yuanhhou-lime-300);            /* #a0ff3c — 13:1 on purple-900 ✓ */
```

When adding a new semantic colour pairing, document the contrast ratio as a comment on both the background and foreground tokens.

### Focus indicators

Every interactive element uses `:focus-visible` (not `:focus`) to avoid showing outlines on mouse click while still supporting keyboard users.

```css
.button:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}
```

`--border-focus` is theme-aware: blue on light themes, high-contrast on dark themes.

### ARIA patterns by component

#### Dialog

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"  // omitted when no description
  tabIndex={-1}
>
```

- Stores `document.activeElement` on open, restores it on close.
- Escape key closes (configurable via `closeOnEscape` prop).
- `document.body.style.overflow = 'hidden'` prevents background scroll.

#### Accordion

```tsx
<button
  aria-expanded={isOpen}
  aria-controls={`panel-${item.id}`}
  id={`accordion-trigger-${item.id}`}
/>
<div
  role="region"
  aria-labelledby={`accordion-trigger-${item.id}`}
  hidden={!isOpen}
/>
```

#### Toggle

```tsx
<input
  type="checkbox"
  role="switch"
  aria-checked={checked}
/>
```

Hidden label pattern using `.srOnly` when `hideLabel` is true.

#### Icon buttons and links

- Icon-only buttons require an explicit `aria-label` prop (enforced by the component type).
- Decorative icons rendered inside labelled elements use `aria-hidden="true"`.
- External links automatically receive `rel="noopener noreferrer"`.
- Social/document links use translated aria-labels: `aria-label={t('footer.linkedinLabel')}`.

### Screen-reader-only text

```css
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

Use `.srOnly` for labels that must exist in the DOM for screen readers but should not be visible.

### Touch targets

| Element | Desktop | Mobile |
|---------|---------|--------|
| Button (large) | auto | 44px min-height |
| Button (small) | 40px | 40px + 2px expanded pseudo-element |
| Icon button (small) | 40×40px | 40×40px |
| Icon button (large) | 48×48px | 48×48px |
| Toggle track | 44×24px | 48×28px |

Mobile touch targets are enforced via media queries so desktop layouts are unaffected.

### Reduced motion

Two mechanisms are supported:

```css
/* 1. OS-level preference */
@media (prefers-reduced-motion: reduce) {
  .track, .thumb { transition: none; }
}

/* 2. App-level override (data-reduce-motion="true" on root) */
[data-reduce-motion="true"] * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}
```

---

## 5. Component Patterns

### Styling: CSS Modules + CSS custom properties

All components use **CSS Modules** for scoping. All visual values (colour, radius, shadow, spacing) come from **semantic CSS custom properties** — never hard-coded values. This is what makes multi-theme work without any runtime JS.

```tsx
import styles from './button.module.css';

const combined = [styles.button, styles[variant], styles[size], className]
  .filter(Boolean)
  .join(' ');
```

### TypeScript interface pattern

```tsx
export interface ComponentProps {
  /** JSDoc on every public prop */
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
  className?: string;
  children?: React.ReactNode;
}
```

### Polymorphic components (Button)

`Button` renders as either `<button>` or `<a>` depending on whether `href` is provided. The discriminated union is enforced at the type level:

```tsx
type ButtonAsButton = ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLink   = ButtonBaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
export type ButtonProps = ButtonAsButton | ButtonAsLink;
```

### `data-*` attributes for testing

Components expose `data-*` attributes (e.g. `data-badge-type`, `data-badge-size`) for test selectors. Do not use CSS class names as test hooks.

### Icon sizing

Icons come from `@phosphor-icons/react`. Sizes are abstracted through `packages/ui/src/utils/iconSize.ts` so icon dimensions stay consistent with the spacing scale.

---

## 6. File Structure

```
packages/ui/src/
├── styles.css                        Global reset + body styles
├── i18n.ts                           i18next initialisation
├── ThemeProvider.tsx                 Theme context, useTheme, useCurrentTheme
│
├── tokens/
│   ├── index.css                     Imports all token files
│   ├── primitives.css                Raw colour palette
│   ├── semantics-product-a.css       Light / Blue theme
│   ├── semantics-product-b.css       Dark / EVA theme
│   └── semantics-product-c.css       Light / MUJI theme
├── tokens-sizing.css                 Spacing, sizes, border-radius primitives
├── tokens-typography.css             Font families, weights, sizes, named styles
│
├── locales/
│   ├── en/translation.json
│   ├── ja/translation.json
│   └── zh-TW/translation.json
│
├── UIComponents/
│   ├── index.ts                      Barrel export
│   ├── Accordion/
│   │   ├── Accordion.tsx
│   │   └── accordion.module.css
│   ├── Badge/
│   ├── Button/
│   ├── Card/
│   ├── Chip/
│   ├── ChipGroup/
│   ├── Dialog/
│   ├── Footer/
│   ├── Hero/
│   ├── Icon/
│   ├── IconButton/
│   ├── InterestingFacts/
│   └── Toggle/
│
└── utils/
    └── iconSize.ts                   Maps component size props to icon px values
```

### Where to add things

| What | Where |
|------|-------|
| New primitive colour | `tokens/primitives.css` |
| New semantic token | All three `semantics-product-*.css` files |
| New reusable component | `UIComponents/{ComponentName}/` with `.tsx` + `.module.css` |
| New translation key | All three `locales/*/translation.json` files simultaneously |
| New theme | New `semantics-product-{x}.css`, add to `ThemeProvider`'s `Theme` type and toggle cycle |
