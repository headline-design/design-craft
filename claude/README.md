# Claude Design Skill

Design and development skill for [Claude](https://claude.ai) by Anthropic — for building professional, production-ready interfaces.

## Overview

A field guide for producing software that looks and feels professionally designed — not "AI-generated." The job is restraint plus rigor: most decisions are about what to leave out and what to handle when things go wrong.

## Stack

- **Framework:** React (framework-agnostic patterns)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Language:** TypeScript
- **Data:** SWR / TanStack Query

## Key Principles

1. **Restraint over abundance** — Fewer colors, fewer fonts, fewer effects, fewer words
2. **Hierarchy through space and weight** — Borders and dividers are last resorts
3. **Content shapes layout** — Start from worst-case content, not empty containers
4. **Every interactive element has five states** — Default, hover, active, focus-visible, disabled
5. **The error/empty/loading states are the product** — Real software lives in unhappy paths
6. **Accessibility is not a layer** — It's structural, baseline correctness
7. **Performance is a feature** — Slow UI feels broken regardless of looks
8. **Consistency beats local optimization** — Match the system
9. **Match the medium** — B2B admin tools shouldn't look like consumer landing pages
10. **Write code you'd want to inherit** — Boring, predictable, well-named

## Aesthetic

- Typography-driven hierarchy without decorative elements
- Generous whitespace as a structural element
- Subtle, purposeful motion (150-250ms micro-interactions)
- Muted palettes with strategic saturation
- Content-first layouts that handle edge cases

## Quick Start

### Load as System Prompt

```python
import anthropic
from pathlib import Path

skill = Path('claude/SKILL.md').read_text()

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    system=f"Follow these design guidelines:\n\n{skill}",
    messages=[{"role": "user", "content": "Build a dashboard"}]
)
```

### Key Rules

- **Colors:** 3-5 total via semantic tokens
- **Typography:** 2 fonts max, 14-16px body, 1.5 line-height
- **Space:** 4px base scale, consistent throughout
- **States:** All five states for every interactive element
- **Edge cases:** Handle network failures, empty arrays, loading, errors

## File

- [SKILL.md](./SKILL.md) — Full skill specification (~1300 lines)

## Pre-Ship Checklist

1. Empty, loading, error, success states exist
2. Keyboard reachable, focus visible
3. Works at 320px and 200% zoom
4. Color contrast passes AA
5. No console errors or warnings
6. No `any`, no orphaned `// TODO`
7. Tested with `prefers-reduced-motion`

## Version

Current: `1.0.0`

## License

MIT — See [LICENSE](../LICENSE)
