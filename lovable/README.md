# Lovable Design Skill

Design and development skill for [Lovable](https://lovable.dev) — an AI development platform for building visually distinctive web applications.

## Overview

A comprehensive guide to creating professional-grade, visually distinctive web applications with exceptional UI/UX — the Lovable way. Emphasizes committing to a specific aesthetic direction rather than averaging across options.

## Stack

- **Framework:** Vite + TanStack Router/Start
- **Styling:** Tailwind CSS (oklch tokens)
- **Components:** shadcn/ui (extended via variants)
- **Language:** TypeScript
- **Motion:** Framer Motion + tw-animate-css
- **Backend:** Lovable Cloud

## Key Principles

1. **Commit to a tone, don't average** — Pick a specific direction and execute with conviction
2. **Restraint compounds** — Negative space + one signature move beats ten "nice touches"
3. **Specific over generic** — Specific copy, imagery, iconography. Generic is the AI tell
4. **Tokens are law** — Every visual decision in CSS variables, never hex in components
5. **Composition is load-bearing** — Layout choices carry more weight than color/font picks
6. **Ship interesting, never ugly** — Be bold without sacrificing legibility

## Aesthetic

- A clear point of view in the first viewport
- Semantic tokens in `oklch` for perceptually uniform colors
- shadcn/ui extended via `cva` variants, not inline overrides
- One or two signature transitions, not micro-interactions everywhere
- Generous spacing on marketing, tight precision on app surfaces

## Quick Start

### Load as System Prompt

```python
with open('lovable/SKILL.md', 'r') as f:
    skill = f.read()

messages = [
    {"role": "system", "content": skill},
    {"role": "user", "content": "Build a SaaS landing page"}
]
```

### Key Rules

- **Colors:** 3-5 via oklch semantic tokens + composite tokens for gradients/shadows
- **Typography:** 2 fonts max, display font is NOT Inter/Poppins/Roboto
- **Routes:** Each content section is its own route (not hash anchors)
- **Variants:** Extend button variants, don't override inline
- **Motion:** One hero animation, respect `prefers-reduced-motion`

## File

- [SKILL.md](./SKILL.md) — Full skill specification (~1150 lines)

## Signature Patterns

### oklch Token Structure

```css
:root {
  --primary: oklch(0.55 0.22 265);
  --primary-foreground: oklch(0.99 0 0);
  --primary-glow: oklch(0.70 0.22 265);
  
  /* Composite tokens */
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--primary-glow));
  --shadow-elegant: 0 10px 30px -10px color-mix(in oklab, var(--primary) 30%, transparent);
}
```

### Button Variant Extension

```tsx
// ✅ Add variant to button.tsx
const buttonVariants = cva("...", {
  variants: {
    variant: {
      hero: "bg-gradient-to-r from-primary to-primary-glow shadow-[var(--shadow-glow)] hover:scale-[1.02]",
    },
  },
});

<Button variant="hero">Start free</Button>

// ❌ Don't override inline
<Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
```

### TanStack Router Route

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Acme — The fastest way to ship" },
      { name: "description", content: "..." },
    ],
  }),
});
```

## The First Question Before Coding

Before writing any component, answer in one sentence each:

1. **Purpose** — Who uses this and what problem does it solve?
2. **Tone** — Named direction with a reference (e.g., "editorial like Stripe Press")
3. **Differentiator** — The one move that makes this memorable

If you can't answer all three, generate 2-3 distinct directions for the user to pick.

## Version

Current: `1.0.0`

## License

MIT — See [LICENSE](../LICENSE)
