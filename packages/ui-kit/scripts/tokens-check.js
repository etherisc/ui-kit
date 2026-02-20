#!/usr/bin/env node

/**
 * Design tokens consistency checker
 *
 * Ensures all CSS variables defined in globals.css
 * are properly documented in TOKENS.md
 */

/* global console, process */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const globalsCssPath = path.join(__dirname, '../src/styles/globals.css');
const tokensMdPath = path.join(__dirname, '../src/theme/TOKENS.md');

const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
const tokensMd = fs.readFileSync(tokensMdPath, 'utf8');

function extractCssVariables(css) {
    const regex = /--[\w-]+(?=:)/g;
    const matches = css.match(regex);
    const filtered = (matches ?? []).filter(v =>
        !v.startsWith('--tw-') &&
        !v.startsWith('--shadow-color') &&
        !v.startsWith('--shadow-strength')
    );
    return [...new Set(filtered)];
}

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

function main() {
    console.log('Checking design tokens documentation...');

    const cssVariables = extractCssVariables(globalsCss);
    console.log(`Found ${cssVariables.length} CSS variables in globals.css`);

    const undocumentedVariables = checkVariablesDocumented(cssVariables, tokensMd);

    if (undocumentedVariables.length === 0) {
        console.log('All CSS variables are properly documented in TOKENS.md');
        process.exit(0);
    } else {
        console.error('The following CSS variables are not documented in TOKENS.md:');
        undocumentedVariables.forEach(v => console.error(`   - ${v}`));
        console.error(`\nPlease add documentation for these ${undocumentedVariables.length} variables.`);
        process.exit(1);
    }
}

main();
