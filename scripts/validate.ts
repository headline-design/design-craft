#!/usr/bin/env ts-node
/**
 * Validate all skills in the repository
 */

import { discoverSkills, validateSkill, ValidationResult } from "../src/index.js";
import { join } from "path";

const BASE_DIR = join(import.meta.dirname, "..");

function printResult(skillName: string, result: ValidationResult): void {
  const status = result.valid ? "✅" : "❌";
  console.log(`\n${status} ${skillName}`);

  if (result.errors.length > 0) {
    console.log("  Errors:");
    for (const error of result.errors) {
      console.log(`    - [${error.type}] ${error.message}`);
    }
  }

  if (result.warnings.length > 0) {
    console.log("  Warnings:");
    for (const warning of result.warnings) {
      console.log(`    - [${warning.type}] ${warning.message}`);
    }
  }

  if (result.valid && result.warnings.length === 0) {
    console.log("  All checks passed!");
  }
}

function main(): void {
  console.log("🔍 Validating Design Craft skills...\n");
  console.log(`Base directory: ${BASE_DIR}`);

  const skills = discoverSkills(BASE_DIR);

  if (skills.length === 0) {
    console.log("\n⚠️  No skills found!");
    process.exit(1);
  }

  console.log(`\nFound ${skills.length} skill(s):`);

  let allValid = true;
  let totalWarnings = 0;

  for (const skill of skills) {
    const result = validateSkill(skill);
    printResult(skill.frontmatter.name, result);

    if (!result.valid) {
      allValid = false;
    }
    totalWarnings += result.warnings.length;
  }

  console.log("\n" + "─".repeat(50));

  if (allValid) {
    console.log(`\n✅ All ${skills.length} skills are valid!`);
    if (totalWarnings > 0) {
      console.log(`⚠️  ${totalWarnings} warning(s) to review.`);
    }
    process.exit(0);
  } else {
    console.log("\n❌ Some skills have validation errors.");
    process.exit(1);
  }
}

main();
