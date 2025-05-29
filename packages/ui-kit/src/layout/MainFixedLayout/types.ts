import { ReactNode } from "react";

/**
 * Props for the MainFixedLayout component
 */
export interface MainFixedLayoutProps {
  /**
   * Main content of the layout
   */
  children: ReactNode;

  /**
   * Fixed header content (e.g., navigation, toolbar)
   */
  header?: ReactNode;

  /**
   * Fixed footer content
   */
  footer?: ReactNode;

  /**
   * Fixed sidebar content (left side)
   */
  sidebar?: ReactNode;

  /**
   * Fixed right sidebar content
   */
  rightSidebar?: ReactNode;

  /**
   * Whether the header should be fixed at the top
   * @default true
   */
  fixedHeader?: boolean;

  /**
   * Whether the footer should be fixed at the bottom
   * @default true
   */
  fixedFooter?: boolean;

  /**
   * Whether the sidebar should be fixed
   * @default true
   */
  fixedSidebar?: boolean;

  /**
   * Whether the right sidebar should be fixed
   * @default true
   */
  fixedRightSidebar?: boolean;

  /**
   * Header height in pixels (used for content offset)
   * @default 64
   */
  headerHeight?: number;

  /**
   * Footer height in pixels (used for content offset)
   * @default 64
   */
  footerHeight?: number;

  /**
   * Sidebar width in pixels
   * @default 256
   */
  sidebarWidth?: number;

  /**
   * Right sidebar width in pixels
   * @default 256
   */
  rightSidebarWidth?: number;

  /**
   * Whether content should have padding
   * @default true
   */
  contentPadding?: boolean;

  /**
   * Optional additional class name for the root container
   */
  className?: string;

  /**
   * Optional additional class name for the content area
   */
  contentClassName?: string;
}
