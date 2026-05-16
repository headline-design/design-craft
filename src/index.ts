/**
 * Design Craft - Skill Parser and Utilities
 *
 * A TypeScript library for parsing and working with Design Craft skills.
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { parse as parseYaml } from "yaml";

/**
 * Skill frontmatter metadata
 */
export interface SkillFrontmatter {
  /** Lowercase identifier matching directory name */
  name: string;
  /** Description for agent routing (when to trigger) */
  description: string;
  /** Semantic version */
  version?: string;
  /** Phrases that should activate this skill */
  triggers?: string[];
  /** Primary technologies covered */
  stack?: string[];
  /** Creator/maintainer */
  author?: string;
  /** Last updated date (ISO 8601) */
  updated?: string;
}

/**
 * Parsed skill with frontmatter and content
 */
export interface Skill {
  /** Parsed YAML frontmatter */
  frontmatter: SkillFrontmatter;
  /** Markdown content (without frontmatter) */
  content: string;
  /** Full raw content (with frontmatter) */
  raw: string;
  /** File path */
  path: string;
}

/**
 * Validation error
 */
export interface ValidationError {
  /** Error type */
  type: "missing" | "mismatch" | "format" | "content";
  /** Error message */
  message: string;
  /** Related field or section */
  field?: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  /** Whether the skill is valid */
  valid: boolean;
  /** List of errors (empty if valid) */
  errors: ValidationError[];
  /** List of warnings (non-blocking issues) */
  warnings: ValidationError[];
}

const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

const REQUIRED_SECTIONS = [
  "Design Philosophy",
  "Color System",
  "Typography",
  "Layout",
  "Component",
  "Tailwind",
  "Accessibility",
  "Performance",
  "Code Organization",
  "UI/UX",
  "Common Patterns",
  "Anti-Pattern",
  "Quick Reference",
];

/**
 * Parse a skill file from a file path
 */
export function parseSkill(filepath: string): Skill {
  if (!existsSync(filepath)) {
    throw new Error(`Skill file not found: ${filepath}`);
  }

  const raw = readFileSync(filepath, "utf-8");
  const match = raw.match(FRONTMATTER_REGEX);

  if (!match) {
    throw new Error(`Invalid skill format: missing YAML frontmatter in ${filepath}`);
  }

  const frontmatter = parseYaml(match[1]) as SkillFrontmatter;
  const content = match[2].trim();

  if (!frontmatter.name) {
    throw new Error(`Missing required field 'name' in ${filepath}`);
  }

  if (!frontmatter.description) {
    throw new Error(`Missing required field 'description' in ${filepath}`);
  }

  return {
    frontmatter,
    content,
    raw,
    path: filepath,
  };
}

/**
 * Parse skill content from a string
 */
export function parseSkillContent(content: string, sourcePath = "inline"): Skill {
  const match = content.match(FRONTMATTER_REGEX);

  if (!match) {
    throw new Error("Invalid skill format: missing YAML frontmatter");
  }

  const frontmatter = parseYaml(match[1]) as SkillFrontmatter;
  const body = match[2].trim();

  return {
    frontmatter,
    content: body,
    raw: content,
    path: sourcePath,
  };
}

/**
 * Validate a skill against the schema
 */
