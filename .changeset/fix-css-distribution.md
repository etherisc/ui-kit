---
"@etherisc/ui-kit": patch
---

Fix CSS styles missing from distribution build

- Include Tailwind CSS utilities in distributed CSS bundle
- Distributed CSS now contains both theme variables and utility classes (172.83 KB vs 2.28 KB)
- Components are now properly styled when using the distributed CSS
- Add clear documentation about CSS import usage
