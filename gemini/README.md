# Gemini Design Skill

Design and development skill for [Gemini](https://gemini.google.com) by Google — for building intelligent, hyper-responsive interfaces.

## Overview

A comprehensive, rigorous guide to generating world-class, intelligent web applications with polished, hyper-responsive UI/UX aligned with the Gemini ecosystem aesthetic.

## Stack

- **Framework:** React / Next.js
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui + Radix primitives
- **Language:** TypeScript
- **Motion:** Framer Motion (spring physics)

## Key Principles

1. **Intelligence through Clarity** — Anticipate user needs without overwhelming them
2. **Silent Competence** — Zero visual clutter; every pixel must justify its existence
3. **Physics-Based Fluidity** — Motion emulates real-world physics (springs, damping)
4. **Graceful Adaptability** — Flawless across viewport, device power, and capability
5. **Deterministic Execution** — Mathematical scales, not arbitrary visual tweaks

## Aesthetic

- Deep, immersive dark modes and expansive light modes
- Subtle, high-performance glassmorphism and layered elevations
- Precise, algorithmic typography that scales fluidly
- Iridescent, purposeful accents against sophisticated neutrals
- Spring-based animations that feel responsive and premium

## Quick Start

### Load as System Prompt

```python
with open('gemini/SKILL.md', 'r') as f:
    skill = f.read()

messages = [
    {"role": "system", "content": skill},
    {"role": "user", "content": "Build an AI chat interface"}
]
```

### Key Rules

- **Colors:** 3-5 base families via semantic tokens (LCH/OKLCH)
- **Typography:** Tabular nums for data, tight leading for headings
- **Motion:** Spring physics, animate transform/opacity only
- **Architecture:** Headless primitives + utility CSS separation
- **Performance:** Server Components, streaming, Core Web Vitals focus

## File

- [SKILL.md](./SKILL.md) — Full skill specification (~450 lines)

## Signature Patterns

### Glassmorphism (Gemini-style)

```tsx
"bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 border border-white/10 dark:border-white/5 shadow-2xl"
```

### AI Prompt Input

```tsx
<div className="relative flex w-full max-w-3xl items-end gap-2 rounded-2xl border border-border/50 bg-surface/50 p-2 pl-4 shadow-sm backdrop-blur-md">
  <textarea className="..." placeholder="Ask Gemini anything..." />
  <Button size="icon"><ArrowUpIcon /></Button>
</div>
```

### Spring Animation

```tsx
<motion.div
  initial={{ opacity: 0, y: 10, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
>
```

## Version

Current: `1.0.0`

## License

MIT — See [LICENSE](../LICENSE)
