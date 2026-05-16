# Design Craft

A collection of production-grade design and development skills for AI coding agents. Each skill encodes opinionated best practices for creating professional, accessible, and performant user interfaces.

## Overview

Design Craft provides standardized skill files that can be loaded into AI agent systems to guide UI/UX code generation. These skills act as "expert knowledge" that helps agents produce polished, production-ready interfaces rather than generic AI-generated output.

### What's Included

| Skill | Target Agent | Primary Stack | Description |
|-------|--------------|---------------|-------------|
| [v0](./v0/SKILL.md) | v0 by Vercel | Next.js, Tailwind, shadcn/ui | Vercel's AI assistant defaults |
| [claude](./claude/SKILL.md) | Claude (Anthropic) | Framework-agnostic | Anthropic's Claude coding assistant |
| [gemini](./gemini/SKILL.md) | Gemini (Google) | React, Tailwind | Google's Gemini AI assistant |
| [lovable](./lovable/SKILL.md) | Lovable | Vite, TanStack, shadcn/ui | Lovable's AI development platform |

## Installation

### For Agent Harnesses

Skills can be loaded as context/system prompts. Each skill is a self-contained markdown file with YAML frontmatter for metadata.

```bash
# Clone the repository
git clone https://github.com/headline-design/design-craft.git

# Or fetch individual skills directly
curl -O https://raw.githubusercontent.com/headline-design/design-craft/main/v0/SKILL.md
```

### Skill File Format

Each skill follows a standardized format:

```yaml
---
name: skill-name
description: When to trigger this skill (used by agent harnesses for routing)
version: 1.0.0
---

# Skill Content (Markdown)
```

### Loading Skills

**Direct File Loading:**
```python
# Python example
with open('v0/SKILL.md', 'r') as f:
    skill_content = f.read()
system_prompt = f"Use these design guidelines:\n\n{skill_content}"
```

**As MCP Memory:**
Skills can be stored in agent memory systems (like v0's `v0_memories/` directory) for persistent access.

**As System Prompt Extension:**
```javascript
// JavaScript example
import { readFileSync } from 'fs';
const skill = readFileSync('claude/SKILL.md', 'utf-8');
const messages = [
  { role: 'system', content: skill },
  { role: 'user', content: userMessage }
];
```

## Skill Structure

All skills follow a consistent structure for predictability:

```
1. Design Philosophy       - Core principles and aesthetic direction
2. Color System            - Token structure, 3-5 color rule, gradients
3. Typography              - Font pairing, scale, line heights
4. Layout & Spacing        - Grid systems, spacing scale, responsive
5. Component Architecture  - File structure, composition patterns
6. Tailwind CSS Patterns   - Class ordering, utility patterns
7. Accessibility           - Semantic HTML, focus, ARIA, contrast
8. Performance             - Image optimization, code splitting, data fetching
9. Code Organization       - Project structure, naming conventions
10. UI/UX Principles       - Hierarchy, states, feedback, empty states
11. Common Patterns        - Hero, feature grid, bento, forms, navigation
12. Anti-Patterns          - What to avoid (the "AI tells")
13. Quick Reference        - Pre-ship checklist
```

## Core Design Principles

These principles are shared across all skills:

### The 3-5 Color Rule
Every design uses exactly 3-5 colors: 1 primary brand color, 2-3 neutrals, and 1-2 accents. This constraint forces cohesion.

### The 2 Font Maximum
Limit to 2 font families maximum. More creates visual chaos. Display font for headings, readable sans-serif for body.

### Mobile-First Responsive
Always design for 375px width first, then scale up using responsive breakpoints.

### Semantic Tokens
Never use direct colors (`bg-white`, `text-black`). Everything flows through semantic design tokens (`bg-background`, `text-foreground`).

### Component Composition
Split code into logical components. No monolithic 500+ line files. Composition over configuration.

### States Are Required
Every interactive element needs: default, hover, focus, active, disabled. Async elements add: loading, error, success.

### Accessibility Is Structural
Semantic HTML, keyboard navigation, visible focus states, and sufficient contrast are baseline correctness, not polish.

## Anti-Patterns (The AI Tells)

These patterns immediately signal "AI-generated" and should be avoided:

- Purple/pink gradient on every CTA
- `bg-white`, `text-black` instead of semantic tokens
- More than 2 font families
- Missing focus states
- `<div onClick>` instead of `<button>`
- Lorem ipsum or placeholder images in shipped code
- Desktop-first responsive design
- Fetching data in useEffect
- Abstract decorative gradient blobs
- Generic copy ("Get Started", "Learn More")
- Color-only error indication (must include icon)

## Contributing

### Adding a New Skill

1. Create a new directory with the agent name: `agent-name/`
2. Add a `SKILL.md` file following the standard structure
3. Include YAML frontmatter with `name` and `description`
4. Follow the 13-section structure outlined above
5. Add the skill to the table in this README

### Skill Requirements

- [ ] YAML frontmatter with `name`, `description`
- [ ] Table of contents with anchor links
- [ ] Code examples for all patterns
- [ ] Both `// ✅` and `// ❌` examples showing good vs bad
- [ ] Agent-specific stack considerations noted
- [ ] Pre-ship checklist at the end
- [ ] Summary section with core philosophy

### Quality Checklist

- [ ] All code examples are syntactically correct
- [ ] No placeholder text in examples
- [ ] Consistent formatting throughout
- [ ] Links in table of contents work
- [ ] Specific, actionable guidance (not generic advice)

## Usage Examples

### With OpenAI API

```python
import openai
from pathlib import Path

skill = Path('v0/SKILL.md').read_text()

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": f"You are a UI developer. Follow these guidelines:\n\n{skill}"},
        {"role": "user", "content": "Build a landing page for a SaaS product"}
    ]
)
```

### With Anthropic Claude

```python
import anthropic
from pathlib import Path

skill = Path('claude/SKILL.md').read_text()

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4096,
    system=f"Use these design guidelines:\n\n{skill}",
    messages=[
        {"role": "user", "content": "Create a dashboard component"}
    ]
)
```

### With LangChain

```python
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from pathlib import Path

skill = Path('gemini/SKILL.md').read_text()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a UI developer following these guidelines:\n\n{skill}"),
    ("human", "{input}")
])

chain = prompt | ChatOpenAI(model="gpt-4")
response = chain.invoke({"skill": skill, "input": "Build a feature grid"})
```

### With v0 Memory System

```bash
# Copy skill to v0 memory directory
cp v0/SKILL.md v0_memories/user/skills/design.md
```

## Versioning

Skills follow semantic versioning:

- **Major**: Breaking changes to structure or fundamental principles
- **Minor**: New sections, expanded guidance, additional patterns
- **Patch**: Typo fixes, clarifications, small improvements

## License

MIT License - See [LICENSE](./LICENSE) for details.

## Credits

Created and maintained by [HEADLINE Design](https://github.com/headline-design).

---

## Quick Start

1. Pick the skill matching your target agent
2. Load the skill content as system context
3. Start generating production-quality UI code

For questions or issues, [open an issue](https://github.com/headline-design/design-craft/issues).
