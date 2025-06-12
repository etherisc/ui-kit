#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Define problematic patterns and their suggested replacements
const STYLE_VIOLATIONS = {
  // Background colors
  "bg-base-100": {
    replacement: "bg-background",
    description: "DaisyUI base-100 → Shadcn background",
    severity: "high",
  },
  "bg-base-200": {
    replacement: "bg-muted",
    description: "DaisyUI base-200 → Shadcn muted",
    severity: "high",
  },
  "bg-base-300": {
    replacement: "bg-border",
    description: "DaisyUI base-300 → Shadcn border",
    severity: "high",
  },

  // Text colors
  "text-base-content": {
    replacement: "text-foreground",
    description: "DaisyUI base-content → Shadcn foreground",
    severity: "high",
  },
  "text-base-content/70": {
    replacement: "text-muted-foreground",
    description: "DaisyUI base-content/70 → Shadcn muted-foreground",
    severity: "medium",
  },

  // Hover states
  "hover:bg-base-100": {
    replacement: "hover:bg-muted",
    description: "DaisyUI hover:base-100 → Shadcn hover:muted",
    severity: "high",
  },
  "hover:bg-base-100/50": {
    replacement: "hover:bg-muted/50",
    description: "DaisyUI hover:base-100/50 → Shadcn hover:muted/50",
    severity: "high",
  },
  "hover:bg-base-200": {
    replacement: "hover:bg-muted",
    description: "DaisyUI hover:base-200 → Shadcn hover:muted",
    severity: "high",
  },

  // Border colors
  "border-base-100": {
    replacement: "border",
    description: "DaisyUI border-base-100 → Shadcn border (default)",
    severity: "medium",
  },
  "border-base-200": {
    replacement: "border",
    description: "DaisyUI border-base-200 → Shadcn border (default)",
    severity: "medium",
  },
  "border-base-300": {
    replacement: "border",
    description: "DaisyUI border-base-300 → Shadcn border (default)",
    severity: "medium",
  },
};

// Additional patterns to check (for comprehensive scanning)
const ADDITIONAL_PATTERNS = [
  /\bbase-\d+\b/g, // Any base-number pattern
  /\btext-primary-content\b/g, // Should use text-primary-foreground
  /\btext-secondary-content\b/g, // Should use text-secondary-foreground
];

class StylingViolationScanner {
  constructor() {
    this.results = {
      violations: [],
      summary: {
        totalFiles: 0,
        violationFiles: 0,
        totalViolations: 0,
        highSeverity: 0,
        mediumSeverity: 0,
        lowSeverity: 0,
      },
    };
  }

  scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const lines = content.split("\n");
      const fileViolations = [];

      lines.forEach((line, lineIndex) => {
        // Check for known violations
        Object.entries(STYLE_VIOLATIONS).forEach(([pattern, config]) => {
          if (line.includes(pattern)) {
            fileViolations.push({
              line: lineIndex + 1,
              content: line.trim(),
              pattern,
              ...config,
              context: this.getContext(lines, lineIndex),
            });
          }
        });

        // Check for additional patterns
        ADDITIONAL_PATTERNS.forEach((regex) => {
          const matches = line.match(regex);
          if (matches) {
            matches.forEach((match) => {
              if (!STYLE_VIOLATIONS[match]) {
                fileViolations.push({
                  line: lineIndex + 1,
                  content: line.trim(),
                  pattern: match,
                  replacement: "MANUAL_REVIEW_NEEDED",
                  description: `Potential DaisyUI class: ${match}`,
                  severity: "low",
                  context: this.getContext(lines, lineIndex),
                });
              }
            });
          }
        });
      });

      if (fileViolations.length > 0) {
        this.results.violations.push({
          file: filePath,
          violations: fileViolations,
        });
        this.results.summary.violationFiles++;
        this.results.summary.totalViolations += fileViolations.length;

        fileViolations.forEach((v) => {
          if (v.severity === "high") this.results.summary.highSeverity++;
          else if (v.severity === "medium")
            this.results.summary.mediumSeverity++;
          else this.results.summary.lowSeverity++;
        });
      }

