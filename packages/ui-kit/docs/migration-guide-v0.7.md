# Migration Guide: DataTable v0.6 → v0.7

## Overview

Version 0.7 includes major improvements to the DataTable component, fixing critical pagination bugs and modernizing the CSS architecture. This guide helps you migrate your existing code.

## 🎯 **TL;DR - Quick Migration Checklist**

- ✅ **Most DataTable usage remains unchanged** (backward compatible)
- ⚠️ **Remove DataTableLegacy imports** (component deleted)
- ⚠️ **Update CSS imports** if using custom theming
- ⚠️ **Review pagination props** (improved smart defaults)
- ✅ **Enjoy fixed pagination bugs** 🎉

---

## 📦 **What's New in v0.7**

### **✅ Fixed Issues**

- **Issue #60**: AppShell black borders → Now properly theme-aware
- **Issue #61**: DataTable pagination synchronization → Now bulletproof
- **Styling consistency**: All components use proper Shadcn/Tailwind classes
- **CSS architecture**: Robust fallback system prevents black borders

### **🎁 New Features**

- **Enhanced pagination**: Better smart defaults and state management
- **Improved theming**: Bulletproof CSS variable system
- **Better accessibility**: Improved ARIA compliance
- **Comprehensive testing**: 19 test suites covering edge cases

---

## 🔄 **Breaking Changes**

### **1. DataTableLegacy Removed**

**❌ Before (v0.6):**

```typescript
import { DataTableLegacy } from '@etherisc/ui-kit';

// This component no longer exists
<DataTableLegacy
  data={data}
  columns={columns}
  // ... old props
/>
```

**✅ After (v0.7):**

```typescript
import { DataTable } from '@etherisc/ui-kit';

// Use the main DataTable component
<DataTable
  data={data}
  columns={columns}
  // All features now in main component
/>
```

**Migration Steps:**

1. Find all `DataTableLegacy` imports
2. Replace with `DataTable`
3. Review props - most should work unchanged
4. Test pagination functionality

---

## ⚠️ **Behavioral Changes (Improvements)**

### **1. Pagination State Synchronization**

**Before (v0.6):** Pagination dropdown could get out of sync with table state

**After (v0.7):** Pagination always stays synchronized

**🔧 Migration Impact:**

- **No code changes needed** - this is a bug fix
- Your pagination will now work correctly in edge cases
- Page size selector always reflects current state

### **2. Smart Pagination Configuration**

**Before (v0.6):**

```typescript
// pageSize not in pageSizeOptions could cause issues
<DataTable
  data={data}
  columns={columns}
  pageSize={15}
  pagination={{
    pageSizeOptions: [10, 25, 50, 100]  // 15 missing!
  }}
/>
```

**After (v0.7):**

```typescript
// Automatically includes current pageSize in options
<DataTable
  data={data}
  columns={columns}
  pageSize={15}
  pagination={{
    pageSizeOptions: [10, 25, 50, 100]  // 15 auto-added!
  }}
/>
```

**🔧 Migration Impact:**

- **No code changes needed** - this is an improvement
- Your custom page sizes will automatically appear in dropdown
- More robust handling of edge cases

### **3. Table State Management**

**Before (v0.6):** Navigation buttons could fail in some scenarios

**After (v0.7):** All navigation works reliably

**🔧 Migration Impact:**

- **No code changes needed** - this is a bug fix
- First, Previous, Next, Last buttons work consistently
- Page indicators update correctly

---

## 🎨 **CSS & Styling Changes**

### **1. Improved CSS Variable System**

**Before (v0.6):** CSS variables could resolve to black when DaisyUI missing

**After (v0.7):** Bulletproof fallback system

**🔧 Migration for Custom Themes:**

**Check your CSS imports:**

```css
/* ✅ This still works - no changes needed */
@import "@etherisc/ui-kit/dist/style.css";
```

**If you override ui-kit CSS variables:**

```css
/* ✅ Before (still works) */
:root {
  --border: 210 10% 85%;
}

/* ✅ After (enhanced with fallbacks) */
:root {
  --border: 210 10% 85%; /* Your custom value takes precedence */
}
```

### **2. Component CSS Classes**

**Before (v0.6):** Mixed DaisyUI and Shadcn classes

**After (v0.7):** Consistent Shadcn classes throughout

**🔧 Migration Impact:**

- **No changes needed for normal usage**
- If you have custom CSS targeting DataTable, review selectors
- All components now use semantic CSS variables

---

## 🚀 **Non-Breaking Improvements**

### **1. Enhanced API (Backward Compatible)**

All existing DataTable props continue to work:

```typescript
// ✅ All of this still works exactly the same
<DataTable
  data={users}
  columns={userColumns}
  pageSize={25}
  pagination={{
    showNavigation: true,
    showSizeSelector: true,
    pageSizeOptions: [10, 25, 50, 100]
  }}
  sorting={{
    enabled: true,
    multiColumn: false
  }}
  filtering={{
    enabled: true,
    placeholder: "Search users..."
  }}
/>
```

### **2. Better TypeScript Support**

Enhanced type definitions for better IntelliSense:

```typescript
// ✅ Better autocomplete and type checking
const pagination: PaginationConfig = {
  showNavigation: true, // ← Better TypeScript hints
  showSizeSelector: true,
  pageSizeOptions: [10, 25, 50],
};
```

