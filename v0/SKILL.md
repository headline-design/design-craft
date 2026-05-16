---
name: v0
description: Use this skill whenever building, editing, or reviewing user-facing software with v0 — web apps, dashboards, marketing sites, component libraries, or any code change that produces visual output. Triggers on requests to "build a UI", "design a page", "make a component", "improve the look", "polish this", "make it production-ready", or whenever scaffolding a new app/screen/feature with visible surface area. Encodes v0's opinionated defaults for Tailwind CSS patterns, shadcn/ui components, design tokens, typography, spacing, color, motion, accessibility, and the component patterns that hold up under real users.
version: 1.0.0
triggers:
  - build a UI
  - design a page
  - make a component
  - improve the look
  - polish this
  - make it production-ready
  - create a landing page
  - build a dashboard
  - add a form
stack:
  - Next.js
  - React
  - Tailwind CSS
  - shadcn/ui
  - TypeScript
---

# v0 Design & Development Skill

A comprehensive guide to creating professional-grade, visually stunning web applications with exceptional UI/UX.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout & Spacing](#layout--spacing)
5. [Component Architecture](#component-architecture)
6. [Tailwind CSS Patterns](#tailwind-css-patterns)
7. [Accessibility](#accessibility)
8. [Performance](#performance)
9. [Code Organization](#code-organization)
10. [UI/UX Principles](#uiux-principles)
11. [Common Patterns](#common-patterns)
12. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## Design Philosophy

### Core Principles

1. **Restraint over excess** — Great design is about what you leave out, not what you add
2. **Clarity over cleverness** — Users should understand interfaces instantly
3. **Consistency over novelty** — Predictable patterns reduce cognitive load
4. **Purpose over decoration** — Every element must earn its place
5. **Ship interesting, never ugly** — Balance creativity with polish

### The v0 Aesthetic

- Clean, modern interfaces with generous whitespace
- Subtle shadows and borders that create depth without distraction
- Smooth, purposeful animations that guide attention
- Professional color palettes that feel cohesive
- Typography that establishes clear hierarchy

---

## Color System

### The 3-5 Color Rule

**ALWAYS use exactly 3-5 colors total.** This constraint forces cohesion.

#### Required Structure

```
1 Primary Brand Color     → CTAs, key actions, brand identity
2-3 Neutrals              → Backgrounds, text, borders
1-2 Accent Colors         → Status indicators, highlights, secondary actions
```

#### Color Selection Guidelines

| Use Case | Recommendation |
|----------|----------------|
| Primary actions | Saturated, accessible brand color |
| Backgrounds | Off-whites, soft grays (never pure white for large areas) |
| Text | Near-black (#0a0a0a to #1a1a1a), not pure black |
| Borders/Dividers | Very subtle grays (opacity 10-20%) |
| Success states | Greens in the teal family |
| Error states | Warm reds, never aggressive |
| Warning states | Amber/orange tones |

#### Color Temperature Rules

- **DO** use analogous colors: blue→teal, purple→pink, orange→red
- **DON'T** mix opposing temperatures: pink→green, orange→blue, red→cyan

#### Gradient Rules

- **Avoid gradients unless explicitly requested** — solid colors are cleaner
- If gradients are necessary:
  - Use only as subtle accents, never for primary elements
  - Maximum 2-3 color stops
  - Use analogous colors only
  - Consider gradient direction (usually top-to-bottom or diagonal)

#### Design Token Structure

Always use semantic design tokens in CSS variables:

```css
:root {
  /* Backgrounds */
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;

  /* Cards & Surfaces */
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;

  /* Primary Actions */
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;

  /* Secondary Actions */
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;

  /* Muted Elements */
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;

  /* Accents */
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;

  /* Destructive Actions */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;

  /* Borders & Inputs */
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;

  /* Radius */
  --radius: 0.5rem;
}
```

**Critical Rule:** Never use direct colors like `text-white`, `bg-black`. Everything must be themed via tokens.

---

## Typography

### The 2 Font Maximum Rule

**ALWAYS limit to maximum 2 font families.** More fonts create visual chaos.

#### Font Pairing Strategy

```
Headings: Display or Sans-serif with personality (multiple weights)
Body: Highly readable sans-serif or serif
```

#### Recommended Pairings

| Style | Headings | Body |
|-------|----------|------|
| Modern Tech | Inter, Geist | Inter, Geist |
| Editorial | Playfair Display | Source Sans Pro |
| Startup | Cal Sans, Manrope | Inter |
| Corporate | Outfit | System UI |
| Creative | Space Grotesk | DM Sans |

#### Typography Scale

Use a consistent scale with clear hierarchy:

```css
/* Recommended Tailwind Classes */
text-xs    → 12px  → Fine print, labels
text-sm    → 14px  → Secondary text, captions
text-base  → 16px  → Body text (minimum for readability)
text-lg    → 18px  → Lead paragraphs
text-xl    → 20px  → Section headers
text-2xl   → 24px  → Card titles
text-3xl   → 30px  → Page sections
text-4xl   → 36px  → Hero subheadings
text-5xl   → 48px  → Hero headings
text-6xl+  → 60px+ → Display headings (use sparingly)
```

#### Line Height Rules

- **Body text:** `leading-relaxed` (1.625) or `leading-6` to `leading-7`
- **Headings:** `leading-tight` (1.25) or `leading-snug` (1.375)
- **Never** use default line-height for body text — it's too tight

#### Text Wrapping

- Wrap titles in `text-balance` for optimal line breaks
- Use `text-pretty` for important copy
- Set `max-w-prose` or `max-w-2xl` for readable line lengths

#### Font Implementation in Next.js

```tsx
// layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
    },
  },
}
```

---

## Layout & Spacing

### Mobile-First Design

**ALWAYS design mobile-first, then enhance for larger screens.**

```tsx
// ✅ Mobile-first approach
<div className="px-4 md:px-6 lg:px-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ Desktop-first (avoid)
<div className="px-8 md:px-6 sm:px-4">
```

### Layout Method Priority

Use this hierarchy for layout decisions:

1. **Flexbox** — Most layouts (navbars, cards, simple grids)
2. **CSS Grid** — Complex 2D layouts, bento grids, dashboards
3. **Absolute positioning** — Only when necessary (modals, tooltips)
4. **Never use floats**

### Spacing Scale

Use Tailwind's spacing scale consistently:

```
4px  = p-1   → Tiny gaps (icon padding)
8px  = p-2   → Small gaps (button padding)
12px = p-3   → Compact spacing
16px = p-4   → Standard spacing (most common)
24px = p-6   → Comfortable spacing
32px = p-8   → Section spacing
48px = p-12  → Large section gaps
64px = p-16  → Hero spacing
96px = p-24  → Major section dividers
```

### Spacing Rules

```tsx
// ✅ Use gap for flex/grid spacing
<div className="flex gap-4">
<div className="grid gap-6">

// ✅ Use padding for container spacing
<section className="px-4 py-12 md:px-6 lg:py-24">

// ❌ Avoid space-* utilities
<div className="space-y-4">  // Less flexible

// ❌ Never mix gap and margin on same element
<div className="flex gap-4 mb-4">  // Pick one approach
```

### Container Patterns

```tsx
// Standard content container
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

// Narrow content (articles, forms)
<div className="mx-auto max-w-2xl px-4">

// Full-bleed with contained content
<section className="w-full bg-muted">
  <div className="mx-auto max-w-7xl px-4 py-16">
```

### Responsive Breakpoints

```
sm:  640px   → Large phones, small tablets
md:  768px   → Tablets
lg:  1024px  → Small laptops, tablets landscape
xl:  1280px  → Desktops
2xl: 1536px  → Large desktops
```

---

## Component Architecture

### File Structure

```
components/
├── ui/                    # Base shadcn components (don't modify)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── [feature]/             # Feature-specific components
│   ├── feature-header.tsx
│   ├── feature-card.tsx
│   └── feature-list.tsx
├── layout/                # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   └── sidebar.tsx
└── shared/                # Shared/common components
    ├── logo.tsx
    ├── theme-toggle.tsx
    └── loading-state.tsx
```

### Component Design Principles

1. **Single Responsibility** — Each component does one thing well
2. **Composition over Configuration** — Build complex UIs from simple parts
3. **Props for Customization** — Use props, not hardcoded values
4. **Sensible Defaults** — Work out of the box, customizable when needed

### Component Template

```tsx
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
  variant?: "default" | "highlighted"
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
  variant = "default"
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-6 transition-colors",
        variant === "default" && "bg-card hover:bg-accent",
        variant === "highlighted" && "bg-primary text-primary-foreground",
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
```

### Page Structure

```tsx
// app/feature/page.tsx
import { FeatureHero } from "@/components/feature/feature-hero"
import { FeatureGrid } from "@/components/feature/feature-grid"
import { FeatureCTA } from "@/components/feature/feature-cta"

export default function FeaturePage() {
  return (
    <main>
      <FeatureHero />
      <FeatureGrid />
      <FeatureCTA />
    </main>
  )
}
```

**Never create monolithic page files.** Split into logical components.

---

## Tailwind CSS Patterns

### Class Organization

Order classes consistently:

```tsx
className={cn(
  // 1. Layout (display, position, sizing)
  "flex items-center justify-between",
  "relative w-full max-w-md",

  // 2. Spacing (margin, padding, gap)
  "p-4 gap-2",

  // 3. Typography
  "text-sm font-medium",

  // 4. Colors & Backgrounds
  "bg-background text-foreground",

  // 5. Borders & Shadows
  "rounded-lg border shadow-sm",

  // 6. Transitions & Animations
  "transition-colors duration-200",

  // 7. States (hover, focus, active)
  "hover:bg-accent focus:ring-2",

  // 8. Responsive overrides
  "md:p-6 lg:flex-row"
)}
```

### Common Utility Patterns

```tsx
// Centering
"flex items-center justify-center"
"grid place-items-center"

// Card pattern
"rounded-lg border bg-card p-6 shadow-sm"

// Interactive element
"cursor-pointer transition-colors hover:bg-accent"

// Focus ring (accessibility)
"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

// Truncation
"truncate"                    // Single line
"line-clamp-2"               // Multi-line (2 lines)

// Aspect ratios
"aspect-video"               // 16:9
"aspect-square"              // 1:1

// Backdrop blur (modals, overlays)
"bg-background/80 backdrop-blur-sm"

// Dividers
"divide-y divide-border"

// Screen reader only
"sr-only"
```

### Responsive Design Patterns

```tsx
// Stack to row
<div className="flex flex-col gap-4 md:flex-row">

// Grid columns
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

// Hide/show
<div className="hidden md:block">    // Show on md+
<div className="md:hidden">          // Hide on md+

// Responsive text
<h1 className="text-3xl md:text-4xl lg:text-5xl">

// Responsive spacing
<section className="py-12 md:py-16 lg:py-24">
```

### Animation Patterns

```tsx
// Subtle hover lift
"transition-transform hover:-translate-y-1"

// Fade in on hover
"opacity-0 group-hover:opacity-100 transition-opacity"

// Scale on hover
"transition-transform hover:scale-105"

// Color transition
"transition-colors hover:bg-accent"

// Combined
"transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
```

---

## Accessibility

### Required Practices

#### Semantic HTML

```tsx
// ✅ Correct
<main>
  <header>
    <nav aria-label="Main navigation">
  </header>
  <article>
    <h1>Page Title</h1>
    <section aria-labelledby="section-heading">
      <h2 id="section-heading">Section</h2>
    </section>
  </article>
  <footer>
</main>

// ❌ Avoid
<div className="header">
<div className="nav">
<div className="main">
```

#### Focus Management

```tsx
// Visible focus states
"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

// Focus within (for form groups)
"focus-within:ring-2 focus-within:ring-ring"

// Skip link
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
  Skip to content
</a>
```

#### Screen Reader Support

```tsx
// Hidden but accessible text
<span className="sr-only">Open menu</span>

// Aria labels
<button aria-label="Close dialog">
  <XIcon className="h-4 w-4" />
</button>

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

#### Image Accessibility

```tsx
// Informative images
<img src="/chart.png" alt="Sales increased 25% in Q4 2024" />

// Decorative images
<img src="/decoration.png" alt="" role="presentation" />

// Complex images
<figure>
  <img src="/diagram.png" alt="System architecture diagram" />
  <figcaption>
    Detailed description of the architecture...
  </figcaption>
</figure>
```

#### Color Contrast

- **Text:** Minimum 4.5:1 contrast ratio (WCAG AA)
- **Large text:** Minimum 3:1 contrast ratio
- **Interactive elements:** Clear visual distinction
- **Never rely on color alone** to convey information

#### Keyboard Navigation

```tsx
// Interactive elements must be keyboard accessible
<button>Clickable</button>       // ✅ Naturally focusable
<div onClick={...}>Clickable</div>  // ❌ Not keyboard accessible

// If you must use a div:
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Clickable
</div>
```

---

## Performance

### Image Optimization

```tsx
import Image from 'next/image'

// Always use Next.js Image component
<Image
  src="/hero.jpg"
  alt="Hero image description"
  width={1200}
  height={600}
  priority              // Above-the-fold images
  className="object-cover"
/>

// Responsive images
<Image
  src="/photo.jpg"
  alt="Description"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

### Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false  // If client-only
})
```

### Loading States

```tsx
// Skeleton loading (preferred)
<div className="animate-pulse">
  <div className="h-4 w-3/4 rounded bg-muted" />
  <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
</div>

// Spinner for actions
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

### Data Fetching

```tsx
// ✅ Server Components for static data
async function ProductList() {
  const products = await getProducts()
  return <ProductGrid products={products} />
}

// ✅ SWR for client-side data
import useSWR from 'swr'

function UserProfile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (isLoading) return <ProfileSkeleton />
  if (error) return <ErrorState />
  return <Profile user={data} />
}

// ❌ Never fetch in useEffect
useEffect(() => {
  fetch('/api/data').then(...)  // Anti-pattern
}, [])
```

---

## Code Organization

### Project Structure

```
app/
├── (marketing)/          # Route groups for layouts
│   ├── page.tsx
│   ├── about/
│   └── pricing/
├── (dashboard)/
│   ├── layout.tsx
│   └── dashboard/
├── api/
│   └── [feature]/
│       └── route.ts
├── layout.tsx
└── globals.css

components/
├── ui/                   # shadcn components
├── [feature]/            # Feature components
├── layout/               # Layout components
└── shared/               # Shared components

lib/
├── utils.ts              # Utility functions
├── validations.ts        # Zod schemas
└── constants.ts          # App constants

hooks/
├── use-[feature].ts
└── use-media-query.ts

types/
└── index.ts
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `FeatureCard.tsx` |
| Files | kebab-case | `feature-card.tsx` |
| Hooks | camelCase with use prefix | `useFeature.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Types | PascalCase | `FeatureProps` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FILE_SIZE` |
| CSS variables | kebab-case | `--primary-color` |

### Import Organization

```tsx
// 1. React/Next.js
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// 2. Third-party libraries
import { motion } from 'framer-motion'
import { z } from 'zod'

// 3. Internal components
import { Button } from '@/components/ui/button'
import { FeatureCard } from '@/components/feature/feature-card'

// 4. Internal utilities/hooks
import { cn } from '@/lib/utils'
import { useFeature } from '@/hooks/use-feature'

// 5. Types
import type { Feature } from '@/types'
```

---

## UI/UX Principles

### Visual Hierarchy

1. **Size** — Larger elements draw attention first
2. **Color** — Saturated colors stand out against neutrals
3. **Contrast** — High contrast creates focal points
4. **Spacing** — Whitespace isolates important elements
5. **Position** — Top-left to bottom-right reading pattern

### Interactive States

Every interactive element needs these states:

```tsx
// Button example
<button className={cn(
  // Default
  "bg-primary text-primary-foreground",
  // Hover
  "hover:bg-primary/90",
  // Focus
  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  // Active/Pressed
  "active:scale-[0.98]",
  // Disabled
  "disabled:pointer-events-none disabled:opacity-50"
)}>
```

### Feedback Patterns

```tsx
// Loading feedback
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Saving...
    </>
  ) : (
    'Save Changes'
  )}
</Button>

// Success feedback
<div className="flex items-center gap-2 text-green-600">
  <CheckCircle className="h-4 w-4" />
  <span>Changes saved successfully</span>
</div>

// Error feedback
<div className="rounded-md bg-destructive/10 p-4 text-destructive">
  <p className="text-sm font-medium">Error occurred</p>
  <p className="mt-1 text-sm opacity-90">{error.message}</p>
</div>
```

### Empty States

Never show blank screens. Always provide helpful empty states:

```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <InboxIcon className="h-12 w-12 text-muted-foreground/50" />
  <h3 className="mt-4 text-lg font-semibold">No messages yet</h3>
  <p className="mt-2 text-sm text-muted-foreground">
    When you receive messages, they&apos;ll appear here.
  </p>
  <Button className="mt-4">
    Send your first message
  </Button>
</div>
```

### Micro-interactions

Subtle animations that enhance UX:

```tsx
// Hover lift effect
"transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"

// Button press effect
"active:scale-[0.98] transition-transform"

// Smooth reveals
"animate-in fade-in slide-in-from-bottom-4 duration-300"

// Skeleton pulse
"animate-pulse"
```

---

## Common Patterns

### Hero Section

```tsx
<section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        Your compelling headline here
      </h1>
      <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
        Supporting text that elaborates on the headline and provides context.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button size="lg">Primary Action</Button>
        <Button size="lg" variant="outline">Secondary Action</Button>
      </div>
    </div>
  </div>
</section>
```

### Feature Grid

```tsx
<section className="py-16 md:py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold md:text-4xl">Features</h2>
      <p className="mt-4 text-muted-foreground">
        Everything you need to succeed.
      </p>
    </div>
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </div>
  </div>
</section>
```

### Card Grid

```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id} className="group overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="ghost" className="ml-auto">
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>
```

### Bento Grid

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Large feature - spans 2 columns */}
  <div className="md:col-span-2 lg:row-span-2 rounded-xl border bg-card p-6">
    <h3 className="text-2xl font-bold">Main Feature</h3>
  </div>

  {/* Regular items */}
  <div className="rounded-xl border bg-card p-6">
    <h3 className="font-semibold">Feature 2</h3>
  </div>

  <div className="rounded-xl border bg-card p-6">
    <h3 className="font-semibold">Feature 3</h3>
  </div>

  {/* Wide item - spans 2 columns */}
  <div className="md:col-span-2 rounded-xl border bg-card p-6">
    <h3 className="font-semibold">Wide Feature</h3>
  </div>
</div>
```

### Form Layout

```tsx
<form className="space-y-6">
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <Label htmlFor="firstName">First name</Label>
      <Input id="firstName" placeholder="John" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="lastName">Last name</Label>
      <Input id="lastName" placeholder="Doe" />
    </div>
  </div>

  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="john@example.com" />
    <p className="text-sm text-muted-foreground">
      We&apos;ll never share your email.
    </p>
  </div>

  <Button type="submit" className="w-full sm:w-auto">
    Submit
  </Button>
</form>
```

### Navigation

```tsx
<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <Link href="/" className="flex items-center gap-2">
      <Logo className="h-8 w-8" />
      <span className="font-bold">Brand</span>
    </Link>

    <nav className="hidden items-center gap-6 md:flex">
      <Link href="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        Features
      </Link>
      <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        Pricing
      </Link>
    </nav>

    <div className="flex items-center gap-4">
      <Button variant="ghost" size="sm" className="hidden sm:flex">
        Sign in
      </Button>
      <Button size="sm">Get Started</Button>
    </div>
  </div>
</header>
```

---

## Anti-Patterns to Avoid

### Color Mistakes

```tsx
// ❌ Too many colors
className="bg-purple-500 text-pink-400 border-blue-300 shadow-green-200"

// ❌ Direct colors instead of tokens
className="bg-white text-black"

// ❌ Purple/violet as primary (unless explicitly requested)
className="bg-violet-600"

// ❌ Clashing temperature gradients
className="bg-gradient-to-r from-pink-500 to-green-500"

// ✅ Semantic tokens
className="bg-background text-foreground"
```

### Typography Mistakes

```tsx
// ❌ Too many fonts
<h1 className="font-display">
<p className="font-body">
<span className="font-accent">
<code className="font-mono">   // 4 fonts!

// ❌ Tiny text
className="text-xs"  // Avoid for body text

// ❌ No line-height consideration
className="text-base"  // Missing leading-*

// ✅ Proper typography
className="text-base leading-relaxed"
```

### Layout Mistakes

```tsx
// ❌ Desktop-first responsive
className="w-1/3 sm:w-1/2 xs:w-full"

// ❌ Using space-* utilities
className="space-y-4"

// ❌ Floats
className="float-left"

// ❌ Mixing gap and margin
className="flex gap-4 mb-4"

// ✅ Mobile-first with gap
className="flex flex-col gap-4 md:flex-row"
```

### Component Mistakes

```tsx
// ❌ Monolithic page files (500+ lines)
// ❌ Hardcoded values instead of props
// ❌ Inline styles
// ❌ Non-semantic HTML (div for everything)
// ❌ Missing key props in lists
// ❌ Fetching in useEffect

// ✅ Split into components
// ✅ Use props for customization
// ✅ Tailwind classes
// ✅ Semantic HTML
// ✅ Proper key props
// ✅ Server Components or SWR
```

### Accessibility Mistakes

```tsx
// ❌ Click handler on div
<div onClick={handleClick}>Click me</div>

// ❌ Missing alt text
<img src="/photo.jpg" />

// ❌ Color-only indication
<span className="text-red-500">Error</span>

// ❌ Missing focus states
<button className="hover:bg-accent">

// ✅ Use button element
<button onClick={handleClick}>Click me</button>

// ✅ Descriptive alt text
<img src="/photo.jpg" alt="Team meeting in conference room" />

// ✅ Icon + color for errors
<span className="flex items-center gap-2 text-destructive">
  <AlertCircle className="h-4 w-4" />
  Error message
</span>

// ✅ Focus states
<button className="hover:bg-accent focus:ring-2 focus:ring-ring">
```

### Visual Mistakes

```tsx
// ❌ Abstract decorative shapes
<div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl" />

// ❌ Placeholder images left in production
<img src="/placeholder.jpg" />

// ❌ Emojis as icons
<span>📧 Email</span>

// ❌ Hand-drawn SVG maps
<svg><path d="M100,200 L300,400..." /></svg>

// ✅ Real images or GenerateImage tool
// ✅ Proper icon libraries (Lucide, etc.)
// ✅ Mapping libraries for geographic data
```

---

## Quick Reference Checklist

Before shipping, verify:

- [ ] **Colors:** 3-5 max, using semantic tokens
- [ ] **Typography:** 2 fonts max, proper hierarchy
- [ ] **Spacing:** Consistent, using Tailwind scale
- [ ] **Mobile:** Looks good on 375px width
- [ ] **Accessibility:** Keyboard nav, focus states, alt text
- [ ] **Performance:** Images optimized, code split
- [ ] **Components:** Split logically, not monolithic
- [ ] **Loading:** Skeleton states for async content
- [ ] **Empty states:** Helpful messaging when no data
- [ ] **Errors:** Clear error messaging and recovery
- [ ] **Interactions:** Hover, focus, active states defined

---

## Summary

The v0 approach can be summarized as:

> **Restrained elegance with purposeful interactions.**

Every design decision should pass these tests:
1. Does it improve clarity?
2. Does it maintain consistency?
3. Does it serve the user's goal?
4. Would removing it make the design worse?

If you can't answer "yes" to all four, reconsider the choice.
