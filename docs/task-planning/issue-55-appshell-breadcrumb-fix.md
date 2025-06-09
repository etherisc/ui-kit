# Task Planning: Issue #55 - Replace AppShell Custom Components with UI-Kit Components

**Issue**: AppShell not using UI-Kit components - renders inconsistent UI elements  
**GitHub Issue**: #55  
**Type**: Major Refactoring  
**Priority**: High  
**Severity**: Medium

## Problem Summary

The AppShell component currently uses custom implementations for all its major components instead of the proper UI-Kit components. This leads to:

### Current Custom Components → UI-Kit Replacements:

1. **Custom `Breadcrumbs`** → `Breadcrumb` component (separator rendering issues)
2. **Custom `SideNav`** → `Sidebar` component (inconsistent styling, missing features)
3. **Custom `TopBar`** → `NavigationMenu` + `DropdownMenu` components (lacks dropdown functionality)

### Issues:

1. Inconsistent styling across the application
2. Potential separator rendering issues in breadcrumbs
3. Duplicate code and maintenance overhead
4. Missing advanced features (ellipsis, proper dropdowns, accessibility)
5. Not utilizing the full ui-kit design system

## Task Breakdown

| Task Description                                                                                                                              | DoD (Definition of Done)                                                                                                                                                                                                                                                                                          | Status      |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| **1. Create AppShellBreadcrumbs wrapper** - Build a new `AppShellBreadcrumbs` component that uses the ui-kit Breadcrumb components internally | - New `AppShellBreadcrumbs.tsx` file created<br/>- Uses ui-kit Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator<br/>- Maintains backward compatibility with existing `BreadcrumbItem[]` prop format<br/>- Component is exported from layout index                  | ✅ Complete |
| **2. Create AppShellSidebar wrapper** - Build a new `AppShellSidebar` component that uses the ui-kit Sidebar components internally            | - New `AppShellSidebar.tsx` file created<br/>- Uses ui-kit Sidebar, SidebarProvider, SidebarContent, SidebarNav, SidebarNavItem<br/>- Maintains backward compatibility with existing `NavItem[]` prop format<br/>- Supports collapsible state and nested navigation<br/>- Component is exported from layout index | ✅ Complete |
| **3. Create AppShellTopBar wrapper** - Build a new `AppShellTopBar` component that uses NavigationMenu and DropdownMenu components            | - New `AppShellTopBar.tsx` file created<br/>- Uses ui-kit NavigationMenu, DropdownMenu components for navigation<br/>- Maintains backward compatibility with existing TopBar props<br/>- Supports dropdown navigation menus<br/>- Component is exported from layout index                                         | ✅ Complete |
| **4. Update AppShell component** - Modify the main AppShell to use the new wrapper components instead of custom ones                          | - AppShell imports new wrapper components<br/>- Old custom component imports removed<br/>- All existing AppShell functionality preserved<br/>- No breaking changes to AppShell public API<br/>- SidebarProvider properly wraps the layout                                                                         | ✅ Complete |
| **5. Update ContentWrapper** - Modify ContentWrapper to use the new AppShellBreadcrumbs component                                             | - ContentWrapper imports new AppShellBreadcrumbs<br/>- Old Breadcrumbs import removed<br/>- All existing functionality preserved<br/>- No breaking changes to ContentWrapper API                                                                                                                                  | ✅ Complete |
| **6. Update exports and cleanup** - Update all relevant index.ts files and remove old custom components                                       | - Old custom components deleted (`SideNav.tsx`, `TopBar.tsx`, `Breadcrumbs.tsx`)<br/>- AppShell index.ts updated to export new components<br/>- All imports throughout codebase updated<br/>- TypeScript compilation passes with no errors                                                                        | ✅ Complete |
| **7. Update tests** - Update existing tests to work with the new components and add additional test coverage                                  | - All existing AppShell tests pass<br/>- New tests added for wrapper components<br/>- Test coverage maintained or improved<br/>- All test suites pass (`pnpm test`)<br/>- Mock adjustments for new ui-kit components                                                                                              | Open        |
| **8. Update Storybook** - Update AppShell stories to demonstrate all functionality works correctly with new components                        | - AppShell stories render correctly<br/>- All navigation, breadcrumb, and sidebar examples work<br/>- New dropdown navigation examples added<br/>- No visual regressions in Storybook<br/>- `pnpm build-storybook` completes successfully                                                                         | Open        |
| **9. Manual testing** - Test the complete AppShell component in the showcase app to ensure all functionality works                            | - Showcase app builds and runs (`pnpm run dev:showcase`)<br/>- Breadcrumbs render with correct separators<br/>- Sidebar collapses/expands correctly<br/>- Navigation dropdowns work<br/>- No console errors<br/>- Visual appearance matches expectations<br/>- Responsive behavior works correctly                | Open        |