      this.results.summary.totalFiles++;
    } catch (error) {
      console.error(`Error scanning file ${filePath}:`, error.message);
    }
  }

  getContext(lines, lineIndex) {
    const start = Math.max(0, lineIndex - 2);
    const end = Math.min(lines.length, lineIndex + 3);
    return lines.slice(start, end).map((line, idx) => ({
      line: start + idx + 1,
      content: line,
      isTarget: start + idx === lineIndex,
    }));
  }

  scanDirectory(dir = "src/components") {
    const pattern = path.join(dir, "**/*.{tsx,ts}");
    const files = glob.sync(pattern, {
      ignore: [
        "**/*.test.{ts,tsx}",
        "**/*.stories.{ts,tsx}",
        "**/node_modules/**",
      ],
    });

    console.log(`🔍 Scanning ${files.length} files in ${dir}...`);

    files.forEach((file) => this.scanFile(file));
  }

  generateReport() {
    const { summary, violations } = this.results;

    console.log("\n" + "=".repeat(80));
    console.log("📊 STYLING VIOLATIONS REPORT");
    console.log("=".repeat(80));

    console.log(`\n📈 SUMMARY:`);
    console.log(`   Total Files Scanned: ${summary.totalFiles}`);
    console.log(`   Files with Violations: ${summary.violationFiles}`);
    console.log(`   Total Violations: ${summary.totalViolations}`);
    console.log(`   🔴 High Severity: ${summary.highSeverity}`);
    console.log(`   🟡 Medium Severity: ${summary.mediumSeverity}`);
    console.log(`   🟢 Low Severity: ${summary.lowSeverity}`);

    if (violations.length === 0) {
      console.log(
        "\n✅ No styling violations found! All components are using proper Tailwind/Shadcn classes.",
      );
      return;
    }

    console.log("\n" + "=".repeat(80));
    console.log("📝 DETAILED VIOLATIONS:");
    console.log("=".repeat(80));

    violations.forEach((fileResult, index) => {
      console.log(`\n${index + 1}. 📄 ${fileResult.file}`);
      console.log("   " + "-".repeat(60));

      fileResult.violations.forEach((violation, vIndex) => {
        const severity =
          violation.severity === "high"
            ? "🔴"
            : violation.severity === "medium"
              ? "🟡"
              : "🟢";

        console.log(
          `\n   ${vIndex + 1}. ${severity} Line ${violation.line}: ${violation.description}`,
        );
        console.log(`      ❌ Found: ${violation.pattern}`);
        console.log(`      ✅ Fix:   ${violation.replacement}`);
        console.log(`      📍 Code:  ${violation.content}`);
      });
    });

    console.log("\n" + "=".repeat(80));
    console.log("🔧 RECOMMENDED ACTION PLAN:");
    console.log("=".repeat(80));
    console.log(
      "1. 🔴 Fix HIGH severity violations first (these break theme switching)",
    );
    console.log(
      "2. 🟡 Address MEDIUM severity violations (these affect consistency)",
    );
    console.log("3. 🟢 Review LOW severity violations (manual review needed)");
    console.log("4. Run tests after each fix to ensure no regressions");
    console.log("5. Test theme switching (light/dark mode) after fixes");
  }

  generateFixScript() {
    if (this.results.violations.length === 0) return;

    const fixScript = this.results.violations
      .filter((fileResult) =>
        fileResult.violations.some((v) => v.severity === "high"),
      )
      .map((fileResult) => {
        const fixes = fileResult.violations
          .filter(
            (v) =>
              v.severity === "high" && v.replacement !== "MANUAL_REVIEW_NEEDED",
          )
          .map((v) => `s/${v.pattern}/${v.replacement}/g`)
          .join("; ");

        return `# Fix ${fileResult.file}\nsed -i '${fixes}' "${fileResult.file}"`;
      })
      .join("\n\n");

    console.log("\n" + "=".repeat(80));
    console.log("🛠️  AUTO-FIX SCRIPT (HIGH SEVERITY ONLY):");
    console.log("=".repeat(80));
    console.log("#!/bin/bash\n");
    console.log(fixScript);
    console.log(
      "\n# ⚠️  IMPORTANT: Review and test after running these fixes!",
    );
  }
}

// CLI execution
if (require.main === module) {
  const scanner = new StylingViolationScanner();

  // Allow custom directory via command line argument
  const targetDir = process.argv[2] || "src/components";

  scanner.scanDirectory(targetDir);
  scanner.generateReport();
  scanner.generateFixScript();

  // Exit with error code if violations found
  process.exit(scanner.results.summary.totalViolations > 0 ? 1 : 0);
}

module.exports = StylingViolationScanner;
