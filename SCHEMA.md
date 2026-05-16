# Design Craft Skill Schema

This document defines the standard structure and format for Design Craft skills. Use this as a reference when parsing skills programmatically or creating new ones.

## File Structure

```
skill-name/
├── SKILL.md          # Required: Main skill file
└── README.md         # Optional: Skill-specific documentation
```

## YAML Frontmatter Schema

```yaml
---
# Required Fields
name: string          # Lowercase identifier, matches directory name
description: string   # Full description for agent routing (when to trigger)

# Optional Fields  
version: string       # Semantic version (e.g., "1.0.0")
triggers: string[]    # Phrases that should activate this skill
stack: string[]       # Primary technologies covered
author: string        # Creator/maintainer
updated: string       # ISO 8601 date (e.g., "2024-01-15")
---
```

## Section Schema

Skills follow a 13-section structure. Each section has a consistent format:

```markdown
## Section Title

### Subsection (if needed)

Prose explanation.

#### Sub-subsection (if needed)

| Table | Headers |
|-------|---------|
| data  | data    |

\```language
// Code examples with ✅ and ❌ annotations
\```
```

## Required Sections

| # | Section | Purpose |
|---|---------|---------|
| 1 | Design Philosophy | Core principles, aesthetic direction |
| 2 | Color System | Tokens, 3-5 color rule, gradients |
| 3 | Typography | Fonts, scale, line heights |
| 4 | Layout & Spacing | Grid, spacing scale, responsive |
| 5 | Component Architecture | File structure, patterns |
| 6 | Tailwind CSS Patterns | Class ordering, utilities |
| 7 | Accessibility | Semantic HTML, ARIA, focus |
| 8 | Performance | Optimization patterns |
| 9 | Code Organization | Project structure, naming |
| 10 | UI/UX Principles | States, hierarchy, feedback |
| 11 | Common Patterns | Hero, grid, forms, nav |
| 12 | Anti-Patterns | What to avoid |
| 13 | Quick Reference | Pre-ship checklist |

## Code Example Format

### Good/Bad Annotations

```tsx
// ✅ Correct approach - semantic tokens
className="bg-background text-foreground"

// ❌ Incorrect approach - direct colors
className="bg-white text-black"
```

### Component Templates

```tsx
import { cn } from "@/lib/utils"

interface ComponentProps {
  // Props interface
}

export function Component({ ...props }: ComponentProps) {
  return (
    // JSX
  )
}
```

### Tailwind Class Order

```tsx
className={cn(
  // 1. Layout
  // 2. Spacing  
  // 3. Typography
  // 4. Colors
  // 5. Borders & Shadows
  // 6. Transitions
  // 7. States
  // 8. Responsive
)}
```

## Parsing Skills Programmatically

### JavaScript/TypeScript

```typescript
import { parse as parseYaml } from 'yaml';
import { readFileSync } from 'fs';

interface SkillFrontmatter {
  name: string;
  description: string;
  version?: string;
  triggers?: string[];
  stack?: string[];
}

interface Skill {
  frontmatter: SkillFrontmatter;
  content: string;
}

function parseSkill(filepath: string): Skill {
  const raw = readFileSync(filepath, 'utf-8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!match) {
    throw new Error('Invalid skill format: missing frontmatter');
  }
  
  const frontmatter = parseYaml(match[1]) as SkillFrontmatter;
  const content = match[2].trim();
  
  return { frontmatter, content };
}

// Usage
const skill = parseSkill('v0/SKILL.md');
console.log(skill.frontmatter.name); // "v0"
console.log(skill.frontmatter.triggers); // ["build a UI", ...]
```

### Python

```python
import yaml
import re
from dataclasses import dataclass
from typing import Optional, List

@dataclass
class SkillFrontmatter:
    name: str
    description: str
    version: Optional[str] = None
    triggers: Optional[List[str]] = None
    stack: Optional[List[str]] = None

@dataclass
class Skill:
    frontmatter: SkillFrontmatter
    content: str

def parse_skill(filepath: str) -> Skill:
    with open(filepath, 'r') as f:
        raw = f.read()
    
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', raw, re.DOTALL)
    if not match:
        raise ValueError('Invalid skill format: missing frontmatter')
    
    fm_dict = yaml.safe_load(match.group(1))
    frontmatter = SkillFrontmatter(**fm_dict)
    content = match.group(2).strip()
    
    return Skill(frontmatter=frontmatter, content=content)

# Usage
skill = parse_skill('v0/SKILL.md')
print(skill.frontmatter.name)  # "v0"
```

## Skill Routing

Agent harnesses can use the `triggers` and `description` fields to route requests to the appropriate skill:

```typescript
function shouldTriggerSkill(userMessage: string, skill: Skill): boolean {
  const message = userMessage.toLowerCase();
  
  // Check explicit triggers
  for (const trigger of skill.frontmatter.triggers || []) {
    if (message.includes(trigger.toLowerCase())) {
      return true;
    }
  }
  
  // Check stack mentions
  for (const tech of skill.frontmatter.stack || []) {
    if (message.includes(tech.toLowerCase())) {
      return true;
    }
  }
  
  return false;
}
```

## Validation

### Required Validations

1. **Frontmatter exists** with at least `name` and `description`
2. **Name matches directory** - `v0/SKILL.md` must have `name: v0`
3. **All sections present** - 13 required sections
4. **Code examples valid** - Syntactically correct
5. **Links resolve** - Table of contents anchors work

### Validation Script

```typescript
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

function validateSkillDirectory(dir: string): string[] {
  const errors: string[] = [];
  
  // Check SKILL.md exists
  const skillPath = join(dir, 'SKILL.md');
  if (!existsSync(skillPath)) {
    errors.push(`Missing SKILL.md in ${dir}`);
    return errors;
  }
  
  const skill = parseSkill(skillPath);
  
  // Validate name matches directory
  const dirName = dir.split('/').pop();
  if (skill.frontmatter.name !== dirName) {
    errors.push(`Name mismatch: ${skill.frontmatter.name} !== ${dirName}`);
  }
  
  // Check required sections (by heading)
  const requiredSections = [
    'Design Philosophy',
    'Color System',
    'Typography',
    'Layout',
    'Component Architecture',
    'Tailwind',
    'Accessibility',
    'Performance',
    'Code Organization',
    'UI/UX',
    'Common Patterns',
    'Anti-Pattern',
    'Quick Reference'
  ];
  
  for (const section of requiredSections) {
    if (!skill.content.toLowerCase().includes(section.toLowerCase())) {
      errors.push(`Missing section containing: ${section}`);
    }
  }
  
  return errors;
}
```

## Extending Skills

Skills can be extended with additional metadata for specific use cases:

```yaml
---
name: v0
description: ...
version: 1.0.0

# Extension: Agent-specific behavior
agent_config:
  max_tokens: 8192
  temperature: 0.3
  stop_sequences: ["---END---"]

# Extension: Feature flags
features:
  dark_mode: true
  animations: true
  glassmorphism: false

# Extension: Dependencies
requires:
  - "@/lib/utils"
  - "class-variance-authority"
  - "tailwind-merge"
---
```

These extensions are optional and can be ignored by parsers that don't need them.
