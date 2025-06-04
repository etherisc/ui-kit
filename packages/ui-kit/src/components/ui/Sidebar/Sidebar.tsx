import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../button";

const sidebarVariants = cva(
  "relative flex h-full flex-col bg-background border-r transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-background",
        ghost: "bg-transparent border-none",
      },
      size: {
        default: "w-64",
        sm: "w-48",
        lg: "w-80",
        icon: "w-16",
      },
      position: {
        left: "left-0",
        right: "right-0 border-l border-r-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "left",
    },
  },
);

const sidebarContentVariants = cva(
  "flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
  {
    variants: {
      padding: {
        default: "p-4",
        sm: "p-2",
        lg: "p-6",
        none: "p-0",
      },
    },
    defaultVariants: {
      padding: "default",
    },
  },
);

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined,
);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  defaultOpen?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  onOpenChange?: (open: boolean) => void;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  defaultCollapsed = false,
  defaultOpen = true,
  onCollapsedChange,
  onOpenChange,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCollapsedChange = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onCollapsedChange?.(collapsed);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed: handleCollapsedChange,
        isOpen,
        setIsOpen: handleOpenChange,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsible?: boolean;
  overlay?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      variant,
      size,
      position,
      collapsible = true,
      overlay = false,
      children,
      ...props
    },
    ref,
  ) => {
    const { isCollapsed, isOpen, isMobile, setIsOpen } = useSidebar();

    const shouldShow = isMobile ? isOpen : true;
    const currentSize = isCollapsed && collapsible ? "icon" : size;

    const handleOverlayClick = React.useCallback(() => {
      setIsOpen(false);
    }, [setIsOpen]);

    return (
      <>
        {/* Mobile overlay */}
        {isMobile && isOpen && overlay && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={handleOverlayClick}
          />
        )}

        {/* Sidebar */}
        <div
          ref={ref}
          className={cn(
            sidebarVariants({ variant, size: currentSize, position }),
            isMobile && "fixed z-50",
            isMobile &&
              position === "left" &&
              (isOpen ? "translate-x-0" : "-translate-x-full"),
            isMobile &&
              position === "right" &&
              (isOpen ? "translate-x-0" : "translate-x-full"),
            !shouldShow && !isMobile && "hidden",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </>
    );
  },
);
Sidebar.displayName = "Sidebar";

interface SidebarTriggerProps extends React.ComponentProps<typeof Button> {
  position?: "inside" | "outside";
}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  (
    {
      className,
      position = "inside",
      variant = "ghost",
      size = "icon",
      children,
      ...props
    },
    ref,
  ) => {
    const { isCollapsed, setIsCollapsed, isOpen, setIsOpen, isMobile } =
      useSidebar();

    const handleClick = () => {
      if (isMobile) {
        setIsOpen(!isOpen);
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "h-8 w-8",
          position === "outside" &&
            "absolute -right-3 top-4 z-10 border bg-background shadow-md",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {children || (
          <>
            {isMobile ? (
              isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )
            ) : isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </>
        )}
      </Button>
    );
  },
);
SidebarTrigger.displayName = "SidebarTrigger";

interface SidebarContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarContentVariants> {}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, padding, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(sidebarContentVariants({ padding }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
SidebarContent.displayName = "SidebarContent";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between p-4 border-b",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("p-4 border-t mt-auto", className)} {...props}>
      {children}
    </div>
  );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <nav ref={ref} className={cn("space-y-1", className)} {...props}>
      {children}
    </nav>
  );
});
SidebarNav.displayName = "SidebarNav";

interface SidebarNavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  asChild?: boolean;
}

const SidebarNavItem = React.forwardRef<HTMLDivElement, SidebarNavItemProps>(
  (
    { className, icon, isActive, disabled, asChild, children, ...props },
    ref,
  ) => {
    const { isCollapsed } = useSidebar();

    const Component = asChild ? React.Fragment : "div";
    const content = (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive && "bg-accent text-accent-foreground",
          disabled && "opacity-50 pointer-events-none",
          isCollapsed && "justify-center px-2",
          className,
        )}
        {...props}
      >
        {icon && (
          <span className={cn("flex-shrink-0", isCollapsed && "mx-auto")}>
            {icon}
          </span>
        )}
        {!isCollapsed && <span className="truncate">{children}</span>}
        {isCollapsed && <span className="sr-only">{children}</span>}
      </div>
    );

    return asChild ? content : Component && content;
  },
);
SidebarNavItem.displayName = "SidebarNavItem";

export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  useSidebar,
  sidebarVariants,
};
