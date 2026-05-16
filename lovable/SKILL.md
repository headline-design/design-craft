---
name: lovable
description: Use this skill whenever building, editing, or reviewing user-facing software with Lovable — web apps, dashboards, marketing sites, SaaS surfaces, component libraries, or any code change that produces visual output. Triggers on requests to "build a UI", "design a page", "make a component", "improve the look", "polish this", "make it production-ready", or whenever scaffolding a new app, screen, or feature with visible surface area. Encodes Lovable's opinionated defaults for Tailwind CSS, shadcn/ui, oklch design tokens, typography, spacing, color, motion, accessibility, and the component patterns that hold up under real users.
version: 1.0.0
triggers:
  - build a UI
  - design a page
  - make a component
  - improve the look
  - polish this
  - make it production-ready
  - SaaS landing page
  - marketing site
stack:
  - Vite
  - React
  - TanStack Router
  - Tailwind CSS
  - shadcn/ui
  - TypeScript
  - Framer Motion
  - oklch
---

# Lovable Design & Development Skill

A comprehensive guide to creating professional-grade, visually distinctive web applications with exceptional UI/UX — the Lovable way.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout & Spacing](#layout--spacing)
5. [Motion & Interaction](#motion--interaction)
6. [Component Architecture](#component-architecture)
7. [Tailwind CSS Patterns](#tailwind-css-patterns)
8. [Accessibility](#accessibility)
9. [Performance](#performance)
10. [Code Organization](#code-organization)
11. [UI/UX Principles](#uiux-principles)
12. [Common Patterns](#common-patterns)
13. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
14. [Quick Reference Checklist](#quick-reference-checklist)

---

## Design Philosophy

### Core Principles

1. **Commit to a tone, don't average across them** — "Modern and clean" is a non-decision. Pick one: brutally minimal, maximalist, editorial, retro-futuristic, technical, soft-Scandi, neo-brutalist. Execute with conviction.
2. **Restraint compounds** — Negative space, a single signature move, and disciplined tokens beat ten "nice touches."
3. **Specific over generic** — Specific copy, specific imagery, specific iconography. Generic everything is the AI tell.
4. **Tokens are law** — Every visual decision lives in CSS variables. Components consume tokens, never hex.
5. **Composition is load-bearing** — Layout choices (asymmetry, density, hierarchy) carry more weight than color or font picks.
6. **Ship interesting, never ugly** — Be bold, but never at the cost of legibility or polish.

### The Lovable Aesthetic

- A clear point of view in the first viewport — display typography, an unexpected layout move, or a signature gradient
- Semantic tokens in `oklch` for color, with composite tokens for gradients/shadows/transitions
- shadcn/ui as the foundation, **extended via variants** rather than overridden inline
- Motion that earns its place: one or two signature transitions, not micro-interactions on every element
- Generous spacing on marketing surfaces, tight precision on app surfaces

### The First Question Before Coding

Before writing any component, answer three things in one sentence each:

1. **Purpose** — Who uses this and what problem does it solve?
2. **Tone** — Named direction with a reference (e.g. "editorial like Stripe Press", "technical like Linear", "playful like Arc").
3. **Differentiator** — The one move that makes this memorable.

If you can't answer all three, generate 2–3 distinct directions for the user to pick from before building. Never silently average.

---

## Color System

### The 3–5 Color Rule

**Use exactly 3–5 colors total.** This constraint is what makes designs read as intentional.

#### Required Structure

```
1   Primary brand color   → CTAs, key actions, brand identity
2-3 Neutrals              → Backgrounds, text, borders, surfaces
1-2 Accents               → Status, highlights, secondary actions
```

#### Color Selection Guidelines

| Use Case          | Recommendation                                        |
| ----------------- | ----------------------------------------------------- |
| Primary actions   | Saturated, accessible brand color                     |
| Backgrounds       | Off-whites, soft tinted neutrals (never pure white)   |
| Text              | Near-black in `oklch(0.13–0.20 …)`, never pure black  |
| Borders/Dividers  | Very subtle neutrals, often with 10–20% opacity       |
| Success states    | Greens in the teal family                             |
| Error/destructive | Warm reds, never neon                                 |
| Warning states    | Amber/orange tones                                    |

#### Color Temperature Rules

- **DO** use analogous palettes: blue→teal, purple→pink, orange→red.
- **DON'T** mix opposing temperatures across primary surfaces: pink→green, orange→blue, red→cyan.
- **Avoid purple/violet as primary** unless explicitly requested or the brand calls for it. It's the AI default tell.

#### Gradient Rules

- Avoid gradients unless the direction calls for them — solid colors are cleaner.
- If gradients are used:
  - Subtle accents only (hero glow, button hover, decorative blur) — never on primary text or core UI.
  - 2–3 color stops maximum.
  - Analogous colors only.
  - Define as a composite token (`--gradient-primary`), never inline.

### Design Tokens — oklch + shadcn convention

Lovable projects use **oklch** for color (wider gamut, perceptually uniform, easy to derive variants). Define tokens in `src/styles.css`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}

:root {
  --radius: 0.625rem;

  /* Surfaces */
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.129 0.042 264.695);

  /* Brand */
  --primary: oklch(0.55 0.22 265);
  --primary-foreground: oklch(0.99 0 0);
  --primary-glow: oklch(0.70 0.22 265);

  /* Composite tokens — define gradients, shadows, transitions ONCE */
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--primary-glow));
  --gradient-subtle: linear-gradient(180deg, var(--background), oklch(0.97 0.01 265));
  --shadow-elegant: 0 10px 30px -10px color-mix(in oklab, var(--primary) 30%, transparent);
  --shadow-glow:    0 0 40px color-mix(in oklab, var(--primary-glow) 40%, transparent);
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* States */
  --secondary: oklch(0.968 0.007 247.896);
  --secondary-foreground: oklch(0.208 0.042 265.755);
  --muted: oklch(0.968 0.007 247.896);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.984 0.003 247.858);
  --border: oklch(0.929 0.013 255.508);
  --input: oklch(0.929 0.013 255.508);
  --ring: oklch(0.704 0.04 256.788);
}

.dark {
  /* Every :root token MUST have a dark counterpart */
  --background: oklch(0.129 0.042 264.695);
  --foreground: oklch(0.984 0.003 247.858);
  /* ...etc */
}
```

**Critical Rules:**

- Never write `text-white`, `bg-black`, `bg-[#hex]`, or `text-blue-500` inside components.
- Define color in **oklch**, not HSL or hex. It makes hover/active/glow derivations trivial.
- Composite tokens (`--gradient-*`, `--shadow-*`, `--transition-*`) live alongside colors. Don't redefine gradients per component.
- If dark mode is in scope, every `:root` token gets a `.dark` counterpart. Audit by token name.

---

## Typography

### The 2 Font Maximum Rule

**Limit to 2 font families.** More creates visual chaos.

#### Font Pairing Strategy

```
Display: distinctive personality, used at large sizes (hero, section heads)
Body:    highly readable, used everywhere else
```

#### Avoid the AI Defaults

Refuse Inter / Poppins / Roboto / Open Sans as the sole choice. They read as "I didn't decide."

#### Recommended Pairings

| Style              | Display              | Body                |
| ------------------ | -------------------- | ------------------- |
| Editorial          | Fraunces, Playfair   | Inter, Source Sans  |
| Premium soft       | Instrument Serif     | Söhne, Geist        |
| Technical / CAD    | JetBrains Mono       | Geist, Inter        |
| Brutalist          | Space Grotesk        | IBM Plex Mono       |
| Modern minimal     | Geist                | Geist Mono          |
| Startup            | Cal Sans, Manrope    | Inter               |
| Creative           | Space Grotesk        | DM Sans             |

#### Typography Scale

```
text-xs    → 12px  → Fine print, labels
text-sm    → 14px  → Secondary text, captions
text-base  → 16px  → Body text (minimum for readability)
text-lg    → 18px  → Lead paragraphs
text-xl    → 20px  → Section headers
text-2xl   → 24px  → Card titles
text-3xl   → 30px  → Page sections
text-4xl   → 36px  → Hero subheadings
text-5xl   → 48px  → Hero headings
text-6xl+  → 60px+ → Display (uncomfortable on purpose)
```

For marketing heroes, use fluid type: `clamp(2.5rem, 8vw, 7rem)` with `tracking-tight` and `leading-[0.95]`.

#### Line Height Rules

- **Body text:** `leading-relaxed` (1.625) or `leading-7`. Default browser line-height is too tight.
- **Headings:** `leading-tight` (1.25) or `leading-snug` (1.375). Display sizes go even tighter: `leading-[0.95]`.
- **Tracking:** large display gets negative tracking (`tracking-tight` / `-0.04em`). Small caps and labels get positive tracking.

#### Text Wrapping

- Wrap headlines in `text-balance` for optimal line breaks.
- Use `text-pretty` for important copy.
- Constrain prose with `max-w-prose` or `max-w-2xl` (~65ch).
- One H1 per page; headings in order.

#### Font Implementation (Lovable / Vite stack)

```css
/* src/styles.css */
@import url("https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;800&family=Inter:wght@400;500;600&display=swap");

:root {
  --font-display: "Fraunces", ui-serif, Georgia, serif;
  --font-sans:    "Inter", ui-sans-serif, system-ui, sans-serif;
}

@theme inline {
  --font-display: var(--font-display);
  --font-sans: var(--font-sans);
}
```

```tsx
<h1 className="font-display text-6xl tracking-tight">…</h1>
<p className="font-sans text-base leading-relaxed">…</p>
```

---

## Layout & Spacing

### Mobile-First Always

```tsx
// ✅ Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// ❌ Desktop-first
<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
```

### Layout Method Priority

1. **Flexbox** — Most layouts (navs, cards, simple grids).
2. **CSS Grid** — Complex 2D layouts, bento grids, dashboards.
3. **Absolute positioning** — Only when necessary (modals, tooltips, decorative).
4. **Never floats.**

### Spacing Scale

```
4px   = p-1     → Tiny gaps (icon padding)
8px   = p-2     → Small gaps (tight button padding)
12px  = p-3     → Compact spacing
16px  = p-4     → Standard spacing (most common)
24px  = p-6     → Comfortable card padding
32px  = p-8     → Section spacing
48px  = p-12    → Large section gaps
64px  = p-16    → Hero spacing
96px  = p-24    → Major section dividers (marketing)
128px = p-32    → Premium marketing breathing room
```

### Spacing Rules

```tsx
// ✅ Use gap for flex/grid
<div className="flex items-center gap-4">…</div>
<div className="grid grid-cols-3 gap-6">…</div>

// ✅ Use padding for containers
<section className="px-4 py-24 md:px-6 lg:py-32">…</section>

// ❌ Avoid space-* (less flexible, weird with wrapping)
<div className="space-y-4">…</div>

// ❌ Don't mix gap and margin on the same element
<div className="flex gap-4 mb-4">…</div>
```

### Container Patterns

```tsx
// Standard content container
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">…</div>

// Narrow content (articles, forms)
<div className="mx-auto max-w-2xl px-4">…</div>

// Full-bleed background with contained content
<section className="w-full bg-muted">
  <div className="mx-auto max-w-7xl px-4 py-24">…</div>
</section>
```

### Composition Moves That Read as "Designed"

- Asymmetric hero (text left, image bleeding off the right edge)
- Oversized display type with body content offset below
- A single off-grid element (rotated card, oversized numeral, decorative SVG)
- Horizontal scroll rows instead of yet-another-3-col-grid
- Sticky side labels, running headers
- Numbered sections (01 / 02 / 03) with display-sized numerals
- Marquee strips of logos or words moving slowly
- Annotated UI (small captions with arrows pointing to a hero screenshot)

### Responsive Breakpoints

```
sm:  640px   → Large phones, small tablets
md:  768px   → Tablets
lg:  1024px  → Small laptops
xl:  1280px  → Desktops
2xl: 1536px  → Large desktops
```

Design and verify at **375px** first, then enhance up.

---

## Motion & Interaction

One excellent animation beats ten micro-interactions on every element.

### Library

- **framer-motion** for React component animation.
- **tw-animate-css** for Tailwind utility animations (included in the Lovable template).
- CSS transitions for simple hover/focus state changes.

### Easings & Durations

Define as constants — no magic numbers sprinkled in components.

```ts
export const ease = {
  smooth: [0.4, 0, 0.2, 1] as const,   // default UI
  expoOut: [0.16, 1, 0.3, 1] as const,  // entrances
  spring: { type: "spring", stiffness: 300, damping: 30 },
};

export const duration = {
  fast: 0.15,    // UI feedback
  base: 0.25,    // hover, focus
  slow: 0.5,     // entrances
  hero: 0.7,     // signature reveals
};
```

### Rules

- Animate `transform` and `opacity` — not `width`/`height`/`top`/`left` (layout thrash).
- Durations: 150–250ms UI, 400–700ms entrances. Never > 1.2s.
- **Stagger lists** with `staggerChildren: 0.05–0.1` for elegance.
- Respect `prefers-reduced-motion` for any decorative motion.
- **One signature motion in the hero**, not five things competing.

### Patterns

```tsx
// Subtle hover lift
"transition-transform duration-200 hover:-translate-y-1"

// Press feedback
"active:scale-[0.98] transition-transform"

// Smooth color
"transition-colors duration-200 hover:bg-accent"

// Entrance (with tw-animate-css)
"animate-in fade-in slide-in-from-bottom-4 duration-500"

// Combined polish
"transition-all duration-300 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-0.5"
```

---

## Component Architecture

### File Structure (Lovable / TanStack Start)

```
src/
├── routes/                    # File-based routes (TanStack Start)
│   ├── __root.tsx             # Root layout + providers
│   ├── index.tsx              # Home
│   ├── about.tsx              # /about
│   ├── pricing.tsx            # /pricing
│   ├── settings.tsx           # /settings layout (renders <Outlet />)
│   └── settings.profile.tsx   # /settings/profile (nested)
├── components/
│   ├── ui/                    # shadcn primitives (extend via variants, don't rewrite)
│   ├── [feature]/             # Feature components
│   ├── layout/                # Header, footer, shell
│   └── shared/                # Logo, theme-toggle, common bits
├── hooks/                     # use-* hooks
├── lib/                       # utils, validators, constants
├── assets/                    # Imported images (ES6 imports)
└── styles.css                 # Tokens + base styles
```

**Important Lovable conventions:**

- Routes live in `src/routes/` (TanStack Start file-based). Don't create `src/pages/` or `app/`.
- For content sites with multiple sections (About, Services, Pricing, Contact), create **separate route files** — not hash anchors on the index page. Each route gets its own `<title>` and meta.
- Backend logic uses **Lovable Cloud** (database, auth, storage, edge functions) — enabled via the platform.

### Component Design Principles

1. **Single responsibility** — one component, one job.
2. **Composition over configuration** — build complex UIs from small parts.
3. **Props for customization** — never hardcode values that vary.
4. **Sensible defaults** — works out of the box.
5. **Variants over inline overrides** — extend `cva` variants instead of `className="bg-[#hex]"`.

### Component Template

```tsx
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: "default" | "highlighted";
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  variant = "default",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]",
        variant === "highlighted" && "border-primary shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      {icon && (
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl tracking-tight text-card-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
```

### Extending shadcn via Variants (Not Overrides)

```tsx
// ❌ Don't override inline
<Button className="bg-white text-black border-white hover:bg-white/90">…</Button>

// ✅ Add a variant in components/ui/button.tsx
const buttonVariants = cva("…", {
  variants: {
    variant: {
      hero: "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-[1.02]",
      ghostInverted: "bg-transparent text-background hover:bg-background/10",
    },
  },
});

<Button variant="hero">Start free</Button>
```

### Page Structure

```tsx
// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/marketing/hero";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { CTA } from "@/components/marketing/cta";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Acme — The fastest way to ship" },
      { name: "description", content: "…specific, sells the click, under 160 chars…" },
    ],
  }),
});

function Home() {
  return (
    <main>
      <Hero />
      <FeatureGrid />
      <CTA />
    </main>
  );
}
```

**Never ship a 400+ line route file.** Split into logical components.

---

## Tailwind CSS Patterns

### Class Order

Order classes consistently for scannability:

```tsx
className={cn(
  // 1. Layout (display, position, sizing)
  "flex items-center justify-between",
  "relative w-full max-w-md",

  // 2. Spacing (margin, padding, gap)
  "p-4 gap-2",

  // 3. Typography
  "font-sans text-sm font-medium",

  // 4. Colors & backgrounds
  "bg-background text-foreground",

  // 5. Borders & shadows
  "rounded-lg border shadow-sm",

  // 6. Transitions & animations
  "transition-colors duration-200",

  // 7. States (hover, focus, active)
  "hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",

  // 8. Responsive overrides
  "md:p-6 lg:flex-row",
)}
```

### Utility Patterns

```tsx
// Centering
"flex items-center justify-center"
"grid place-items-center"

// Card pattern
"rounded-lg border bg-card p-6 shadow-sm"

// Interactive
"cursor-pointer transition-colors hover:bg-accent"

// Focus ring (a11y)
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

// Truncation
"truncate"          // single line
"line-clamp-2"     // multi-line

// Aspect ratios
"aspect-video"      // 16:9
"aspect-square"     // 1:1

// Backdrop blur
"bg-background/80 backdrop-blur-md"

// Dividers
"divide-y divide-border"

// Screen reader only
"sr-only"
```

### Responsive Patterns

```tsx
// Stack to row
<div className="flex flex-col gap-4 md:flex-row md:items-center">

// Grid columns
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

// Show / hide
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>

// Responsive type
<h1 className="text-4xl md:text-5xl lg:text-7xl">

// Responsive spacing
<section className="py-16 md:py-24 lg:py-32">
```

---

## Accessibility

### Semantic HTML First

```tsx
// ✅
<header>
  <nav><ul><li><Link to="/">Home</Link></li></ul></nav>
</header>
<main>
  <h1>Page Title</h1>
  <section><h2>Section</h2>…</section>
</main>
<footer>…</footer>

// ❌
<div className="header"><div className="nav">…</div></div>
```

### Focus Management

```tsx
// Always use focus-visible (not focus) so mouse clicks don't show rings
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

// Focus within (form groups)
"focus-within:ring-2 focus-within:ring-ring"

// Skip link
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4">
  Skip to content
</a>
```

### Screen Reader Support

```tsx
// SR-only text
<span className="sr-only">Open menu</span>

// Aria labels
<button aria-label="Close dialog"><X /></button>

// Live regions
<div role="status" aria-live="polite">{statusMessage}</div>
```

### Images

```tsx
<img src="…" alt="Founder Jane Doe speaking at conference" />          // informative
<img src="…" alt="" role="presentation" />                              // decorative
```

### Color Contrast

- Body text ≥ **4.5:1**.
- Large text ≥ **3:1**.
- Interactive elements ≥ **3:1** against adjacent colors.
- **Never rely on color alone** to convey state — pair with icon or text.

### Keyboard Navigation

```tsx
// ✅ Naturally focusable
<button onClick={…}>Clickable</button>

// ❌ Div as button — invisible to keyboard
<div onClick={…}>Clickable</div>

// ✅ If a div must be interactive
<div role="button" tabIndex={0} onClick={…} onKeyDown={(e) => e.key === "Enter" && …}>
```

### Role Storage (Lovable Cloud)

Never store roles or admin flags in `localStorage`/`sessionStorage`. Store roles in a dedicated `user_roles` table behind RLS, with a `SECURITY DEFINER` `has_role()` function. Client-side flags are trivially manipulated.

---

## Performance

### Images

Lovable projects use plain `<img>` (Vite, not Next.js). Optimize manually:

```tsx
import hero from "@/assets/hero.jpg";

<img
  src={hero}
  alt="…"
  width={1600}
  height={900}
  loading="lazy"        // below the fold
  decoding="async"
  className="aspect-video w-full object-cover"
/>;
```

- Use `loading="eager"` and `fetchpriority="high"` only on the hero image.
- Reserve dimensions to avoid CLS.
- Prefer WebP/AVIF when generating images.

### Code Splitting

```tsx
import { lazy, Suspense } from "react";
const HeavyChart = lazy(() => import("@/components/heavy-chart"));

<Suspense fallback={<ChartSkeleton />}>
  <HeavyChart />
</Suspense>;
```

### Loading States

```tsx
// ✅ Skeleton (preferred)
<div className="space-y-3">
  <Skeleton className="h-12 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>

// ✅ Spinner for actions
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
</Button>
```

### Data Fetching

```tsx
// ✅ React Query for client data
const { data, isLoading, error } = useQuery({
  queryKey: ["user", id],
  queryFn: () => fetchUser(id),
});

// ✅ TanStack Router loaders for route-level data
export const Route = createFileRoute("/posts")({
  loader: () => getPosts(),
  component: Posts,
});

// ❌ Never fetch in useEffect for server data
useEffect(() => { fetch("/api/data").then(…); }, []);
```

---

## Code Organization

### Project Structure

```
src/
├── routes/                  # TanStack Start file-based routes
│   ├── __root.tsx
│   ├── index.tsx
│   ├── about.tsx
│   ├── api/                 # Server route handlers (webhooks, public APIs)
│   └── _authenticated/      # Auth-gated routes (beforeLoad redirects)
├── components/
│   ├── ui/                  # shadcn primitives
│   ├── [feature]/
│   ├── layout/
│   └── shared/
├── hooks/                   # use-* hooks
├── lib/
│   ├── utils.ts
│   ├── validations.ts       # Zod schemas
│   ├── constants.ts
│   └── *.functions.ts       # createServerFn (client-importable)
├── assets/                  # Imported images
├── styles.css               # Tokens
└── router.tsx
```

### Naming Conventions

| Type        | Convention            | Example              |
| ----------- | --------------------- | -------------------- |
| Components  | PascalCase            | `FeatureCard`        |
| Files       | kebab-case            | `feature-card.tsx`   |
| Hooks       | camelCase, `use-` prefix | `use-feature.ts`  |
| Utilities   | camelCase             | `format-date.ts`     |
| Types       | PascalCase            | `FeatureProps`       |
| Constants   | SCREAMING_SNAKE_CASE  | `MAX_FILE_SIZE`      |
| CSS vars    | kebab-case            | `--primary-glow`     |

### Import Order

```tsx
// 1. React + framework
import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

// 2. Third-party
import { motion } from "framer-motion";
import { z } from "zod";

// 3. Internal components
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/feature/feature-card";

// 4. Internal utilities / hooks
import { cn } from "@/lib/utils";
import { useFeature } from "@/hooks/use-feature";

// 5. Types
import type { Feature } from "@/types";

// 6. Assets
import hero from "@/assets/hero.jpg";
```

---

## UI/UX Principles

### Visual Hierarchy

1. **Size** — larger draws attention first.
2. **Color** — saturated against neutral creates focal points.
3. **Contrast** — high contrast = primary, low contrast = secondary.
4. **Spacing** — whitespace isolates importance.
5. **Position** — top-left to bottom-right reading flow.

### Interactive States

Every interactive element needs default / hover / focus / active / disabled.

```tsx
<button
  className={cn(
    "rounded-md bg-primary px-4 py-2 text-primary-foreground",
    "transition-all duration-200",
    "hover:bg-primary/90 hover:shadow-md",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  )}
>
```

### Feedback Patterns

```tsx
// Loading
<Button disabled={isLoading}>
  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…</> : "Save"}
</Button>

// Success
<Alert>
  <CheckCircle className="h-4 w-4" />
  <AlertDescription>Changes saved.</AlertDescription>
</Alert>

// Error (icon + text, never color-only)
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>{error.message}</AlertDescription>
</Alert>
```

### Empty States

Never ship a blank screen.

```tsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />
  <h3 className="font-display text-lg">No messages yet</h3>
  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
    When you receive messages, they'll appear here.
  </p>
  <Button className="mt-6">Send your first message</Button>
</div>
```

### Micro-interactions

```tsx
"transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"  // hover lift
"active:scale-[0.98] transition-transform"                                // press
"animate-in fade-in slide-in-from-bottom-4 duration-500"                  // reveal
"animate-pulse"                                                            // skeleton
```

---

## Common Patterns

### Hero Section

```tsx
<section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
  <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="font-display text-5xl tracking-tight md:text-7xl text-balance">
        Specific, compelling headline
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
        Supporting copy that elaborates with specifics, not platitudes.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button variant="hero" size="lg">Start free</Button>
        <Button variant="ghost" size="lg">See how it works</Button>
      </div>
    </div>
  </div>
</section>
```

### Feature Grid

```tsx
<section className="mx-auto max-w-7xl px-4 py-24">
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="font-display text-3xl tracking-tight md:text-4xl">Features</h2>
    <p className="mt-3 text-muted-foreground">Everything you need to succeed.</p>
  </div>
  <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {features.map((f) => <FeatureCard key={f.id} {...f} />)}
  </div>
</section>
```

### Bento Grid

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
  <div className="rounded-xl border bg-card p-8 md:col-span-2">Main feature</div>
  <div className="rounded-xl border bg-card p-8">Feature 2</div>
  <div className="rounded-xl border bg-card p-8">Feature 3</div>
  <div className="rounded-xl border bg-card p-8 md:col-span-2">Wide feature</div>
</div>
```

### Form Layout

```tsx
<form className="space-y-6">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <Label htmlFor="first">First name</Label>
      <Input id="first" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="last">Last name</Label>
      <Input id="last" />
    </div>
  </div>
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
    <p className="text-xs text-muted-foreground">We'll never share your email.</p>
  </div>
  <Button type="submit" className="w-full">Submit</Button>
</form>
```

### Navigation (TanStack Router)

```tsx
import { Link } from "@tanstack/react-router";

<header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
  <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
    <Link to="/" className="flex items-center gap-2 font-display text-lg">
      <Logo /> Acme
    </Link>
    <div className="hidden items-center gap-8 md:flex">
      <Link to="/features" activeProps={{ className: "text-foreground" }} className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
      <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
    </div>
    <div className="flex items-center gap-3">
      <Button asChild variant="ghost"><Link to="/login">Sign in</Link></Button>
      <Button asChild variant="hero"><Link to="/signup">Get started</Link></Button>
    </div>
  </nav>
</header>
```

---

## Anti-Patterns to Avoid

### Color Mistakes

```tsx
// ❌ Too many colors
className="bg-purple-500 text-pink-400 border-blue-300 shadow-green-200"

// ❌ Hex / direct color in components
className="bg-white text-black"
className="bg-[#FF6B35]"

// ❌ Purple/violet as primary (unless explicitly requested)
className="bg-violet-600"

// ❌ Clashing temperature gradient
className="bg-gradient-to-r from-pink-500 to-green-500"

// ✅ Semantic tokens
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
```

### Typography Mistakes

```tsx
// ❌ Inter as the only font, no display pair
// ❌ 4 fonts on one page
// ❌ text-xs for body
// ❌ Default browser line-height on body text

// ✅
className="font-sans text-base leading-relaxed"
```

### Layout Mistakes

```tsx
// ❌ Desktop-first
className="w-1/3 sm:w-1/2 xs:w-full"

// ❌ space-* utilities (less flexible)
className="space-y-4"

// ❌ Floats
className="float-left"

// ❌ Mixing gap and margin
className="flex gap-4 mb-4"

// ✅
className="flex flex-col gap-4 md:flex-row"
```

### Component Mistakes

- Monolithic page files (500+ lines)
- Hardcoded values that should be props
- Inline styles
- Non-semantic HTML (div for everything)
- Missing `key` on list items
- Fetching in `useEffect` for server data
- Hash-anchor "navigation" instead of separate routes for content sections
- Editing `routeTree.gen.ts` (auto-generated)
- Creating `src/pages/` or `app/layout.tsx` (wrong framework conventions)

### Accessibility Mistakes

- `<div onClick={…}>` as a button
- Missing alt text
- Color-only state indication
- No visible focus ring
- Role/admin flags stored in `localStorage`

### Visual Slop Tells

- Two generic CTAs in the hero ("Get started" + "Learn more")
- "Trusted by [grey logos]" strip when there are no actual customers
- Default shadcn Button styling across a "premium" product
- Stock photos of diverse people in an office
- Emojis as iconography in a serious product
- Placeholder Lorem ipsum left in shipped pages
- Hand-drawn SVG world maps (use a mapping library)
- Abstract decorative blobs floating with no purpose
- Generic 3-column feature grid when the content isn't 3-shaped

---

## Quick Reference Checklist

Before shipping, verify:

- [ ] **Tone committed** — one named direction, executed consistently
- [ ] **Colors:** 3–5 max, defined as oklch semantic tokens, no hex in components
- [ ] **Typography:** 2 fonts max, display font is NOT Inter/Poppins, proper hierarchy
- [ ] **Spacing:** consistent Tailwind scale, generous on marketing (py-24+)
- [ ] **Composition:** has at least one signature layout move, not pure grid-of-cards
- [ ] **Mobile:** verified at 375px
- [ ] **Motion:** one hero animation, respects `prefers-reduced-motion`
- [ ] **Accessibility:** keyboard nav, focus-visible rings, alt text, semantic HTML
- [ ] **Performance:** images sized, lazy-loaded below the fold; hero image preloaded
- [ ] **Components:** split logically, no 400+ line files
- [ ] **Routes:** each content section is its own route, with unique title + meta
- [ ] **Loading:** skeleton states for async content
- [ ] **Empty states:** helpful messaging when no data
- [ ] **Errors:** icon + text, never color-only
- [ ] **Interactions:** hover, focus-visible, active, disabled states defined
- [ ] **Dark mode:** every `:root` token has a `.dark` counterpart (if in scope)
- [ ] **No slop:** ran through Anti-Patterns list, removed every hit or justified it

---

## Summary

The Lovable approach in one line:

> **Commit to a tone, encode it in tokens, and let composition carry the design.**

Every visual decision should pass four tests:

1. Does it strengthen the chosen tone?
2. Does it live in a token or variant (not inline)?
3. Does it serve the user's goal?
4. Would removing it make the design worse?

If you can't answer "yes" to all four, cut it.
