import { ButtonProps as ShadcnButtonProps } from "@/components/ui/button";

export interface ButtonProps
  extends Omit<ShadcnButtonProps, "variant" | "size"> {
  /**
   * The visual style of the button
   * @deprecated Use 'variant' instead. Will be removed in v0.5.0
   */
  intent?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "ghost"
    | "link";
  /**
   * The visual style of the button
   */
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
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
