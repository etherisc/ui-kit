# Task 2.1a Planning: Shadcn UI Component Upgrade

## Overview

This task involves upgrading the current form components to use the Shadcn CLI for better alignment with the latest Shadcn UI implementations. This will ensure the components are easier to maintain and update in the future.

## Task Breakdown

| Task Description                                             | Definition of Done (DoD)                                                                                                                                | Status   |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Set up Shadcn CLI and configuration                          | components.json file created with proper configuration; CLI commands functioning correctly                                                              | complete |
| Reorganize project structure to match Shadcn standards       | Directory structure and imports aligned with Shadcn expectations; Utils in correct location                                                             | complete |
| Update existing components using Shadcn CLI                  | All components (Button, Input, Select, Checkbox, RadioGroup) updated using the Shadcn CLI; Components maintain existing functionality                   | complete |
| Ensure wrapper components align with updated base components | All wrapper components (NumberInput, Select, Checkbox, RadioGroup) function correctly with the updated base components; No regressions in functionality | complete |

## Implementation Strategy

### Step 1: Project Structure Reorganization (Completed)

- Create `src/lib` directory for utilities to match Shadcn standards
- Move `cn` utility from `src/utils/cn.ts` to `src/lib/utils.ts`
- Update imports across the project to use the new paths
- Update components.json to reflect the correct paths

### Step 2: Component Updates (Completed)

- Use the Shadcn CLI to update/reinstall all base components
- Ensure the updated components use the latest patterns and styles
- Verify all dependencies are correctly installed

### Step 3: Wrapper Component Alignment (Completed)

- Update wrapper components to work with the new base components
- Ensure all functionality is maintained
- Run tests to verify no regressions

## Timeline

- Estimated completion: 1-2 days (Completed in 1 day)
- First step: Setup and initial component upgrades (Completed)
- Second step: Complete remaining component updates and testing (Completed)
