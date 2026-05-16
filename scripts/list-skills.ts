#!/usr/bin/env ts-node
/**
 * List all available skills with their metadata
 */

import { discoverSkills, getSkillMetadata } from "../src/index.js";
import { join } from "path";

const BASE_DIR = join(import.meta.dirname, "..");

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function main(): void {
  console.log("📚 Design Craft Skills\n");

  const skills = discoverSkills(BASE_DIR);

  if (skills.length === 0) {
    console.log("No skills found!");
    process.exit(1);
  }

  console.log(`Found ${skills.length} skill(s):\n`);
  console.log("─".repeat(80));

  for (const skill of skills) {
    const meta = getSkillMetadata(skill);
    const fm = meta.frontmatter;

    console.log(`\n📦 ${fm.name}`);
    console.log(`   Version: ${fm.version || "not specified"}`);
    console.log(`   Size: ${formatBytes(meta.contentLength)}`);

    if (fm.stack && fm.stack.length > 0) {
      console.log(`   Stack: ${fm.stack.join(", ")}`);
    }

    if (fm.triggers && fm.triggers.length > 0) {
      console.log(`   Triggers: ${fm.triggers.slice(0, 3).join(", ")}${fm.triggers.length > 3 ? "..." : ""}`);
    }

    console.log(`   Path: ${meta.path}`);
  }

  console.log("\n" + "─".repeat(80));
  console.log(`\nTotal: ${skills.length} skill(s)`);
}

main();
