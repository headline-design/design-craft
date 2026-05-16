---
name: gemini
description: Use this skill whenever building, editing, or reviewing user-facing software with Gemini — web apps, dashboards, marketing sites, component libraries, or any code change that produces visual output. Triggers on requests to "build a UI", "design a page", "make a component", "improve the look", "polish this", "make it production-ready", or whenever scaffolding a new app/screen/feature with visible surface area. Encodes Gemini's opinionated defaults for intelligent, hyper-responsive UI/UX — typography, spacing, color, motion, accessibility, component states, and the code patterns that hold up under real users.
version: 1.0.0
triggers:
  - build a UI
  - design a page
  - make a component
  - improve the look
  - polish this
  - make it production-ready
  - AI interface
  - generative UI
stack:
  - React
  - Tailwind CSS
  - shadcn/ui
  - TypeScript
  - Framer Motion
---

# Gemini Design & Development Skill

A comprehensive, rigorous guide to generating world-class, intelligent web applications with the polished, hyper-responsive UI/UX inclinations of the Gemini ecosystem.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4.[Layout & Spacing](#layout--spacing)
5. [Component Architecture](#component-architecture)
6.[Tailwind CSS Patterns](#tailwind-css-patterns)
7. [Accessibility](#accessibility)
8. [Performance](#performance)
9. [Code Organization](#code-organization)
10. [UI/UX Principles](#uiux-principles)
11. [Common Patterns](#common-patterns)
12.[Anti-Patterns to Avoid](#anti-patterns-to-avoid)
13. [Quick Reference Checklist](#quick-reference-checklist)
14. [Summary](#summary)

---

## 1. Design Philosophy

### Core Principles

1. **Intelligence through Clarity** — The interface must anticipate user needs without overwhelming them. Progressively disclose complexity (Hick's Law).
2. **Silent Competence** — UI gets out of the way. Zero visual clutter; every pixel must justify its existence algorithmically or psychologically.
3. **Physics-Based Fluidity** — Motion must emulate real-world physics (springs, mass, damping), avoiding mechanical or linear animations.
4. **Graceful Adaptability** — The application must look, feel, and perform flawlessly regardless of viewport, device power, or user capability.
5. **Deterministic Execution** — Systems over individual designs. We build using strict mathematical scales, not arbitrary visual tweaks.

### The Gemini Aesthetic

- Deep, immersive dark modes and expansive, breathable light modes.
- Subtle, high-performance glassmorphism and layered elevations.
- Precise, algorithmic typography that scales fluidly.
- Iridescent, purposeful accents against muted, sophisticated neutral backgrounds.

---

## 2. Color System

### The Algorithmic Color Rule

**ALWAYS use exactly 3-5 base color families.** Rely on semantic tokens derived from mathematical color spaces (LCH/OKLCH) to ensure uniform contrast.

#### Required Structure

```text
1 Primary Brand Color     → Core actions, AI states, active links (e.g., Gemini Sparkle)
2-3 Neutrals              → Canvas backgrounds, text hierarchies, subtle borders
1-2 Accent/Status Colors  → Success, error, warning, or ephemeral UI states
```

#### Color Temperature Rules
- **DO** utilize cool neutrals (slate, zinc) to frame high-tech interfaces.
- **DO** use analogous gradient accents (e.g., cyan → indigo → violet) strictly for AI/generative moments.
- **DON'T** mix jarring, opposing temperatures (e.g., neon green and bright red) in the same visual plane.

#### Design Token Structure (CSS Variables)

Always theme via semantic tokens. Hardcoding `#hex` values in components is an anti-pattern.

```css
:root {
  /* Canvas & Surfaces */
  --bg-canvas: 0 0% 98%;
  --bg-surface: 0 0% 100%;
  --bg-surface-raised: 210 40% 98%;

  /* Typography */
  --text-primary: 222.2 84% 4.9%;
  --text-secondary: 215.4 16.3% 46.9%;
  --text-tertiary: 215 20.2% 65.1%;

  /* Action / Gemini Core */
  --action-primary: 221.2 83.2% 53.3%;
  --action-hover: 221.2 83.2% 48%;
  --action-muted: 210 40% 96.1%;

  /* AI Accents */
  --ai-spark: 280 80% 60%;
  --ai-glow: 250 80% 70%;

  /* Borders & UI Rings */
  --border-subtle: 214.3 31.8% 91.4%;
  --ring-focus: 221.2 83.2% 53.3%;

  --radius-md: 0.75rem;
}
```

---

## 3. Typography

### The 2 Font Maximum Rule

**ALWAYS limit to maximum 2 font families.**

#### Font Pairing Strategy
- **Interface/Body:** High-legibility sans-serif (e.g., Inter, SF Pro, Roboto, Geist).
- **Data/Code:** Ligature-enabled, readable monospaced font (e.g., JetBrains Mono, Fira Code).

#### Typographic Constraints
- **Tabular Nums:** Use `tabular-nums` for all dynamic data, timers, and code readouts to prevent horizontal layout shift.
- **Line Heights:** Headings must be tight (`leading-tight` 1.2), body text must breathe (`leading-relaxed` 1.6).

#### Fluid Scale & Hierarchy

```css
/* Tailwind Class → Semantic Purpose */
text-xs    → Badges, highly muted metadata, fine print
text-sm    → Secondary text, system messages, tooltips
text-base  → Primary AI responses, main body copy
text-lg    → Emphasized body, intro paragraphs
text-xl    → Subsection headers, card titles
text-2xl   → Primary Section titles
text-4xl+  → Hero displays (use `text-balance` strictly)
```

---

## 4. Layout & Spacing

### The Spatial Matrix

Layouts must adhere strictly to the 4pt/8pt grid system.

#### Layout Method Priority
1. **Flexbox** — Default tool for 1D layouts (toolbars, chat bubbles, navigation).
2. **CSS Grid** — Default tool for 2D macro-layouts (dashboards, bento grids, main structural scaffolding).
3. **Absolute Positioning** — Reserved strictly for overlays, tooltips, and background effects.

#### Spacing Rules

```tsx
// ✅ Use deterministic gap scaling
<div className="flex flex-col gap-4 md:gap-6">

// ✅ Semantic section padding
<section className="px-4 py-12 md:px-8 lg:py-24">

// ❌ Never use arbitrary or fractured values
<div className="mt-[13px] p-[17px]">
```

### Responsive Architecture (Mobile-First)

Design mobile structures that organically unfold into desktop interfaces, rather than degrading desktop interfaces into mobile ones.

```tsx
// ✅ Fluid grid that scales up elegantly
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

---

## 5. Component Architecture

### The Headless Paradigm
Separate logic from presentation. UI logic (focus, ARIA, state) should be handled by Headless primitives (Radix, React Aria), while styling is handled by utility CSS.

### Component Design Principles
1. **Polymorphism:** Use the `asChild` pattern to maintain semantic HTML without duplicating styles.
2. **Prop-Driven State:** Components must accept variants, sizes, and states via props.
3. **Immutability:** Base UI components (`components/ui`) must never contain app-specific business logic.

### Component Template

```tsx
import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        ai: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:opacity-90",
      },
      size: {
        default: "h-9 px-4 py-2",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = "Button"
```

---

## 6. Tailwind CSS Patterns

### Class Execution Order
Ensure highly readable utility combinations using `cn()` and `tailwind-merge`.

```tsx
className={cn(
  // 1. Structure & Layout
  "group relative flex w-full items-start justify-between",
  // 2. Spacing
  "p-4 gap-3 md:p-6",
  // 3. Typography
  "text-sm font-medium tracking-tight",
  // 4. Color & Surface
  "bg-surface text-text-primary border border-border-subtle rounded-xl",
  // 5. Motion & Transitions (Spring-like)
  "transition-all duration-300 ease-out",
  // 6. Interactive States
  "hover:bg-surface-raised hover:-translate-y-0.5 hover:shadow-md",
  // 7. Focus & Accessibility
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
)}
```

### Modern Glassmorphism (Gemini-style)
```tsx
"bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 border border-white/10 dark:border-white/5 shadow-2xl"
```

---

## 7. Accessibility

### Radical A11y Standard
An interface fails if it is not universally accessible.

#### Semantic Precision
```tsx
// ✅ Correct Document Outline
<main>
  <header aria-label="Chat Controls">
  <section aria-live="polite" aria-atomic="true">
    {/* Dynamic AI Output Here */}
  </section>
</main>
```

#### Focus & Keyboard Management
Never disable focus rings. Instead, style them beautifully using `focus-visible`.

```tsx
// ✅ Elegant focus states
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

#### Screen Reader UX
```tsx
// Visually hidden context for Screen Readers
<button>
  <SparklesIcon className="w-5 h-5" aria-hidden="true" />
  <span className="sr-only">Generate AI Response</span>
</button>
```

---

## 8. Performance

### Core Web Vitals Optimization
Performance is User Experience.

- **LCP (Largest Contentful Paint):** Preload hero assets. Use `next/image` with `priority` for above-the-fold content.
- **CLS (Cumulative Layout Shift):** AI streams and dynamic content *must* have reserved structural space (min-heights) or skeleton states before data arrives.
- **INP (Interaction to Next Paint):** Wrap heavy client-side state updates in `React.startTransition`.

### Streaming Architecture
```tsx
// ✅ Next.js App Router Streaming
import { Suspense } from "react"

export default function GenerativeDashboard() {
  return (
    <main>
      <Suspense fallback={<DashboardSkeleton />}>
        <AsyncAIAnalytics />
      </Suspense>
    </main>
  )
}
```

---

## 9. Code Organization

### Enterprise File Structure
```text
app/
├── (chat)/               # Route Groups
│   ├── page.tsx
│   └── layout.tsx
├── api/
│   └── generate/route.ts
components/
├── ui/                   # Pure, stateless primitives (shadcn)
├── blocks/               # Composed macro-components (bento grids, forms)
├── shared/               # Cross-feature components (Logo, ThemeToggle)
lib/
├── utils.ts              # cn, formatters
├── schemas.ts            # Zod validation
└── hooks/                # Custom React hooks
```

---

## 10. UI/UX Principles

### Progressive Disclosure
Do not dump features on the user. Core actions should be visible; secondary actions hidden behind menus or contextual hovers.

### Physics-Based Motion
Replace linear animations with spring physics where applicable (using Framer Motion).

```tsx
import { motion } from "framer-motion"

// ✅ Spring physics feel premium and responsive
<motion.div
  initial={{ opacity: 0, y: 10, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
>
  {aiResponse}
</motion.div>
```

### Loading & Streaming States
Endless spinners cause cognitive friction. Use shimmering skeletons or optimistic UI text ("Thinking...", "Generating...").

---

## 11. Common Patterns

### The AI Prompt Input (Gemini Pattern)
```tsx
<div className="relative flex w-full max-w-3xl items-end gap-2 rounded-2xl border border-border/50 bg-surface/50 p-2 pl-4 shadow-sm backdrop-blur-md transition-shadow focus-within:ring-2 focus-within:ring-primary/50">
  <textarea
    className="max-h-48 min-h-[40px] w-full resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-text-tertiary"
    placeholder="Ask Gemini anything..."
    rows={1}
  />
  <div className="flex shrink-0 items-center gap-1 pb-1">
    <Button variant="ghost" size="icon" className="text-text-tertiary">
      <PaperclipIcon className="h-5 w-5" />
      <span className="sr-only">Attach file</span>
    </Button>
    <Button size="icon" className="rounded-xl">
      <ArrowUpIcon className="h-5 w-5" />
      <span className="sr-only">Submit</span>
    </Button>
  </div>
</div>
```

### The Bento Grid Layout
```tsx
<div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
  <div className="md:col-span-2 md:row-span-2 rounded-3xl border bg-surface p-8 shadow-sm">
    {/* Primary Focus Area */}
  </div>
  <div className="rounded-3xl border bg-surface p-6 shadow-sm">
    {/* Secondary Context */}
  </div>
  <div className="rounded-3xl border bg-primary text-primary-foreground p-6 shadow-sm">
    {/* Highlighted Call to Action */}
  </div>
</div>
```

---

## 12. Anti-Patterns to Avoid

- ❌ **Div Soup:** Wrapping everything in meaningless `div` tags instead of `section`, `article`, `header`, or `nav`.
- ❌ **Client-Side Data Waterfalls:** Fetching data in `useEffect` chains instead of utilizing Server Components, SWR, or React Query.
- ❌ **Aggressive Colors:** Using highly saturated colors for backgrounds. Color is for action; neutrals are for canvas.
- ❌ **Hardcoded UI Strings:** Failing to handle empty states or loading states for dynamic data arrays.
- ❌ **Layout Shifts (CLS):** Rendering an image or AI text block without pre-defining the bounding box, causing the page to jump.

---

## 13. Quick Reference Checklist

Before outputting code, verify:
- [ ] **Architecture:** Server Components used by default; `"use client"` minimized to leaf nodes.
- [ ] **Styling:** Tailwind classes ordered logically. Zero inline styles.
- [ ] **Colors:** 3-5 semantic token rule followed. Dark mode accounted for natively.
- [ ] **Typography:** Scale is consistent, headings are tight, body text is readable.
-[ ] **Responsive:** Mobile layout built first, scaled up using `md:` and `lg:`.
- [ ] **A11y:** Focus states visible (`focus-visible`), aria labels present on icon-only buttons.
- [ ] **Motion:** Transitions applied only to transform/opacity/colors, never layout properties (width/height).
- [ ] **UX Polish:** Empty states, skeleton loaders, and error boundaries are implemented.

---

## 14. Summary

The Gemini-Class Development approach is defined by:
> **Profound capability masked by effortless minimalism.**

Code generation must always pass the elite filter:
1. Is the architecture deterministic and scalable?
2. Does the interface anticipate the user without overwhelming them?
3. Is it universally accessible and performant?
4. Is it beautiful through mathematics (spacing, contrast) rather than decoration?

If the answer is yes, ship it.
