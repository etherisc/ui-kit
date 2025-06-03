---
"@etherisc/ui-kit": patch
---

fix: ensure Select component is properly exported with TypeScript declarations

The Select component was implemented but not being exported due to a build configuration issue where TypeScript declarations weren't being generated properly. This fix updates the build script to ensure all component declarations are generated and exported correctly.

Fixes #39
