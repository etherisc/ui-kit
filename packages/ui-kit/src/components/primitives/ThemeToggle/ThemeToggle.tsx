import { useTheme } from "../../../hooks/useTheme";
import { cn } from "../../../utils";

// Define the shape of the useTheme hook return value
type UseThemeHook = ReturnType<typeof useTheme>;

export interface ThemeToggleProps {
  /**
   * Additional class names to apply to the toggle
   */
  className?: string;

  /**
   * Callback when theme is toggled
   */
  onToggle?: (isDarkMode: boolean) => void;

  /**
   * Size of the toggle button
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Hook to use for theme state (for testing purposes)
   * @internal
   */
  useThemeHook?: () => UseThemeHook;
}

/**
 * A toggle button that allows users to switch between light and dark modes
 */
export function ThemeToggle({
  className,
  onToggle,
  size = "md",
  useThemeHook = useTheme,
}: ThemeToggleProps) {
  const { isDarkMode, toggleDarkMode } = useThemeHook();

  const handleToggle = () => {
    toggleDarkMode();
    if (onToggle) {
      onToggle(!isDarkMode); // Pass the new state
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "rounded-md border border-input bg-transparent text-foreground shadow-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        isDarkMode
          ? "text-primary-content bg-primary"
          : "text-foreground bg-muted",
        sizeClasses[size],
        className,
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      )}
    </button>
  );
}
