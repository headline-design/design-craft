# Contributing to Design Craft

Thank you for your interest in contributing to Design Craft! This document provides guidelines for adding new skills or improving existing ones.

## Table of Contents

- [Adding a New Skill](#adding-a-new-skill)
- [Skill File Format](#skill-file-format)
- [Required Sections](#required-sections)
- [Code Example Guidelines](#code-example-guidelines)
- [Quality Standards](#quality-standards)
- [Pull Request Process](#pull-request-process)

## Adding a New Skill

### 1. Create the Directory Structure

```bash
mkdir agent-name
touch agent-name/SKILL.md
```

### 2. Add YAML Frontmatter

Every skill must start with YAML frontmatter:

```yaml
---
name: agent-name
description: Use this skill whenever building, editing, or reviewing user-facing software with [Agent Name] — web apps, dashboards, marketing sites, component libraries, or any code change that produces visual output. Triggers on requests to "build a UI", "design a page", "make a component", "improve the look", "polish this", "make it production-ready", or whenever scaffolding a new app/screen/feature with visible surface area.
version: 1.0.0
triggers:
  - build a UI
  - design a page
  - make a component
  - improve the look
  - polish this
  - make it production-ready
stack:
  - React
  - Tailwind CSS
  - shadcn/ui
---
```

### 3. Follow the Standard Structure

Use the 13-section structure outlined below.

## Skill File Format

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Lowercase identifier matching directory name |
| `description` | Yes | When this skill should trigger (for agent routing) |
| `version` | No | Semantic version (e.g., `1.0.0`) |
| `triggers` | No | Array of phrases that should activate this skill |
| `stack` | No | Array of primary technologies this skill covers |

### File Naming

- Directory: lowercase, hyphenated (`agent-name/`)
- Skill file: Always `SKILL.md` (uppercase)

## Required Sections

Every skill should include these sections in order:

### 1. Design Philosophy
Core principles and aesthetic direction. What makes this agent's output distinctive?

```markdown
## Design Philosophy

### Core Principles

1. **Principle Name** — Brief explanation
2. **Another Principle** — Brief explanation

### The [Agent Name] Aesthetic

- Bullet points describing the visual language
- What makes this style recognizable
```

### 2. Color System
Token structure, the 3-5 color rule, gradient guidelines.

```markdown
## Color System

### The 3-5 Color Rule

**ALWAYS use exactly 3-5 colors total.**

#### Required Structure

\```
1 Primary Brand Color     → CTAs, key actions
2-3 Neutrals              → Backgrounds, text, borders
1-2 Accents               → Status, highlights
\```

#### Design Token Structure

\```css
:root {
  --background: ...;
  --foreground: ...;
  --primary: ...;
}
\```
```

### 3. Typography
Font pairing strategy, type scale, line height rules.

### 4. Layout & Spacing
Grid systems, spacing scale, responsive breakpoints.

### 5. Component Architecture
File structure, composition patterns, component templates.

### 6. Tailwind CSS Patterns
Class ordering convention, common utility patterns.

### 7. Accessibility
Semantic HTML, focus management, ARIA, contrast requirements.

### 8. Performance
Image optimization, code splitting, data fetching patterns.

### 9. Code Organization
Project structure, naming conventions, import order.

### 10. UI/UX Principles
Visual hierarchy, interactive states, feedback patterns, empty states.

### 11. Common Patterns
Code examples for: hero, feature grid, bento grid, forms, navigation.

### 12. Anti-Patterns to Avoid
What NOT to do, with `// ❌` examples.

### 13. Quick Reference Checklist
Pre-ship verification checklist.

## Code Example Guidelines

### Good vs Bad Examples

Always show both correct and incorrect approaches:

```tsx
// ✅ Correct approach
<button onClick={handleClick}>Click me</button>

// ❌ Incorrect approach  
<div onClick={handleClick}>Click me</div>
```

### Real Code Only

- No placeholder text in examples
- No `// ...` to skip important details
- All examples should be copy-pasteable

### Tailwind Class Organization

When showing Tailwind examples, order classes consistently:

```tsx
className={cn(
  // 1. Layout (display, position, sizing)
  "flex items-center justify-between",
  
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
)}
```

### Component Examples

Include complete, working component examples:

```tsx
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) {
  return (
    <div className={cn(
      "rounded-lg border bg-card p-6 transition-colors hover:bg-accent",
      className
    )}>
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
```

## Quality Standards

### Checklist Before Submitting

- [ ] YAML frontmatter includes `name` and `description`
- [ ] All 13 sections are present
- [ ] Table of contents links work
- [ ] Code examples are syntactically correct
- [ ] Both `// ✅` and `// ❌` examples included
- [ ] No placeholder text (`Lorem ipsum`, `...`, `TODO`)
- [ ] Specific, actionable guidance (not generic advice)
- [ ] Agent-specific stack considerations noted
- [ ] Pre-ship checklist at the end
- [ ] Summary section captures core philosophy

### Writing Style

- **Be specific** — "Use `leading-relaxed`" not "use appropriate line height"
- **Be opinionated** — These are best practices, not suggestions
- **Be practical** — Every guideline should be directly actionable
- **Be consistent** — Use the same terminology throughout

### Formatting

- Use ATX-style headers (`## Section`, not underlines)
- Use fenced code blocks with language identifiers
- Use tables for comparison data
- Use blockquotes for key principles

## Pull Request Process

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR-USERNAME/design-craft.git
cd design-craft
```

### 2. Create a Branch

```bash
git checkout -b add-agent-name-skill
```

### 3. Make Changes

Add or modify skill files following the guidelines above.

### 4. Validate

- Check all markdown renders correctly
- Verify table of contents links
- Test code examples are valid syntax

### 5. Submit PR

- Use a descriptive title: `Add [Agent Name] skill` or `Improve color system section in claude skill`
- Include a summary of changes
- Reference any related issues

### Commit Message Format

```
type: brief description

Longer explanation if needed.

- Bullet points for specific changes
- Another change
```

Types:
- `feat`: New skill or section
- `fix`: Corrections to existing content
- `docs`: Documentation improvements
- `refactor`: Restructuring without content changes

### Review Process

1. Maintainers will review for quality and consistency
2. Feedback may be provided for improvements
3. Once approved, changes will be merged

## Questions?

Open an issue for:
- Clarification on guidelines
- Proposals for new skills
- Suggestions for improvements

Thank you for helping make Design Craft better!
