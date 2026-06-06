# Design - Vision Board

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page; extend this file when the system
needs to grow.

## Genre
modern-minimal

## Macrostructure family
- Marketing pages: Marquee Hero, only if a marketing route is added later.
- App pages: Workbench. Dense, scan-first, utility-led screens with persistent chrome.
- Content pages: Long Document with restrained type and no decorative enrichment.

## Theme
- `--color-paper`   oklch(98.8% 0.01 96)
- `--color-paper-2` oklch(96.2% 0.018 96)
- `--color-ink`     oklch(18% 0.045 268)
- `--color-ink-2`   oklch(40% 0.045 268)
- `--color-rule`    oklch(86% 0.018 96)
- `--color-accent`  oklch(83% 0.18 92)
- `--color-focus`   oklch(55% 0.2 260)

## Typography
- Display: Geist, weight 600, style normal
- Body: Geist, weight 400
- Mono: Geist Mono, weight 450
- Display tracking: 0
- Type scale anchor: `--text-display = clamp(2rem, 5vw, 4.25rem)`

## Spacing
4-point named scale in `tokens.css`. Pages use named tokens or Tailwind classes
that match the same rhythm.

## Motion
- Easings: `--ease-out`, `--ease-in`, `--ease-in-out`
- Reveal pattern: none for app pages
- Reduced-motion fallback: opacity-only, <= 150 ms

## Microinteractions Stance
- Silent success over celebratory notifications.
- Hover lift only for board cards and create actions.
- Focus rings are immediate and visible.
- Destructive actions use danger color only at the point of action.

## CTA Voice
- Primary CTA: filled accent or accent tint, 8px radius, icon plus short command.
- Secondary CTA: paper surface with hairline rule.

## Per-Page Allowances
- App pages must stay functional and dense. No decorative hero sections.
- Canvas pages use floating compact controls with the same card/rule/accent tokens.
- Dashboard pages can use small explanatory copy, but no fabricated metrics.

## What Pages Must Share
- Geist font stack.
- Warm white paper, indigo ink, yellow action accent, blue focus accent.
- 8px radius for cards and controls.
- Hairline borders with `--color-rule`.
- Compact button rhythm and immediate focus rings.

## What Pages May Differ On
- Grid density.
- Toolbar placement by viewport.
- Empty-state illustration size.

## Exports

### tokens.css
See `tokens.css` at the project root.
