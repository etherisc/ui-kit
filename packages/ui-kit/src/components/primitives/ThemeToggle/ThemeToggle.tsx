import { Sun, Moon } from "lucide-react";
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
        "rounded-full p-2 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isDarkMode
          ? "text-primary-content bg-primary"
          : "text-base-content bg-base-200",
        sizeClasses[size],
        className,
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