## Implementation Notes

### New Wrapper Components Structure

**1. AppShellBreadcrumbs:**

```typescript
// Convert BreadcrumbItem[] to ui-kit Breadcrumb components
export const AppShellBreadcrumbs: React.FC<BreadcrumbsProps> = ({ items, separator }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={`${item.label}-${index}`}>
            {index > 0 && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
            <BreadcrumbItem>
              {item.href && !item.isActive ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
```

**2. AppShellSidebar:**

```typescript
// Convert NavItem[] to ui-kit Sidebar components
export const AppShellSidebar: React.FC<AppShellSidebarProps> = ({
  items, collapsed, onCollapseToggle, ...props
}) => {
  return (
    <SidebarProvider defaultCollapsed={collapsed} onCollapsedChange={onCollapseToggle}>
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav>
            {items.map(item => (
              <SidebarNavItem key={item.id} icon={item.icon} isActive={item.isActive}>
                {item.label}
              </SidebarNavItem>
            ))}
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};
```

**3. AppShellTopBar:**

```typescript
// Enhanced TopBar with NavigationMenu support
export const AppShellTopBar: React.FC<AppShellTopBarProps> = ({
  logo, navigationItems, userActions, dropdownMenus, ...props
}) => {
  return (
    <header className="...">
      {logo}
      {navigationItems && (
        <NavigationMenu>
          <NavigationMenuList>
            {/* Render navigation items with dropdown support */}
          </NavigationMenuList>
        </NavigationMenu>
      )}
      {userActions}
    </header>
  );
};
```

### Benefits of This Approach

1. **Consistency**: Uses the same ui-kit components used throughout the application
2. **Maintainability**: Single source of truth for component styling and behavior
3. **Features**: Inherits all ui-kit component features (proper separators, dropdowns, accessibility, etc.)
4. **Backward Compatibility**: Existing AppShell usage remains unchanged
5. **Enhanced Functionality**: Adds dropdown navigation menus and improved sidebar behavior
6. **Better Accessibility**: Benefits from ui-kit's WCAG compliance
7. **Responsive Design**: Inherits responsive behavior from ui-kit components

## Testing Strategy

1. **Unit Tests**: Test all new wrapper components behavior individually
2. **Integration Tests**: Verify AppShell works correctly with all new components
3. **Visual Tests**: Ensure Storybook stories render correctly with new functionality
4. **Accessibility Tests**: Verify WCAG compliance is maintained
5. **Manual Testing**: Test complete functionality in showcase application

## Success Criteria

- ✅ AppShell uses ui-kit components internally (Breadcrumb, Sidebar, NavigationMenu)
- ✅ All existing AppShell functionality preserved
- ✅ Breadcrumb separators render correctly (no ">/" issues)
- ✅ Sidebar collapsing/expanding works with ui-kit Sidebar
- ✅ Navigation supports dropdown menus
- ✅ All tests pass
- ✅ No breaking changes to public API
- ✅ Code is cleaner and more maintainable
- ✅ Enhanced accessibility and responsive behavior
