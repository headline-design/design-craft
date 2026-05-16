---
name: claude
description: Use this skill whenever building, editing, or reviewing user-facing software — web apps, mobile, dashboards, marketing sites, internal tools, design systems, component libraries — or any code change that produces visual output. Triggers on requests to "build a UI", "design a page", "make a component", "improve the look", "polish this", "make it nicer", "make it production-ready", "ship-quality", or whenever you're scaffolding a new app/screen/feature with visible surface area. Encodes opinionated defaults for typography, spacing, color, motion, accessibility, component states, and the code patterns that hold up under real users.
version: 1.0.0
triggers:
  - build a UI
  - design a page
  - make a component
  - improve the look
  - polish this
  - make it nicer
  - make it production-ready
  - ship-quality
  - create interface
stack:
  - React
  - Tailwind CSS
  - shadcn/ui
  - TypeScript
  - Next.js
---

# Claude Design & Development Skill

A field guide for producing software that looks and feels professionally designed — not "AI-generated." The job is restraint plus rigor: most decisions are about what to leave out and what to handle when things go wrong.

Read the whole document before starting a non-trivial UI task. For small edits, scan the **Pre-Ship Checklist** at the end.

---

## Table of Contents

1. [Operating Principles](#1-operating-principles)
2. [Visual Language](#2-visual-language)
   - [Typography](#21-typography)
   - [Color System](#22-color-system)
   - [Spacing](#23-spacing)
   - [Layout](#24-layout)
   - [Borders, Radii & Shadows](#25-borders-radii--shadows)
   - [Iconography](#26-iconography)
   - [Imagery](#27-imagery)
3. [Motion](#3-motion)
4. [Component Patterns](#4-component-patterns)
   - [Buttons](#41-buttons)
   - [Forms](#42-forms)
   - [Tables](#43-tables)
   - [Modals & Dialogs](#44-modals--dialogs)
   - [Empty / Error / Loading States](#45-empty--error--loading-states)
   - [Navigation](#46-navigation)
   - [Toasts & Notifications](#47-toasts--notifications)
5. [Accessibility](#5-accessibility)
6. [Performance](#6-performance)
7. [Code Quality](#7-code-quality)
8. [Tailwind CSS Patterns](#8-tailwind-css-patterns)
9. [Common Patterns](#9-common-patterns)
10. [Anti-Patterns](#10-anti-patterns)
11. [Pre-Ship Checklist](#11-pre-ship-checklist)
12. [Quick Reference](#12-quick-reference)

---

## 1. Operating Principles

These are load-bearing. Internalize them — they resolve most micro-decisions.

1. **Restraint over abundance.** Fewer colors, fewer fonts, fewer effects, fewer words. Every element earns its place. When in doubt, remove it.
2. **Hierarchy through space and weight, not decoration.** Borders, boxes, dividers, and gradients are last resorts. Whitespace and typographic weight are first resorts.
3. **Content shapes layout.** Don't design empty containers and pour content in. Start from the longest realistic string, the worst-case empty state, the largest realistic dataset.
4. **Every interactive element has five states.** Default, hover, active, focus-visible, disabled. Async ones add loading and error. Forms add validation. Plan all of them; don't ship only "default."
5. **The error/empty/loading states are the product.** Demos show happy paths. Real software lives in the unhappy paths. Design them with the same care as the primary view.
6. **Accessibility is not a layer.** It's structural. Semantic HTML, keyboard reachability, visible focus, sufficient contrast — these are baseline correctness, not polish.
7. **Performance is a feature.** Slow UI feels broken regardless of how it looks. Budget in the first design pass, not the last.
8. **Consistency beats local optimization.** A component that's slightly worse but matches the system is better than a one-off that's slightly better.
9. **Match the medium.** A B2B admin tool should not look like a consumer landing page. A landing page should not look like a Linear clone. Pick a register and hold it.
10. **Write the code you'd want to inherit.** Boring, predictable, well-named. Cleverness compounds into maintenance debt.

---

## 2. Visual Language

### 2.1 Typography

**Maximum 2 font families.** More creates visual chaos. System font stacks are a legitimate, often correct choice.

#### Font Pairing Strategy

```
Headings: Display or sans-serif with personality (multiple weights)
Body:     Highly readable sans-serif or serif
```

#### Recommended Pairings

| Style | Headings | Body |
|-------|----------|------|
| Modern product | Inter, Geist | Inter, Geist |
| Editorial | Playfair Display | Source Serif |
| Startup | Cal Sans, Manrope | Inter |
| Corporate | Outfit | System UI |
| Creative | Space Grotesk | DM Sans |

Default system stack for product UI:
```css
font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

#### Type Scale

Use a modular rem-based scale — never arbitrary pixel values:

```
text-xs   → 12px  → Fine print, labels
text-sm   → 14px  → Secondary text, captions
text-base → 16px  → Body text (minimum for readability)
text-lg   → 18px  → Lead paragraphs
text-xl   → 20px  → Section headers
text-2xl  → 24px  → Card titles
text-3xl  → 30px  → Page sections
text-4xl  → 36px  → Hero subheadings
text-5xl  → 48px  → Hero headings
text-6xl+ → 60px+ → Display (use sparingly)
```

#### Typography Rules

| Property | Rule |
|----------|------|
| Body size | 14–16px product, 16–18px marketing |
| Minimum | Never below 14px |
| Line-height | 1.5 body, 1.2–1.3 headings, 1.0 labels |
| Line-length | 60–75 chars prose — `max-w-prose` or `max-w-2xl` |
| Weights | 2–3 total; avoid weight 300 (looks fragile) |
| Heading tracking | `−0.01em` to `−0.02em` for large headings |
| Label tracking | `+0.05em` for small all-caps |
| Numbers in tables | `font-variant-numeric: tabular-nums` |

```tsx
// ✅ Proper typography
<p className="text-base leading-relaxed max-w-prose">Body copy</p>
<h1 className="text-5xl font-bold tracking-tight text-balance">Heading</h1>
<span className="text-sm tabular-nums">$1,234.56</span>

// ❌ Avoid
<p className="text-xs">Body text  // Too small
<p className="text-base">Body text // Missing leading-*
```

#### Font Implementation (Next.js)

```tsx
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

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

### 2.2 Color System

**Use exactly 3–5 colors total.** This constraint forces cohesion.

#### Required Structure

```
1 Primary brand color    → CTAs, key actions, brand identity
2–3 Neutrals             → Backgrounds, text, borders (a 9–11 step gray scale)
1–2 Accent / semantic    → Success, warning, danger, info — only when needed
```

#### Color Selection Guidelines

| Use Case | Recommendation |
|----------|----------------|
| Primary actions | Saturated, accessible brand color |
| Backgrounds | Off-whites, soft grays — never pure `#fff` for large areas |
| Text | Near-black (`#0a0a0a`–`#1a1a1a`), not pure `#000` |
| Borders / dividers | Very subtle grays (opacity 10–20%) |
| Success | Greens in the teal family |
| Error | Warm reds, never aggressive neon |
| Warning | Amber / orange tones |

- **Use OKLCH or HSL for palette construction**, not hand-picked hex. Equal perceptual steps look intentional.
- **Dark mode is not "invert the colors."** It's a separate palette — surfaces get *lighter* as they get closer to the user (elevation by lightness, not shadow).
- **Color is never the only signal.** Pair red with an icon, green with a checkmark. ~8% of men have red-green color vision deficiency.

#### Design Token Structure

Always use semantic CSS variables. Never hardcode color hex values.

```css
:root {
  /* Backgrounds */
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;

  /* Surfaces */
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

```tsx
// ✅ Semantic tokens
className="bg-background text-foreground border-border"

// ❌ Direct colors
className="bg-white text-black border-gray-200"
className="bg-purple-500 text-pink-400 border-blue-300"
```

#### Gradient Rules

- **Avoid gradients unless explicitly requested** — solid colors read as more intentional.
- If gradients are necessary: analogous colors only, max 2–3 stops, subtle accents never primary elements.

```tsx
// ✅ Analogous gradient (acceptable accent use)
className="bg-gradient-to-r from-blue-500 to-cyan-500"

// ❌ Clashing temperature gradient (AI tell)
className="bg-gradient-to-r from-pink-500 to-green-500"
className="bg-gradient-to-r from-purple-500 to-pink-500"  // On every CTA
```

---

### 2.3 Spacing

**Use a spacing scale — never arbitrary pixel values.**

#### 4px Base Scale

```
4px  = p-1  → Tiny gaps (icon padding)
8px  = p-2  → Small gaps (button padding)
12px = p-3  → Compact spacing
16px = p-4  → Standard spacing (most common)
24px = p-6  → Comfortable spacing
32px = p-8  → Section spacing
48px = p-12 → Large section gaps
64px = p-16 → Hero / marketing section spacing
96px = p-24 → Major section dividers
```

```tsx
// ✅ Consistent scale
<div className="flex gap-4">
<section className="px-4 py-12 md:px-6 lg:py-24">

// ❌ Arbitrary values
<div style={{ gap: '17px', padding: '23px' }}>
```

**Whitespace is structural, not decorative.** Group related elements with tight spacing; separate unrelated groups with generous spacing. The eye should chunk the page without reading it.

---

### 2.4 Layout

- **Mobile-first.** Design the 360px experience first, then scale up.

```tsx
// ✅ Mobile-first
<div className="px-4 md:px-6 lg:px-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ Desktop-first
<div className="px-8 md:px-6 sm:px-4">
```

#### Layout Method Priority

1. **Flexbox** — Navbars, cards, 1D layouts
2. **CSS Grid** — Complex 2D layouts, bento grids, dashboards
3. **Absolute positioning** — Only for modals, tooltips, overlays
4. **Never use floats**

#### Container Widths

```tsx
// Standard app container
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

// Narrow content (articles, forms)
<div className="mx-auto max-w-2xl px-4">

// Full-bleed section with contained content
<section className="w-full bg-muted">
  <div className="mx-auto max-w-7xl px-4 py-16">
```

#### Responsive Breakpoints

| Breakpoint | Width | Use |
|-----------|-------|-----|
| `sm:` | 640px | Large phones, small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large desktops |

- **Alignment beats centering.** Strong left-edge alignment scans better than centered blocks for content longer than a heading.
- **12-column grid** for marketing, **8 or 12** for app shells.

---

### 2.5 Borders, Radii & Shadows

**Pick one radius scale and hold it.** Mixing 8px and 10px on the same screen reads as careless.

#### Radius Scale

```
0 / 4px (rounded-sm) / 6px (rounded-md) / 8px (rounded-lg) / 12px (rounded-xl) / 16px (rounded-2xl) / full (rounded-full)
```

**Nested radii:** inner radius = `outer_radius − padding`. Otherwise corners look "off."

```tsx
// ✅ Correct nested radius
<div className="rounded-xl p-4">        // outer: 12px
  <div className="rounded-lg">...</div> // inner: 8px (12 - 4)
</div>

// ❌ Incorrect — both same radius
<div className="rounded-xl p-4">
  <div className="rounded-xl">...</div>
</div>
```

#### Shadows

- **Don't mix borders and shadows** on the same element — pick one.
- **Subtle, layered** — a single `box-shadow: 0 4px 12px rgba(0,0,0,0.08)` looks dated.
- Match shadow color to the surrounding hue, not pure black.
- Most elements need neither border nor shadow — use them only when they earn their visual cost.

---

### 2.6 Iconography

- **One icon set per project.** Lucide, Phosphor, Heroicons, Radix Icons — pick one. Mixing sets is immediately visible.
- **Consistent stroke weight** — 1.5px at 24px size is a good default.
- **Size icons to text x-height**, not cap height.
- **No emoji as UI affordance.** Emoji render differently on every OS and look juvenile in product UI.

```tsx
// ✅
<button aria-label="Close dialog">
  <XIcon className="h-4 w-4" />
</button>

// ❌
<button>❌ Close</button>
<button title="Settings">⚙️</button>
```

---

### 2.7 Imagery

- **No stock photos** unless unavoidable — edit for consistent treatment (duotone, grain).
- **Use real product screenshots** in marketing. Mockups in laptops/phones look like 2015.
- **Optimize:** AVIF or WebP, responsive `srcset`, lazy-load below the fold, declared `width`/`height`.

```tsx
// ✅ Next.js Image component
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Dashboard showing monthly revenue trends"
  width={1200}
  height={600}
  priority              // Above-the-fold only
  className="object-cover"
/>

// Responsive fill
<Image
  src="/photo.jpg"
  alt="Description"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

---

## 3. Motion

- **Default duration:** 150–250ms micro-interactions, 300–400ms layout transitions. Longer feels sluggish.
- **Default easing:** `ease-out` entrances, `ease-in` exits, `cubic-bezier(0.4, 0, 0.2, 1)` for most transitions.
- **Animate transforms and opacity, not layout properties.** `transform`/`opacity` are GPU-accelerated; `width`/`height`/`top` cause reflow.
- **Motion communicates causality.** A modal scaling up from a button tells users where it came from.
- **Respect `prefers-reduced-motion`.** Disable non-essential animations; keep functional ones instantaneous.

```tsx
// ✅ GPU-accelerated
"transition-transform duration-200 hover:-translate-y-1"
"transition-opacity duration-150 hover:opacity-80"

// ✅ Reduced motion respected
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

// ❌ Layout-causing properties
"transition-all"  // triggers reflow when width/height change
```

Common animation patterns:
```tsx
"transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"  // Hover lift
"active:scale-[0.98] transition-transform"                                  // Button press
"animate-in fade-in slide-in-from-bottom-4 duration-300"                   // Smooth reveal
"animate-pulse"                                                              // Skeleton
```

No spinning gradients, parallax everything, or scroll-jacking.

---

## 4. Component Patterns

### 4.1 Buttons

**Variants:** `primary` (one per view), `secondary`, `ghost`, `destructive`.

**Sizes:** `sm` (32px height), `md` (40px), `lg` (48px). Touch targets must be ≥44px on mobile.

**All six states are required:**

```tsx
<button className={cn(
  // Default
  "bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium",
  // Hover
  "hover:bg-primary/90",
  // Focus
  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  // Active
  "active:scale-[0.98] transition-transform",
  // Disabled
  "disabled:pointer-events-none disabled:opacity-50",
  // Loading — keep width stable, no layout shift
  isLoading && "cursor-wait"
)}>
  {isLoading ? (
    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
  ) : (
    'Save changes'
  )}
</button>
```

**Labels:** verb + object ("Save changes", "Delete project"). Sentence case in product UI. Icon-only buttons must have `aria-label` and a tooltip.

---

### 4.2 Forms

```tsx
<form className="space-y-6">
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <Label htmlFor="firstName">First name</Label>    {/* Labels above, never placeholders-as-labels */}
      <Input
        id="firstName"
        autoComplete="given-name"                       {/* autocomplete attrs required */}
        placeholder="Jane"
        aria-describedby="firstName-error"
      />
      {errors.firstName && (
        <p id="firstName-error" className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />           {/* Never red color alone */}
          {errors.firstName}
        </p>
      )}
    </div>
  </div>

  <Button type="submit">Submit</Button>                 {/* Keep enabled; validate on submit */}
</form>
```

Rules:
- **Validate on blur**, not on every keystroke.
- **Don't reset forms on error.** Preserve user input.
- **Submit buttons stay enabled** — disabled submit buttons hide the reason for failure.
- **Mark optional fields**, not required ones, when most fields are required (and vice versa).
- **`fieldset` + `legend`** for grouped related fields.

---

### 4.3 Tables

```tsx
<table>
  <thead className="sticky top-0 bg-background">       {/* Sticky for 10+ rows */}
    <tr>
      <th className="text-left">Name</th>               {/* Left-align text */}
      <th className="text-right">Amount</th>            {/* Right-align numbers */}
      <th className="text-center">Status</th>           {/* Center icons/booleans */}
    </tr>
  </thead>
  <tbody>
    {rows.map((row) => (
      <tr key={row.id} className="hover:bg-muted/50">   {/* Subtle row hover */}
        <td>{row.name}</td>
        <td className="text-right tabular-nums">{row.amount}</td>
        <td className="text-center"><StatusBadge status={row.status} /></td>
      </tr>
    ))}
  </tbody>
</table>
```

- **Empty state designed**, not just "No data."
- **Sort → filter → pagination** priority. Infinite scroll is wrong for tables.
- **Don't put primary actions in row hover-only** — fails on touch.

---

### 4.4 Modals & Dialogs

- **Use sparingly.** Prefer inline editing, side panels, or routes.
- **Trap focus** inside the modal; restore to trigger on close.
- **Esc closes; click-outside closes** — unless data could be lost (then confirm).
- **Mobile:** full-screen bottom sheets, not centered modals.
- **One primary action.** Label destructive actions specifically: "Delete 12 projects", not "Confirm".

```tsx
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete project</DialogTitle>
      <DialogDescription>
        This will permanently delete "My Project" and all its data. This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>Cancel</Button>
      <Button variant="destructive" onClick={onDelete}>Delete project</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### 4.5 Empty / Error / Loading States

**Skeletons** for predictable-shape content. **Spinners** for short indeterminate waits. **Progress bars** for known durations. Never block the entire UI for a single fetch.

```tsx
// Empty state — explains what, why, and what to do
<div className="flex flex-col items-center justify-center py-12 text-center">
  <InboxIcon className="h-12 w-12 text-muted-foreground/50" />
  <h3 className="mt-4 text-lg font-semibold">No messages yet</h3>
  <p className="mt-2 text-sm text-muted-foreground">
    Messages from your team will appear here.
  </p>
  <Button className="mt-4">Send your first message</Button>
</div>

// Error state — what failed, why if known, what to try
<div className="rounded-md bg-destructive/10 p-4 text-destructive">
  <p className="font-medium text-sm">Failed to load projects</p>
  <p className="mt-1 text-sm opacity-90">{error.message}</p>
  <Button variant="outline" size="sm" className="mt-3" onClick={retry}>Try again</Button>
</div>

// Skeleton loading
<div className="animate-pulse space-y-3">
  <div className="h-4 w-3/4 rounded bg-muted" />
  <div className="h-4 w-1/2 rounded bg-muted" />
  <div className="h-4 w-5/6 rounded bg-muted" />
</div>

// Spinner for actions
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Saving...
</Button>
```

**Optimistic UI** for actions that almost always succeed (like, favorite, mark read). Revert on failure with a toast. **Avoid layout shift** when states transition — reserve space for the data shape.

---

### 4.6 Navigation

- **Top nav** for marketing and shallow apps; **side nav** for apps with >5 sections.
- **Active state must be unmistakable** — not just a slight color shift.
- **Breadcrumbs** when hierarchy is ≥3 deep.
- **Mobile:** bottom tab bar (3–5 items) for primary, hamburger for secondary only.

```tsx
<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <Link href="/" className="flex items-center gap-2 font-bold">
      <Logo className="h-8 w-8" />Brand
    </Link>

    <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
      <Link href="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        Features
      </Link>
      <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        Pricing
      </Link>
    </nav>

    <div className="flex items-center gap-4">
      <Button variant="ghost" size="sm" className="hidden sm:flex">Sign in</Button>
      <Button size="sm">Get started free</Button>
    </div>
  </div>
</header>
```

---

### 4.7 Toasts & Notifications

- **Toasts are for transient confirmation**, not for errors requiring action.
- **4–6 second auto-dismiss.** Position consistently — top-right or bottom-right, never both.
- **Stack, don't queue.** Multiple toasts visible; new ones push old ones up.
- **Include undo for destructive actions.** "Deleted. Undo" beats a confirmation modal.

```tsx
// ✅ Destructive action toast with undo
toast({
  title: "Project deleted",
  description: "\"My Project\" has been permanently deleted.",
  action: <ToastAction altText="Undo deletion" onClick={undoDelete}>Undo</ToastAction>,
})

// ❌ Error that requires action (use inline error instead)
toast({ title: "Payment failed", description: "Update your card." })
```

---

## 5. Accessibility

These are baseline correctness, not polish.

#### Semantic HTML

```tsx
// ✅
<main>
  <header>
    <nav aria-label="Main navigation">...</nav>
  </header>
  <article>
    <h1>Page Title</h1>
    <section aria-labelledby="section-id">
      <h2 id="section-id">Section</h2>
    </section>
  </article>
  <footer>...</footer>
</main>

// ❌
<div className="header">
  <div className="nav">
  <div className="main">
```

#### Focus Management

```tsx
// ✅ Visible focus — use :focus-visible not :focus to avoid showing on click
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

// Skip link
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
>
  Skip to content
</a>

// ❌ Never remove focus without replacement
className="focus:outline-none"  // keyboard users cannot see where they are
```

#### Keyboard & ARIA

```tsx
// ✅ Naturally focusable
<button onClick={handleClick}>Click me</button>

// ❌ Not keyboard accessible
<div onClick={handleClick}>Click me</div>

// ✅ Icon-only button
<button aria-label="Close dialog">
  <XIcon className="h-4 w-4" aria-hidden="true" />
</button>

// ✅ Live region for dynamic content
<div aria-live="polite" aria-atomic="true">{statusMessage}</div>
```

#### Non-negotiable checklist

- [ ] One `<h1>` per page; don't skip heading levels
- [ ] All inputs have `<label>` or `aria-label`
- [ ] `tabindex` never > 0
- [ ] `alt=""` on decorative images (still required; omitting `alt` is not the same)
- [ ] Color contrast ≥ 4.5:1 body, ≥ 3:1 large text — verified with a tool, not eyeballed
- [ ] `prefers-reduced-motion` respected
- [ ] Page works at 200% zoom without horizontal scroll

---

## 6. Performance

**These are floors, not ceilings.**

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.0s on fast 4G |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Interaction to Next Paint | < 200ms |
| JS bundle (initial route) | < 170KB compressed |

#### Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
})
```

#### Data Fetching

```tsx
// ✅ Server Components for static/initial data
async function ProductList() {
  const products = await getProducts()
  return <ProductGrid products={products} />
}

// ✅ SWR / TanStack Query for client-side data
function UserProfile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)
  if (isLoading) return <ProfileSkeleton />
  if (error) return <ErrorState />
  return <Profile user={data} />
}

// ❌ Never fetch in useEffect
useEffect(() => {
  fetch('/api/data').then(...)  // race conditions, no caching, no deduplication
}, [])
```

Practical rules:
- **Server-render or static-render** marketing pages — SPAs for marketing are almost always wrong.
- **Code-split by route.** Don't ship the admin panel to the login page.
- **Defer third-party scripts.** Analytics, chat widgets, A/B tools — load after interactive.
- **`font-display: swap`** — no web fonts blocking render.
- **Measure, don't guess.** Lighthouse on every PR for marketing; bundle analyzer for product.

---

## 7. Code Quality

### Architecture

- **Component composition over prop explosion.** >7 props → split it. Prefer `<Card><Card.Header /><Card.Body /></Card>` over `<Card title body footer ... />`.
- **Co-locate:** component, styles, tests, and stories live together. Don't shard by file type.
- **Boundaries:** UI components are pure (props in, JSX out). Data fetching and side effects belong in hooks/services, not in render.
- **State at lowest common ancestor.** Global state is a last resort, not a default.
- **Server state ≠ client state.** Use TanStack Query, SWR, or RTK Query for fetched data.

### File Structure

```
app/
├── (marketing)/          # Route groups for layouts
│   ├── page.tsx
│   └── pricing/
├── (dashboard)/
│   ├── layout.tsx
│   └── dashboard/
└── api/[feature]/route.ts

components/
├── ui/                   # Base primitives (don't modify)
├── [feature]/            # Feature-specific components
├── layout/               # Layout components
└── shared/               # Shared components

hooks/
└── use-[feature].ts
lib/
├── utils.ts
└── validations.ts        # Zod schemas
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `FeatureCard` |
| Files | kebab-case | `feature-card.tsx` |
| Hooks | `use` prefix | `useFeature.ts` |
| Booleans | question form | `isLoading`, `hasAccess`, `canEdit` |
| Event handler props | `on` prefix | `onClick`, `onSubmit` |
| Event handler impls | `handle` prefix | `handleSubmit`, `handleClick` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FILE_SIZE` |
| CSS variables | kebab-case | `--primary-color` |

### TypeScript

```tsx
// ✅ Discriminated union for state
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: User[] }

// ✅ strict: true, no any
const config: Config = value as unknown as Config  // narrow with unknown first

// ❌ Never
const data: any = response
```

- `strict: true` — no exceptions.
- Types co-located with code, not in a global `types.ts` dumping ground.
- `as const` for literal arrays and tuples that should be inferred precisely.

### Import Organization

```tsx
// 1. React / Next.js
import { useState } from 'react'
import Image from 'next/image'

// 2. Third-party libraries
import { motion } from 'framer-motion'
import { z } from 'zod'

// 3. Internal components
import { Button } from '@/components/ui/button'

// 4. Internal utilities / hooks
import { cn } from '@/lib/utils'

// 5. Types
import type { Feature } from '@/types'
```

### Edge Cases

Handle each, explicitly: network failures, timeouts, partial data, empty arrays, null/undefined, race conditions, double-clicks, slow connections, offline. The set of bugs that ships is roughly the set of edge cases not designed for.

```tsx
// ✅ Error boundary per feature region
<ErrorBoundary fallback={<SidebarError />}>
  <Sidebar />
</ErrorBoundary>

// ❌ One global error boundary — a failed sidebar blanks the page
<ErrorBoundary fallback={<BlankPage />}>
  <App />
</ErrorBoundary>
```

### What Not to Build

- No premature abstractions. Three similar lines is fine; wait for the fourth.
- No feature flags for code in a single PR.
- No `utils.ts` dumping grounds with more than ~5 functions.
- No half-implemented features — either it works end-to-end or it isn't merged.
- No `// TODO` without a ticket reference or owner.

---

## 8. Tailwind CSS Patterns

### Class Organization

Order classes consistently for readability:

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
  "hover:bg-accent focus-visible:ring-2",

  // 8. Responsive overrides
  "md:p-6 lg:flex-row",

  // 9. Conditional classes
  className
)}
```

### Common Utility Patterns

```tsx
// Centering
"flex items-center justify-center"
"grid place-items-center"

// Card
"rounded-lg border bg-card p-6 shadow-sm"

// Interactive element
"cursor-pointer transition-colors hover:bg-accent"

// Focus ring (accessibility)
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

// Truncation
"truncate"           // Single line
"line-clamp-2"       // Multi-line

// Aspect ratios
"aspect-video"       // 16:9
"aspect-square"      // 1:1

// Overlay / modal backdrop
"bg-background/80 backdrop-blur-sm"

// Dividers
"divide-y divide-border"

// Screen reader only
"sr-only"
```

### Responsive Patterns

```tsx
// Stack to row
<div className="flex flex-col gap-4 md:flex-row">

// Grid columns
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

// Conditional show/hide
<div className="hidden md:block">   {/* Show on md+ */}
<div className="md:hidden">         {/* Hide on md+ */}

// Responsive text
<h1 className="text-3xl md:text-4xl lg:text-5xl">

// Responsive spacing
<section className="py-12 md:py-16 lg:py-24">
```

---

## 9. Common Patterns

### Hero Section

```tsx
<section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        Your compelling headline here
      </h1>
      <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
        Supporting text that elaborates on the headline.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button size="lg">Start free trial</Button>
        <Button size="lg" variant="outline">See how it works</Button>
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
      <p className="mt-4 text-muted-foreground">Everything you need to succeed.</p>
    </div>
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </div>
  </div>
</section>
```

### Bento Grid

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Large feature */}
  <div className="md:col-span-2 lg:row-span-2 rounded-xl border bg-card p-8">
    <h3 className="text-2xl font-bold">Main Feature</h3>
  </div>

  {/* Standard items */}
  <div className="rounded-xl border bg-card p-6">
    <h3 className="font-semibold">Feature 2</h3>
  </div>

  {/* Wide item */}
  <div className="md:col-span-2 rounded-xl border bg-card p-6">
    <h3 className="font-semibold">Wide Feature</h3>
  </div>
</div>
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
        <Button variant="ghost" className="ml-auto gap-1">
          Learn more <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>
```

### Form Layout

```tsx
<form className="space-y-6">
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <Label htmlFor="firstName">First name</Label>
      <Input id="firstName" autoComplete="given-name" placeholder="Jane" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="lastName">Last name</Label>
      <Input id="lastName" autoComplete="family-name" placeholder="Smith" />
    </div>
  </div>

  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" autoComplete="email" placeholder="jane@example.com" />
    <p className="text-sm text-muted-foreground">We'll never share your email.</p>
  </div>

  <Button type="submit" className="w-full sm:w-auto">
    Create account
  </Button>
</form>
```

### Component Template

```tsx
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  variant?: "default" | "highlighted"
  className?: string
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
        "rounded-lg border p-6 transition-colors",
        variant === "default" && "bg-card hover:bg-accent",
        variant === "highlighted" && "bg-primary text-primary-foreground",
        className
      )}
    >
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
```

---

## 10. Anti-Patterns

If your output exhibits any of these, users will recognize it as machine-produced and trust the rest less.

### Color Mistakes

```tsx
// ❌ Too many colors
className="bg-purple-500 text-pink-400 border-blue-300 shadow-green-200"

// ❌ Direct colors instead of tokens
className="bg-white text-black"

// ❌ Purple/pink gradient on every CTA (the AI tell)
className="bg-gradient-to-r from-purple-500 to-pink-500"

// ❌ Clashing temperature gradient
className="bg-gradient-to-r from-pink-500 to-green-500"

// ✅ Semantic tokens, solid colors
className="bg-primary text-primary-foreground"
```

### Typography Mistakes

```tsx
// ❌ Too many fonts
<h1 className="font-display">
<p className="font-body">
<span className="font-accent">       // 3+ families
<code className="font-mono">

// ❌ Body text too small
<p className="text-xs">Body copy</p>

// ❌ Missing line-height
<p className="text-base">            // Default leading is too tight

// ❌ Text alignment: justify on web
<p className="text-justify">         // Creates uneven rivers of space

// ✅
<p className="text-base leading-relaxed max-w-prose">
```

### Layout Mistakes

```tsx
// ❌ Desktop-first responsive
className="w-1/3 sm:w-1/2 xs:w-full"

// ❌ Floats
className="float-left"

// ❌ space-* utilities (less composable than gap)
className="space-y-4"

// ✅ Mobile-first with gap
className="flex flex-col gap-4 md:flex-row"
```

### Component Mistakes

```tsx
// ❌ Monolithic page files (500+ lines)
// ❌ Hardcoded values instead of props or tokens
<div style={{ padding: '23px', color: '#1a1a1a' }}>
// ❌ Missing key props
items.map(item => <Card>{item.name}</Card>)
// ❌ Fetching in useEffect
useEffect(() => { fetch('/api/data').then(...) }, [])

// ✅ Split into components, use tokens, proper keys, server state library
```

### Accessibility Mistakes

```tsx
// ❌
<div onClick={handleClick}>Click me</div>     // Not keyboard accessible
<img src="/photo.jpg" />                       // Missing alt text
<span className="text-red-500">Error</span>   // Color-only indication
<button className="focus:outline-none">        // No focus replacement

// ✅
<button onClick={handleClick}>Click me</button>
<img src="/photo.jpg" alt="Team meeting in conference room" />
<span className="flex items-center gap-2 text-destructive">
  <AlertCircle className="h-4 w-4" aria-hidden="true" />
  Error message
</span>
<button className="focus-visible:ring-2 focus-visible:ring-ring">
```

### Visual Anti-patterns (the AI tells)

- Purple→pink gradient on every CTA
- Glassmorphism on every surface simultaneously
- Decorative emoji in headings, buttons, or section labels
- Three floating abstract shapes behind the hero headline
- "Trusted by" logo bars with five generic SaaS logos
- Feature grids of 6 cards, each with a gradient icon and one-line description
- Animated gradient, blob, or particle backgrounds
- Every component wrapped in a Card with shadow + border + gradient
- Buttons that say "Get Started" with no specifics
- Tooltips on obvious icons ("Settings" on a gear)

---

## 11. Pre-Ship Checklist

### Before Writing Code

1. What's the longest realistic user name? Widest dataset? Sketch with real strings, not "Lorem ipsum."
2. What is the **one** primary action on this screen? If you can't pick one, the screen does too much.
3. List every state this screen can be in — don't skip unhappy paths.
4. Sketch responsive behavior at 360px width.

### Before Shipping

- [ ] Empty, loading, error, success states exist and look intentional
- [ ] Keyboard reachable; focus visible; tab order is logical
- [ ] Works at 320px width and at 200% zoom
- [ ] Color contrast passes AA on all text (verified, not eyeballed)
- [ ] No layout shift during load (CLS < 0.1)
- [ ] No console errors or warnings
- [ ] No `any`, no orphaned `// TODO`, no `console.log` left in
- [ ] Lighthouse ≥ 90 Performance and Accessibility for marketing pages
- [ ] Tested in Safari (it's still the IE of 2026)
- [ ] Tested with `prefers-reduced-motion` and `prefers-color-scheme: dark`
- [ ] Real content — no Lorem ipsum, no placeholder images

---

## 12. Quick Reference

| Category | Rule |
|----------|------|
| **Type** | 2 families max; 14–16px body; 1.5 line-height; 65ch max-width; tabular nums for numbers |
| **Color** | 3–5 colors; semantic tokens; OKLCH/HSL palette; verify AA contrast |
| **Space** | 4px scale; whitespace > borders for hierarchy |
| **Radius** | One scale; nested radius = outer − padding |
| **Motion** | 150–250ms; ease-out; transform/opacity only; respect reduced-motion |
| **Buttons** | One primary per view; ≥44px touch; all six states designed |
| **Forms** | Labels above inputs; validate on blur; preserve input on error; autocomplete attrs |
| **States** | Empty / loading / error / success — design all four for every async surface |
| **A11y** | Semantic HTML; `:focus-visible`; keyboard reachable; AA contrast; alt text |
| **Perf** | LCP < 2.5s; CLS < 0.1; INP < 200ms; SSR marketing; code-split by route |
| **Code** | TS strict; no `any`; composition > props; lift state lowest; server-state library |
| **Test** | Behavior not implementation; every bug → regression test |

When in doubt: simpler, quieter, more accessible, more honest about what it does. That is the difference between "looks designed" and *is* designed.