---

## 📋 **Step-by-Step Migration Guide**

### **Step 1: Update Dependencies**

```bash
npm install @etherisc/ui-kit@^0.7.0
# or
pnpm update @etherisc/ui-kit
```

### **Step 2: Find and Replace DataTableLegacy**

```bash
# Search for usage
grep -r "DataTableLegacy" src/

# Replace imports
sed -i 's/DataTableLegacy/DataTable/g' src/**/*.tsx
```

### **Step 3: Test Pagination Features**

```typescript
// ✅ Test these scenarios work correctly now
const testScenarios = [
  { pageSize: 15, pageSizeOptions: [10, 25, 50] }, // Custom size
  { pageSize: 7, pageSizeOptions: [5, 10, 20] }, // Small custom size
  { data: largeDataset, pageSize: 100 }, // Large page size
];
```

### **Step 4: Verify CSS Styling**

```typescript
// ✅ Check theme switching works
const [isDark, setIsDark] = useState(false);

// Toggle and verify no black borders appear
<ThemeProvider theme={isDark ? 'dark' : 'light'}>
  <DataTable data={data} columns={columns} />
</ThemeProvider>
```

### **Step 5: Test Edge Cases**

```typescript
// ✅ These scenarios should now work perfectly
<DataTable
  data={[]}  // Empty data
  columns={columns}
  pageSize={50}
/>

<DataTable
  data={smallDataset}  // Less than one page
  columns={columns}
  pageSize={100}
/>
```

---

## 🧪 **Testing Your Migration**

### **Automated Tests**

```typescript
// ✅ Add these test scenarios
describe('DataTable Migration', () => {
  it('handles pagination dropdown synchronization', () => {
    render(<DataTable data={data} columns={columns} pageSize={15} />);
    // Verify dropdown shows 15 as selected
  });

  it('navigation buttons work correctly', () => {
    render(<DataTable data={largeData} columns={columns} pageSize={10} />);
    // Test First, Previous, Next, Last buttons
  });

  it('handles theme switching without black borders', () => {
    // Test light/dark mode switching
  });
});
```

### **Visual Testing**

1. **Pagination Controls**: All buttons and dropdowns work
2. **Theme Switching**: No black borders in any mode
3. **State Synchronization**: Page indicator matches navigation
4. **Edge Cases**: Empty data, single page, large datasets

---

## 🆘 **Troubleshooting Common Issues**

### **Issue: "DataTableLegacy is not exported"**

```typescript
// ❌ Error
import { DataTableLegacy } from "@etherisc/ui-kit";

// ✅ Solution
import { DataTable } from "@etherisc/ui-kit";
```

### **Issue: "Pagination dropdown not updating"**

This was a bug in v0.6 that's now fixed in v0.7. No code changes needed.

### **Issue: "Black borders appearing"**

This was Issue #60, now resolved. Ensure you're importing the CSS:

```typescript
import "@etherisc/ui-kit/dist/style.css";
```

### **Issue: "Navigation buttons not working"**

This was a bug in v0.6 that's now fixed in v0.7. No code changes needed.

---

## 📞 **Getting Help**

### **Migration Support**

- **GitHub Issues**: Report migration problems
- **Documentation**: Updated component docs with examples
- **Changelog**: Detailed list of all changes

### **Rollback Plan**

If you encounter issues:

```bash
# Temporarily downgrade
npm install @etherisc/ui-kit@^0.6.1

# Report the issue, then upgrade when fixed
npm install @etherisc/ui-kit@^0.7.0
```

---

## 🎉 **Benefits After Migration**

### **Immediate Improvements**

- ✅ **Pagination bugs fixed**: Dropdown synchronization works
- ✅ **Navigation reliability**: All buttons work consistently
- ✅ **Theme robustness**: No more black borders
- ✅ **Better performance**: Optimized re-rendering

### **Long-term Benefits**

- 🚀 **Future-proof**: Modern CSS architecture
- 🎨 **Better theming**: Robust variable system
- 🧪 **Quality assurance**: Comprehensive test coverage
- 📚 **Better docs**: Clear API documentation

---

## 📊 **Change Summary**

| Category            | v0.6             | v0.7             | Migration Effort    |
| ------------------- | ---------------- | ---------------- | ------------------- |
| **DataTable API**   | ✅ Available     | ✅ Enhanced      | 🟢 None             |
| **DataTableLegacy** | ✅ Available     | ❌ Removed       | 🟡 Search & Replace |
| **Pagination**      | ⚠️ Buggy         | ✅ Fixed         | 🟢 None             |
| **CSS Variables**   | ⚠️ Fragile       | ✅ Robust        | 🟢 None             |
| **Theme Switching** | ⚠️ Black borders | ✅ Seamless      | 🟢 None             |
| **Testing**         | ⚠️ Limited       | ✅ Comprehensive | 🟢 None             |

### **Migration Effort Legend**

- 🟢 **None**: Works automatically
- 🟡 **Low**: Simple find/replace
- 🟠 **Medium**: Some code changes
- 🔴 **High**: Significant refactoring

---

**🎯 Most users will have zero migration effort - just update the package and enjoy the fixes!**
