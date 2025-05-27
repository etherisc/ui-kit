#!/usr/bin/env node

/**
 * Documentation Linter
 *
 * This script verifies the presence and basic structure of required documentation files.
 * It checks for CONTRIBUTING.md, PR template, and CODEOWNERS files.
 */

/* eslint-env node */
/* eslint-disable no-undef */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the workspace root (3 levels up from packages/ui-kit/scripts)
const workspaceRoot = join(__dirname, "../../..");

// Required files configuration
const requiredFiles = [
  {
    path: "CONTRIBUTING.md",
    name: "Contributing Guidelines",
    requiredSections: [
      "Getting Started",
      "Development Environment",
      "Development Workflow",
      "Code Style and Standards",
      "Testing Requirements",
      "Pull Request Process",
    ],
  },
  {
    path: ".github/pull_request_template.md",
    name: "Pull Request Template",
    requiredSections: [
      "Description",
      "Testing",
      "Documentation",
      "Code Quality",
    ],
  },
  {
    path: ".github/CODEOWNERS.example",
    name: "Code Owners Example",
    requiredPatterns: [
      "* @", // Global ownership pattern
      "/.github/", // GitHub directory ownership
      "/packages/ui-kit/", // UI Kit package ownership
    ],
  },
];

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

function checkFileExists(filePath, fileName) {
  const fullPath = join(workspaceRoot, filePath);

  if (!existsSync(fullPath)) {
    logError(`${fileName} not found at ${filePath}`);
    return false;
  }

  logSuccess(`${fileName} found at ${filePath}`);
  return true;
}

function checkFileContent(
  filePath,
  fileName,
  requiredSections = [],
  requiredPatterns = [],
) {
  const fullPath = join(workspaceRoot, filePath);

  try {
    const content = readFileSync(fullPath, "utf-8");

    // Check for required sections (for markdown files)
    if (requiredSections.length > 0) {
      const missingSections = [];

      for (const section of requiredSections) {
        // Look for section headers (# ## ### etc.)
        const sectionRegex = new RegExp(`^#+\\s*${section}`, "mi");
        if (!sectionRegex.test(content)) {
          missingSections.push(section);
        }
      }

      if (missingSections.length > 0) {
        logWarning(
          `${fileName} is missing sections: ${missingSections.join(", ")}`,
        );
        return false;
      } else {
        logSuccess(`${fileName} contains all required sections`);
      }
    }

    // Check for required patterns (for CODEOWNERS)
    if (requiredPatterns.length > 0) {
      const missingPatterns = [];

      for (const pattern of requiredPatterns) {
        if (!content.includes(pattern)) {
          missingPatterns.push(pattern);
        }
      }

      if (missingPatterns.length > 0) {
        logWarning(
          `${fileName} is missing patterns: ${missingPatterns.join(", ")}`,
        );
        return false;
      } else {
        logSuccess(`${fileName} contains all required patterns`);
      }
    }

    return true;
  } catch (error) {
    logError(`Error reading ${fileName}: ${error.message}`);
    return false;
  }
}

function validateCodeownersFile(filePath) {
  const fullPath = join(workspaceRoot, filePath);

  try {
    const content = readFileSync(fullPath, "utf-8");
    const lines = content.split("\n");
    let hasErrors = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines and comments
      if (!line || line.startsWith("#")) {
        continue;
      }

      // Basic validation: line should have at least a path pattern and an owner
      const parts = line.split(/\s+/);
      if (parts.length < 2) {
        logWarning(
          `CODEOWNERS line ${i + 1}: "${line}" appears to be malformed`,
        );
        hasErrors = true;
        continue;
      }

      const [, ...owners] = parts;

      // Check if owners start with @
      const invalidOwners = owners.filter((owner) => !owner.startsWith("@"));
      if (invalidOwners.length > 0) {
        logWarning(
          `CODEOWNERS line ${i + 1}: Invalid owners (should start with @): ${invalidOwners.join(", ")}`,
        );
        hasErrors = true;
      }
    }

    if (!hasErrors) {
      logSuccess("CODEOWNERS file syntax is valid");
    }

    return !hasErrors;
  } catch (error) {
    logError(`Error validating CODEOWNERS: ${error.message}`);
    return false;
  }
}

function checkDocumentationCompleteness() {
  logInfo("Checking documentation completeness...");

  // Check if README mentions CONTRIBUTING.md
  const readmePath = join(workspaceRoot, "README.md");
  if (existsSync(readmePath)) {
    const readmeContent = readFileSync(readmePath, "utf-8");
    if (
      readmeContent.includes("CONTRIBUTING.md") ||
      readmeContent.toLowerCase().includes("contributing")
    ) {
      logSuccess("README.md references contributing guidelines");
    } else {
      logWarning("README.md should reference CONTRIBUTING.md");
    }
  }

  // Check if package.json has repository field
  const packageJsonPath = join(workspaceRoot, "package.json");
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    if (packageJson.repository) {
      logSuccess("package.json has repository field");
    } else {
      logWarning(
        "package.json should have repository field for proper GitHub integration",
      );
    }
  }
}

function main() {
  log(`${colors.bold}🔍 Documentation Linter${colors.reset}\n`);

  let allPassed = true;

  // Check each required file
  for (const file of requiredFiles) {
    log(`\n${colors.bold}Checking ${file.name}...${colors.reset}`);

    // Check if file exists
    if (!checkFileExists(file.path, file.name)) {
      allPassed = false;
      continue;
    }

    // Check file content
    if (file.requiredSections || file.requiredPatterns) {
      if (
        !checkFileContent(
          file.path,
          file.name,
          file.requiredSections,
          file.requiredPatterns,
        )
      ) {
        allPassed = false;
      }
    }

    // Special validation for CODEOWNERS
    if (file.path === ".github/CODEOWNERS.example") {
      if (!validateCodeownersFile(file.path)) {
        allPassed = false;
      }
    }
  }

  // Additional completeness checks
  log(`\n${colors.bold}Checking documentation completeness...${colors.reset}`);
  checkDocumentationCompleteness();

  // Final result
  log(`\n${colors.bold}Results:${colors.reset}`);
  if (allPassed) {
    logSuccess("All documentation requirements are met! 🎉");
    process.exit(0);
  } else {
    logError(
      "Some documentation requirements are not met. Please address the issues above.",
    );
    process.exit(1);
  }
}

// Run the linter
main();
