# Component Reference — Yuanhhou Portfolio UI

This document covers every reusable component in `packages/ui/src/UIComponents/`. Each entry describes the component's purpose, when to reach for it, when to avoid it, and the key behaviours an implementer or AI agent should know before using it.

Styling, token, and theming rules live in [DESIGN.md](./DESIGN.md).

---

## Table of Contents

1. [Accordion](#1-accordion)
2. [Badge](#2-badge)
3. [Button](#3-button)
4. [Card](#4-card)
5. [Chip & ChipGroup](#5-chip--chipgroup)
6. [Dialog](#6-dialog)
7. [Hero](#7-hero)
8. [Icon](#8-icon)
9. [IconButton](#9-iconbutton)
10. [Toggle](#10-toggle)
11. [About](#11-about) *(page-level)*
12. [Footer](#12-footer) *(page-level)*
13. [InterestingFacts](#13-interestingfacts) *(page-level)*

---

## 1. Accordion

**File:** `UIComponents/Accordion/`

### Purpose
Progressively discloses content under labelled headings. Use it to reduce visual complexity when users only need a subset of information at a time — not as a navigation mechanism.

### When to use
- FAQs, help content, or structured reference material with many sections
- Detailed breakdowns that most users will skip (e.g. job responsibilities in a résumé)
- Any context where showing all content at once would overwhelm the page

### When NOT to use
- When most users need all the content — collapsing it adds unnecessary friction
- As a replacement for tabs; if sections are mutually exclusive views, use tabs
- For a single item — a plain section with a heading is simpler

### Do
- Write trigger labels that are meaningful out of context; a screen reader user may navigate by heading or button
- Use `allowMultiple` when sections are independent and users may want to compare them side by side
- Pass a `subtitle` to give secondary context without cluttering the title
- Set `defaultOpen` to pre-expand the most relevant item rather than leaving everything collapsed

### Don't
- Don't nest accordions — the interaction becomes confusing and the visual hierarchy breaks down
- Don't put critical actions (buttons, forms) inside accordion panels without testing keyboard flows
- Don't use `compact` mode outside of dense data contexts such as sidebars or cards

### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `AccordionItem[]` | required | Each item needs a unique `id` |
| `allowMultiple` | `boolean` | `false` | Allows more than one panel open simultaneously |
| `defaultOpen` | `string[]` | `[]` | IDs of items that start expanded |
| `compact` | `boolean` | `false` | Tighter padding for dense contexts |
| `className` | `string` | — | Appended to the root element |

**AccordionItem shape:**
```ts
{ id: string; title: ReactNode; content: ReactNode; subtitle?: ReactNode; icon?: ReactNode }
```

### Accessibility
- Trigger buttons carry `aria-expanded` and `aria-controls` linked to the panel `id`
- Panels carry `role="region"` and `aria-labelledby` pointing back to the trigger
- Closed panels use the `hidden` attribute — they are removed from the accessibility tree entirely

---

## 2. Badge

**File:** `UIComponents/Badge/`

### Purpose
A compact, non-interactive label that communicates status, category, or classification at a glance. Badges are purely informational — they do not respond to user interaction.

### When to use
- Communicating system or object status (success, warning, danger, info)
- Classifying or tagging items within a list or table
- Drawing attention to a premium or promoted state

### When NOT to use
- As a button or interactive filter — use `Chip` instead
- When the label text alone is sufficient — don't add noise with unnecessary badges
- For counts or notifications — a dedicated counter element is more appropriate

### Do
- Keep labels short — one or two words at most
- Always pair a meaningful `type` with the semantic meaning of the label (e.g. `type="danger"` with a label like "Overdue")
- Use `large` when badges appear alongside body text; use `small` within tight UI like table cells

### Don't
- Don't use `promote` for general information — reserve it for premium or upsell contexts
- Don't rely on colour alone to convey meaning; the label text must be self-explanatory for colour-blind users
- Don't stack multiple badges side by side without spacing — group them deliberately

### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string` | required | The visible text |
| `type` | `neutral` \| `success` \| `warning` \| `danger` \| `promote` | `neutral` | Controls colour |
| `size` | `small` \| `large` | `large` | |
| `icon` | `ReactNode` | — | Rendered before the label |
| `className` | `string` | — | |

### Accessibility
- Rendered as an inline `<span>` — not interactive, no role required
- If colour is the only differentiator in context, add a visually hidden description to the parent container

---

## 3. Button

**File:** `UIComponents/Button/`

### Purpose
The primary means of triggering actions or navigating with visual weight. Supports four semantic variants and renders as either a `<button>` or an `<a>` depending on whether a URL is provided.

### When to use
- Submitting a form, confirming an action, or triggering an operation
- Navigation where the link warrants a strong visual call to action
- Destructive actions using the `alert` variant, ideally paired with a confirmation Dialog

### When NOT to use
- Inline text links within a paragraph — use a styled anchor instead
- Icon-only actions where a tooltip is impractical — use `IconButton`
- When there are more than two primary actions visible at once — reconsider the layout hierarchy

### Do
- Use `primary` for the single most important action per view
- Use `secondary` or `tertiary` for supporting actions alongside a primary
- Always provide `aria-label` when using `iconOnly` mode
- Pass `href` to render an anchor — the component will automatically add `rel="noopener noreferrer"` for external URLs

### Don't
- Don't place more than one `primary` button in the same view
- Don't disable a button without communicating why — add a tooltip or adjacent hint text
- Don't use `alert` for anything other than destructive or irreversible actions
- Don't use `size="small"` as the default — reserve it for compact or secondary contexts

### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `primary` \| `secondary` \| `tertiary` \| `alert` | `primary` | |
| `size` | `small` \| `large` | `large` | |
| `href` | `string` | — | Renders `<a>` instead of `<button>` |
| `startIcon` | `ReactNode` | — | Icon before label |
| `endIcon` | `ReactNode` | — | Icon after label |
| `iconOnly` | `boolean` | `false` | Square button — requires `aria-label` |
| `icon` | `ReactNode` | — | Used only when `iconOnly` is true |
| `disabled` | `boolean` | `false` | Inherited from native button props |
| `className` | `string` | — | |

### Accessibility
- Touch target is a minimum 44px height on mobile
- Small buttons expand their hit area via a `::after` pseudo-element
- `:focus-visible` shows a `2px` ring using `--border-focus`
- Icon-only buttons without `aria-label` will be invisible to screen readers

---

## 4. Card

**File:** `UIComponents/Card/`

### Purpose
A flexible surface for grouping related content — text, imagery, or actions — into a visually distinct container. Cards create scannable information hierarchies without imposing rigid structure.

### When to use
- Displaying a collection of similar items (work samples, articles, features)
- Grouping a title, description, and optional action into a cohesive unit
- Presenting an asset (icon or image) alongside descriptive text

### When NOT to use
- As a generic wrapper for layout — use semantic HTML sections or divs instead
- When the content has no visual or conceptual relationship — separate sections are clearer
- For interactive selection — use `Chip` or a list with radio buttons

### Do
- Set `titleAs` to the correct heading level for document hierarchy — don't default to `h2` everywhere
- Use `direction="horizontal"` when the asset and text are equally weighted
- Use `variant="transparent"` when the card sits on a surface that already provides contrast
- Keep body text concise — cards communicate at a glance, not in detail

### Don't
- Don't overload a card with more than one call-to-action in the `footer`
- Don't use `assetType="image"` with small or icon-sized graphics — use `assetType="icon"` instead
- Don't rely on card borders alone to separate content on low-contrast backgrounds

### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `title` | `ReactNode` | — | |
| `body` | `ReactNode` | — | |
| `footer` | `ReactNode` | — | Typically contains a Button |
| `asset` | `ReactNode` | — | Icon or image node |
| `assetType` | `icon` \| `image` | `icon` | Controls asset sizing: 32px vs 160px |
| `direction` | `horizontal` \| `vertical` | `vertical` | Stacks on mobile regardless |
| `variant` | `transparent` \| `filled` | `filled` | `transparent` removes background |
| `titleAs` | `h2`–`h6` \| `div` | `h3` | Match the document heading hierarchy |
| `className` | `string` | — | |

### Accessibility
- `titleAs` allows the correct heading level to be set — always match page context
- Cards are not interactive by default; if the entire card is clickable, wrap in an anchor and ensure the title is the link text

---

## 5. Chip & ChipGroup

**File:** `UIComponents/Chip/`, `UIComponents/Chip/ChipGroup.tsx`

### Purpose
`Chip` is a compact, interactive token for filtering, tagging, or selecting options. `ChipGroup` manages a set of chips with keyboard navigation and single or multi-select semantics.

### When to use
- Filter sets where users refine a list of results
- Multi-select or single-select option groups where a full dropdown would feel heavy
- Tag-style selection where options can be toggled on and off

### When NOT to use
- Binary on/off settings — use `Toggle` instead
- Navigating between views — use tabs or navigation links
- Large option sets (more than 8–10 items) — a dropdown or listbox is easier to scan

### Do
- Always use `ChipGroup` rather than composing individual `Chip` components manually — it handles keyboard navigation and ARIA roles correctly
- Set `multiple` based on whether the user can select more than one option at a time
- Provide `aria-labelledby` on `ChipGroup` to associate it with a visible heading or label
- Use the `icon` prop to reinforce meaning when the label alone may be ambiguous

### Don't
- Don't use `Chip` standalone without managing `selected` state and `role` — use `ChipGroup`
- Don't mix `multiple` and single-select behaviour within one group
- Don't exceed one line of chip items without a scroll or overflow strategy

### Props — Chip

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `ReactNode` | required | |
| `selected` | `boolean` | `false` | |
| `onClick` | `() => void` | — | |
| `role` | `radio` \| `checkbox` | `button` | Set automatically by ChipGroup |
| `showIcon` | `boolean` | `true` | Shows check (selected) or caret (unselected) |
| `icon` | `ReactNode` | — | Overrides default icon |
| `tabIndex` | `number` | — | Managed by ChipGroup |

### Props — ChipGroup

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `ChipItem[]` | required | `{ id: string \| number; label: ReactNode }` |
| `selected` | `(string \| number)[]` | `[]` | Controlled selection |
| `onChange` | `(selected) => void` | — | |
| `multiple` | `boolean` | `false` | Enables multi-select |
| `aria-labelledby` | `string` | — | ID of the label element |

### Accessibility
- `ChipGroup` uses `role="radiogroup"` (single) or `role="group"` (multiple)
- Arrow keys, Home, and End navigate between chips (WCAG 2.1.1)
- Focus is managed via `tabIndex` — only the active chip is in the tab order at any time
- `aria-checked` is set on each chip; `aria-pressed` is used for standalone button roles

---

## 6. Dialog

**File:** `UIComponents/Dialog/`

### Purpose
A modal overlay that interrupts the current flow to require a user decision or present critical information. The underlying page is inert while the dialog is open.

### When to use
- Confirming destructive or irreversible actions (delete, cancel, overwrite)
- Collecting focused input that cannot happen inline
- Presenting blocking information that must be acknowledged before continuing

### When NOT to use
- Non-critical information — use a toast, banner, or inline message instead
- Complex multi-step flows — break them into pages or a dedicated modal with steps
- Displaying content the user might want to scroll or reference alongside the page

### Do
- Always provide a clear `title` that describes what the dialog is about
- Include a `description` for additional context when the title alone may be ambiguous
- Use `actions` to provide at least one explicit resolution — never leave a dialog without a way to close it
- Set `closeLabel` to a descriptive string (e.g. "Cancel and return to dashboard") for screen readers when "Close" is ambiguous

### Don't
- Don't open a dialog from inside another dialog
- Don't disable `closeOnEscape` without a strong reason — it is the expected keyboard exit
- Don't put long scrollable content inside a dialog — it is not designed for document-length material
- Don't trigger a dialog automatically without a user gesture; it disrupts the experience and breaks WCAG 2.4.3

### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `open` | `boolean` | required | Controls visibility |
| `onClose` | `() => void` | required | Called on close regardless of method |
| `title` | `string` | required | Visible heading; also the accessible name |
| `description` | `string` | — | Secondary explanatory text |
| `actions` | `ReactNode` | — | Typically one or two `Button` components |
| `children` | `ReactNode` | — | Custom content; replaces `description` |
| `closeOnOverlayClick` | `boolean` | `true` | |
| `closeOnEscape` | `boolean` | `true` | |
| `closeLabel` | `string` | `"Close dialog"` | Accessible label for the × button |
| `className` | `string` | — | Applied to the inner dialog panel |

### Accessibility
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby` are all applied automatically
- Focus moves to the dialog on open and returns to the triggering element on close
- Body scroll is disabled while the dialog is open
- Escape key closes by default

---

## 7. Hero

**File:** `UIComponents/Hero/`

### Purpose
A high-impact introductory section that establishes the page's primary message. Typically the first meaningful content a user sees, combining a heading, supporting text, optional media, and a primary call to action.

### When to use
- As the top section of a landing page or portfolio entry
- When a page needs a clear focal point before the user scrolls into detail
- When a brand statement or visual impression is the primary communication goal

### When NOT to use
- On internal pages where users arrive with specific intent — jump straight to content
- When there is no meaningful heading or context to anchor the section
- As a repeated pattern mid-page — it loses its impact when used more than once

### Do
- Set `headingLevel` to match the document hierarchy — `h1` for page-level heroes, `h2` for section heroes
- Provide `imageAlt` with a meaningful description when the image contributes to the narrative
- Use `videoSrc` with a `videoPoster` fallback so users see something while the video loads
- Prefer `imageVariant="circle"` for portrait or profile imagery

### Don't
- Don't use autoplay video without honouring `prefers-reduced-motion` — the component handles this automatically if `videoAutoplay` is true
- Don't omit `ctaLabel` when providing `ctaHref` — the link needs a visible label
- Don't use the `brand` type on neutral informational pages — it implies a promotional context

### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `title` | `ReactNode` | required | |
| `subtitle` | `ReactNode` | — | |
| `headingLevel` | `h1`–`h6` | `h1` | Match page structure |
| `type` | `default` \| `brand` | `default` | `brand` applies brand-coloured background |
| `imageSrc` | `string` | — | |
| `imageAlt` | `string` | `""` | Required if image conveys meaning |
| `imageVariant` | `default` \| `circle` | `default` | `circle` crops to 220px circle |
| `videoSrc` | `string` | — | Takes priority over `imageSrc` |
| `videoPoster` | `string` | — | Fallback frame for video |
| `videoAutoplay` | `boolean` | `false` | Paused if user prefers reduced motion |
| `videoLoop` | `boolean` | `false` | |
| `ctaLabel` | `ReactNode` | — | CTA button label |
| `ctaHref` | `string` | — | CTA link target |
| `onCtaClick` | `MouseEventHandler` | — | CTA click handler |
| `className` | `string` | — | |

### Accessibility
- The section uses `role="region"` with `aria-labelledby` pointing to the heading
- Video is `aria-hidden` and `muted` — decorative media should not be announced
- Autoplay is suppressed when `prefers-reduced-motion: reduce` is active

---

## 8. Icon

**File:** `UIComponents/Icon/`

### Purpose
A consistent wrapper around Phosphor icons that applies design token–based sizing and colour. Use this instead of rendering Phosphor icons directly to ensure tokens are respected across themes.

### When to use
- Any time a Phosphor icon appears inside a component
- When icon colour or size should respond to the active theme

### When NOT to use
- For icon-only interactive controls — use `IconButton` instead
- When you need a custom SVG that isn't part of Phosphor — render it directly as an SVG with appropriate aria attributes

### Do
- Pass `aria-label` when the icon conveys meaning that is not communicated by surrounding text
- Omit `aria-label` (or set `aria-hidden={true}`) for decorative icons — the component defaults to `aria-hidden` when no label is provided
- Use `color="inherit"` when the icon should match the surrounding text colour

### Don't
- Don't set both `aria-label` and place the icon inside an already-labelled button — the label would be announced twice
- Don't use the `Icon` component as a button — wrap it in `IconButton` instead

### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `icon` | `React.ElementType` | required | A Phosphor icon component |
| `size` | `sm` \| `md` \| `lg` \| `xl` | `md` | Maps to token-based px values |
| `color` | `primary` \| `secondary` \| `tertiary` \| `brand` \| `success` \| `danger` \| `warning` \| `info` \| `on-primary` \| `inherit` | `inherit` | |
| `weight` | `thin` \| `light` \| `regular` \| `bold` \| `fill` \| `duotone` | `regular` | Passed to Phosphor |
| `aria-label` | `string` | — | Required for meaningful icons |
| `aria-hidden` | `boolean` | `true` | Auto-applied when no label is set |

---

## 9. IconButton

**File:** `UIComponents/IconButton/`

### Purpose
An icon-only interactive control for actions where a text label would take up too much space. Renders as a `<button>` or `<a>` depending on context.

### When to use
- Toolbars, action menus, and compact controls where the icon is universally understood (close, edit, share)
- Social links and external navigations in footers or cards
- Supplementary actions that do not need a label when paired with tooltips or context

### When NOT to use
- When the action is the primary or most important control on the page — use `Button` with a visible label
- When the icon's meaning is ambiguous without a label in context
- For toggle states where the icon changes — the state change may not be apparent to screen reader users

### Do
- Always provide `aria-label` — it is enforced as required in the component's TypeScript interface
- Set `external={true}` when `href` navigates off-site; the component handles `target="_blank"` and `rel` automatically
- Use `variant="ghost"` for secondary actions that should not compete with nearby primary actions

### Don't
- Don't use `variant="danger"` for neutral or non-destructive actions — it implies a risk
- Don't remove the focus ring — it is required for keyboard and switch users

### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `icon` | `React.ElementType` | required | A Phosphor icon component |
| `aria-label` | `string` | required | Accessible name |
| `size` | `sm` \| `md` \| `lg` | `md` | 32 / 40 / 48px |
| `variant` | `default` \| `ghost` \| `brand` \| `danger` | `default` | |
| `weight` | Phosphor weight | `regular` | |
| `href` | `string` | — | Renders `<a>` |
| `external` | `boolean` | `false` | Adds `target="_blank"` + rel |
| `disabled` | `boolean` | `false` | |

### Accessibility
- `aria-label` is required by the TypeScript type — a build error results if omitted
- Disabled state uses `opacity: 0.4` and `pointer-events: none`; still appears in the tab order unless `disabled` attribute is also set

---

## 10. Toggle

**File:** `UIComponents/Toggle/`

### Purpose
A binary switch control for enabling or disabling a single setting. Semantically equivalent to a checkbox but styled as a switch to signal an immediate effect.

### When to use
- Turning a feature, preference, or mode on or off with an immediate effect (no submit required)
- Settings panels, preference screens, or configuration forms
- Theme switching, notifications, or accessibility options

### When NOT to use
- Confirming a choice before submitting a form — use a checkbox instead
- Selecting between more than two options — use `ChipGroup` or a radio group
- Toggling visibility of content within a page — use `Accordion` or a show/hide button

### Do
- Always provide a `label` — even if hidden with `hideLabel`, it is required for screen readers
- Use uncontrolled mode (`defaultChecked`) for self-contained settings that don't need to be managed by parent state
- Use controlled mode (`checked` + `onChange`) when the toggle state needs to be reflected elsewhere in the UI

### Don't
- Don't omit the label entirely — `hideLabel` hides it visually but keeps it in the accessibility tree; removing it breaks the component's accessibility
- Don't use a toggle for actions that are destructive or irreversible — the switch implies instant effect with easy reversal

### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `checked` | `boolean` | — | Controlled mode |
| `defaultChecked` | `boolean` | `false` | Uncontrolled mode |
| `onChange` | `(checked: boolean) => void` | — | |
| `label` | `string` | — | Visible or screen-reader-only label |
| `hideLabel` | `boolean` | `false` | Hides label visually via `.srOnly` |
| `disabled` | `boolean` | `false` | |
| `id` | `string` | auto | Auto-generated with `useId` if omitted |
| `name` | `string` | — | For form submission |
| `className` | `string` | — | |

### Accessibility
- Renders a hidden `<input type="checkbox">` with `role="switch"` and `aria-checked`
- Label is associated via `htmlFor` / `useId` — always in the DOM even when visually hidden
- Thumb animation is suppressed when `prefers-reduced-motion: reduce` is active

---

## 11. About *(page-level)*

**File:** `UIComponents/About/`

### Purpose
A full page section that presents education history and work experience in a two-column bento layout. This is a portfolio-specific composition component, not a general-purpose UI primitive.

### When to use
- The About / CV section of the portfolio

### When NOT to use
- As a general two-column layout container — use CSS grid directly
- In contexts outside the portfolio app

### Notes
- Internally uses `Accordion` for expandable job responsibility details
- All text content is sourced from i18n translation keys — do not hardcode strings
- `defaultOpen` is set to `'bupa'` — change the default open job by updating that value

---

## 12. Footer *(page-level)*

**File:** `UIComponents/Footer/`

### Purpose
The site-wide footer displaying copyright, social links (LinkedIn, Resume PDF, Spotify), and the current year. Purely presentational.

### When to use
- Once, at the bottom of every page

### Notes
- Year is calculated dynamically via `new Date().getFullYear()`
- All link labels come from i18n keys — update translations, not the component
- External links automatically include `rel="noopener noreferrer"`

---

## 13. InterestingFacts *(page-level)*

**File:** `UIComponents/InterestingFacts/`

### Purpose
A bento-grid section that presents personal facts, tools, companies, testimonials, and interests in a visually rich mosaic layout. Portfolio-specific; not a general-purpose component.

### When to use
- The personal/interests section of the portfolio

### When NOT to use
- As a reusable grid layout — the card positions are fixed to this specific content

### Notes
- Logo assets switch between light and dark variants based on `useCurrentTheme()` — update the theme-conditional logic when adding new logos
- The sporty card supports keyboard interaction (`Enter` / `Space`) for the animation trigger
- All images use `loading="lazy"` — do not remove this for above-the-fold images if the section moves
- Testimonial and gradient cards have fixed grid positioning — changing the grid structure requires updating both the CSS and the JSX order

---

## Quick reference

| Component | Interactive | Polymorphic | Controlled | i18n | ARIA role |
|-----------|:-----------:|:-----------:|:----------:|:----:|-----------|
| Accordion | ✓ | — | Uncontrolled | — | `region`, `button[aria-expanded]` |
| Badge | — | — | — | — | — (inline span) |
| Button | ✓ | ✓ (button/a) | — | — | — |
| Card | — | — | — | — | — |
| Chip | ✓ | — | — | — | `button` / `radio` / `checkbox` |
| ChipGroup | ✓ | — | Controlled | — | `radiogroup` / `group` |
| Dialog | ✓ | — | Controlled | — | `dialog[aria-modal]` |
| Hero | — | — | — | — | `region` |
| Icon | — | — | — | — | `img` (if labelled) |
| IconButton | ✓ | ✓ (button/a) | — | — | — |
| Toggle | ✓ | — | Both | — | `switch` |
| About | — | — | — | ✓ | — |
| Footer | — | — | — | ✓ | — |
| InterestingFacts | Partial | — | — | — | — |
