import { ReactNode } from "react";

/**
 * Props for the DataDenseLayout component
 */
export interface DataDenseLayoutProps {
  /**
   * Main content of the layout
   */
  children: ReactNode;

  /**
   * Compact header content (e.g., toolbar, filters)
   */
  header?: ReactNode;

  /**
   * Compact footer content (e.g., pagination, status)
   */
  footer?: ReactNode;

  /**
   * Left sidebar for filters, navigation, or tools
   */
  sidebar?: ReactNode;

  /**
   * Right sidebar for details, actions, or metadata
   */
  rightSidebar?: ReactNode;

  /**
   * Density level for spacing and sizing
   * @default 'normal'
   */
  density?: "compact" | "normal" | "comfortable";

  /**
   * Whether to show borders between sections
   * @default true
   */
  showBorders?: boolean;

  /**
   * Whether the header should be sticky
   * @default true
   */
  stickyHeader?: boolean;

  /**
   * Whether the footer should be sticky
   * @default false
   */
  stickyFooter?: boolean;

  /**
   * Whether sidebars should be collapsible
   * @default true
   */
  collapsibleSidebars?: boolean;

  /**
   * Initial collapsed state of left sidebar
   * @default false
   */
  leftSidebarCollapsed?: boolean;

  /**
   * Initial collapsed state of right sidebar
   * @default false
   */
  rightSidebarCollapsed?: boolean;

  /**
   * Callback when left sidebar collapse state changes
   */
  onLeftSidebarToggle?: (collapsed: boolean) => void;

  /**
   * Callback when right sidebar collapse state changes
   */
  onRightSidebarToggle?: (collapsed: boolean) => void;

  /**
   * Width of the left sidebar when expanded
   * @default 280
   */
  leftSidebarWidth?: number;

  /**
   * Width of the right sidebar when expanded
   * @default 320
   */
  rightSidebarWidth?: number;

  /**
   * Width of collapsed sidebars
   * @default 48
   */
  collapsedSidebarWidth?: number;

  /**
   * Optional additional class name for the root container
   */
  className?: string;

  /**
   * Optional additional class name for the content area
   */
  contentClassName?: string;

  /**
   * Optional additional class name for the header
   */
  headerClassName?: string;

  /**
   * Optional additional class name for the footer
   */
  footerClassName?: string;
}