export function validateSkill(skill: Skill): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Check required frontmatter
  if (!skill.frontmatter.name) {
    errors.push({
      type: "missing",
      message: "Missing required field: name",
      field: "name",
    });
  }

  if (!skill.frontmatter.description) {
    errors.push({
      type: "missing",
      message: "Missing required field: description",
      field: "description",
    });
  }

  // Check name matches directory (if path available)
  if (skill.path && skill.path !== "inline") {
    const dirName = dirname(skill.path).split("/").pop();
    if (dirName && skill.frontmatter.name !== dirName) {
      errors.push({
        type: "mismatch",
        message: `Name '${skill.frontmatter.name}' doesn't match directory '${dirName}'`,
        field: "name",
      });
    }
  }

  // Check for required sections
  const contentLower = skill.content.toLowerCase();
  for (const section of REQUIRED_SECTIONS) {
    if (!contentLower.includes(section.toLowerCase())) {
      warnings.push({
        type: "content",
        message: `Missing or renamed section: ${section}`,
        field: "content",
      });
    }
  }

  // Check for version
  if (!skill.frontmatter.version) {
    warnings.push({
      type: "missing",
      message: "Missing recommended field: version",
      field: "version",
    });
  }

  // Check for triggers
  if (!skill.frontmatter.triggers || skill.frontmatter.triggers.length === 0) {
    warnings.push({
      type: "missing",
      message: "Missing recommended field: triggers",
      field: "triggers",
    });
  }

  // Check for code examples
  if (!skill.content.includes("```")) {
    warnings.push({
      type: "content",
      message: "No code examples found",
      field: "content",
    });
  }

  // Check for good/bad examples
  if (!skill.content.includes("// ✅") || !skill.content.includes("// ❌")) {
    warnings.push({
      type: "content",
      message: "Missing ✅/❌ example annotations",
      field: "content",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Discover all skills in a directory
 */
export function discoverSkills(baseDir: string): Skill[] {
  const skills: Skill[] = [];

  if (!existsSync(baseDir)) {
    return skills;
  }

  const entries = readdirSync(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const skillPath = join(baseDir, entry.name, "SKILL.md");
      if (existsSync(skillPath)) {
        try {
          skills.push(parseSkill(skillPath));
        } catch {
          // Skip invalid skills
        }
      }
    }
  }

  return skills;
}

/**
 * Check if a user message should trigger a skill
 */
export function shouldTriggerSkill(message: string, skill: Skill): boolean {
  const messageLower = message.toLowerCase();

  // Check explicit triggers
  if (skill.frontmatter.triggers) {
    for (const trigger of skill.frontmatter.triggers) {
      if (messageLower.includes(trigger.toLowerCase())) {
        return true;
      }
    }
  }

  // Check stack mentions
  if (skill.frontmatter.stack) {
    for (const tech of skill.frontmatter.stack) {
      if (messageLower.includes(tech.toLowerCase())) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Find the best matching skill for a message
 */
export function findBestSkill(message: string, skills: Skill[]): Skill | null {
  let bestSkill: Skill | null = null;
  let bestScore = 0;

  for (const skill of skills) {
    let score = 0;

    // Check triggers
    if (skill.frontmatter.triggers) {
      for (const trigger of skill.frontmatter.triggers) {
        if (message.toLowerCase().includes(trigger.toLowerCase())) {
          score += 10;
        }
      }
    }

    // Check stack
    if (skill.frontmatter.stack) {
      for (const tech of skill.frontmatter.stack) {
        if (message.toLowerCase().includes(tech.toLowerCase())) {
          score += 5;
        }
      }
    }

    // Check skill name mention
    if (message.toLowerCase().includes(skill.frontmatter.name.toLowerCase())) {
      score += 20;
    }

    if (score > bestScore) {
      bestScore = score;
      bestSkill = skill;
    }
  }

  return bestSkill;
}

/**
 * Format a skill for use as a system prompt
 */
export function formatAsSystemPrompt(skill: Skill, prefix?: string): string {
  const parts: string[] = [];

  if (prefix) {
    parts.push(prefix);
  }

  parts.push(`# ${skill.frontmatter.name.toUpperCase()} Design Skill`);
  parts.push("");
  parts.push(skill.content);

  return parts.join("\n");
}

/**
 * Get skill metadata without full content
 */
export function getSkillMetadata(
  skill: Skill
): Omit<Skill, "content" | "raw"> & { contentLength: number } {
  return {
    frontmatter: skill.frontmatter,
    path: skill.path,
    contentLength: skill.content.length,
  };
}

// Default export
export default {
  parseSkill,
  parseSkillContent,
  validateSkill,
  discoverSkills,
  shouldTriggerSkill,
  findBestSkill,
  formatAsSystemPrompt,
  getSkillMetadata,
};
