/**
 * AppShell layout constants
 */

// Breakpoints in pixels
export const BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1440,
};

// Layout dimensions in pixels
export const DIMENSIONS = {
    TOPBAR_HEIGHT: {
        DESKTOP: 64,
        TABLET: 56,
        MOBILE: 48,
    },
    SIDENAV_WIDTH: {
        EXPANDED: 240,
        COLLAPSED: 64,
    },
    FIXED_CONTENT_MAX_WIDTH: 960,
};

// LocalStorage key for persisting sidebar collapsed state
export const STORAGE_KEYS = {
    SIDENAV_COLLAPSED: 'ui-kit-sidenav-collapsed',
}; 