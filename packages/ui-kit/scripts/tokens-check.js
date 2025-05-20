#!/usr/bin/env node

/**
 * Design tokens consistency checker
 * 
 * This script ensures that all CSS variables defined in theme.css
 * are properly documented in DESIGN_TOKENS.md
 */

/* global console, process */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const themeCssPath = path.join(__dirname, '../src/theme/theme.css');
const tokensMdPath = path.join(__dirname, '../src/theme/DESIGN_TOKENS.md');

// Read the files
const themeCss = fs.readFileSync(themeCssPath, 'utf8');
const tokensMd = fs.readFileSync(tokensMdPath, 'utf8');

// Extract CSS variables from theme.css
function extractCssVariables(css) {
    const regex = /--[\w-]+(?=:)/g;
    const matches = css.match(regex);

    // Remove duplicates (variables can appear in both :root and .dark)
    return [...new Set(matches)];
}

// Check if variables are documented in DESIGN_TOKENS.md
function checkVariablesDocumented(variables, doc) {
    const undocumented = [];

    for (const variable of variables) {
        const variableRegex = new RegExp(`\`${variable}\``, 'g');
        if (!variableRegex.test(doc)) {
            undocumented.push(variable);
        }
    }

    return undocumented;
}

// Main function
function main() {
    console.log('🔍 Checking design tokens documentation...');

    const cssVariables = extractCssVariables(themeCss);
    console.log(`Found ${cssVariables.length} CSS variables in theme.css`);

    const undocumentedVariables = checkVariablesDocumented(cssVariables, tokensMd);

    if (undocumentedVariables.length === 0) {
        console.log('✅ All CSS variables are properly documented in DESIGN_TOKENS.md');
        process.exit(0);
    } else {
        console.error('❌ The following CSS variables are not documented in DESIGN_TOKENS.md:');
        undocumentedVariables.forEach(v => console.error(`   - ${v}`));
        console.error(`\nPlease add documentation for these ${undocumentedVariables.length} variables to maintain the design system consistency.`);
        process.exit(1);
    }
}

main(); 