import type { ButtonProps as ShadcnButtonProps } from "@/components/ui/button";

export interface ButtonProps
  extends Omit<ShadcnButtonProps, "variant" | "size"> {
  /**
   * The visual style of the button
   */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  /**
   * The size of the button
   */
  size?: "default" | "sm" | "lg" | "icon";
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
}
