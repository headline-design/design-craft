# v0 Design Skill

Design and development skill for [v0 by Vercel](https://v0.dev) — Vercel's AI-powered development assistant.

## Overview

This skill encodes v0's opinionated defaults for building production-grade web interfaces. It covers the complete design-to-code workflow with emphasis on the Next.js + shadcn/ui ecosystem.

## Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Language:** TypeScript
- **Icons:** Lucide React

## Key Principles

1. **Restraint over excess** — Great design is about what you leave out
2. **Clarity over cleverness** — Users should understand interfaces instantly
3. **Consistency over novelty** — Predictable patterns reduce cognitive load
4. **Purpose over decoration** — Every element must earn its place
5. **Ship interesting, never ugly** — Balance creativity with polish

## Aesthetic

- Clean, modern interfaces with generous whitespace
- Subtle shadows and borders that create depth without distraction
- Smooth, purposeful animations that guide attention
- Professional color palettes that feel cohesive
- Typography that establishes clear hierarchy

## Quick Start

### Load as System Prompt

```python
with open('v0/SKILL.md', 'r') as f:
    skill = f.read()

messages = [
    {"role": "system", "content": skill},
    {"role": "user", "content": "Build a pricing page"}
]
```

### Key Rules

- **Colors:** 3-5 maximum, via semantic tokens (`bg-background`, not `bg-white`)
- **Fonts:** 2 families maximum
- **Layout:** Mobile-first, flexbox for most layouts
- **Components:** Split into logical pieces, never monolithic files
- **Accessibility:** Semantic HTML, visible focus states, alt text

## File

- [SKILL.md](./SKILL.md) — Full skill specification (~1200 lines)

## Usage

This skill is optimized for:
- Landing pages
- Dashboards
- Component libraries
- Marketing sites
- SaaS applications
- Admin interfaces

## Version

Current: `1.0.0`

## License

MIT — See [LICENSE](../LICENSE)
