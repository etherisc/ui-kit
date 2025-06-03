import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
    color: {
      default: "",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
      accent: "text-accent-foreground",
      success: "text-success-foreground",
      warning: "text-warning-foreground",
      info: "text-info-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "default",
    align: "left",
    weight: "normal",
    truncate: false,
  },
});

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant,
      color,
      align,
      weight,
      truncate,
      asChild = false,
      as,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : as || getDefaultElement(variant);

    return (
      <Component
        className={cn(
          typographyVariants({ variant, color, align, weight, truncate }),
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Typography.displayName = "Typography";

// Helper function to get the default HTML element for each variant
function getDefaultElement(
  variant: string | null | undefined,
): React.ElementType {
  switch (variant) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    case "blockquote":
      return "blockquote";
    case "list":
      return "ul";
    case "inlineCode":
      return "code";
    case "lead":
    case "large":
    case "small":
    case "muted":
    case "p":
    default:
      return "p";
  }
}

// Specific Typography Components
type TypographyHeadingProps = Omit<TypographyProps, "variant">;

const TypographyH1 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="h1"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyH1.displayName = "TypographyH1";

const TypographyH2 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="h2"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyH2.displayName = "TypographyH2";

const TypographyH3 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="h3"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyH3.displayName = "TypographyH3";

const TypographyH4 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="h4"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyH4.displayName = "TypographyH4";

const TypographyH5 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="h5"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyH5.displayName = "TypographyH5";

const TypographyH6 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="h6"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyH6.displayName = "TypographyH6";

const TypographyP = React.forwardRef<
  HTMLParagraphElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="p"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyP.displayName = "TypographyP";

const TypographyBlockquote = React.forwardRef<
  HTMLQuoteElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="blockquote"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyBlockquote.displayName = "TypographyBlockquote";

interface TypographyListProps extends TypographyHeadingProps {
  ordered?: boolean;
}

const TypographyList = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  TypographyListProps
>(({ className, ordered = false, ...props }, ref) => (
  <Typography
    variant="list"
    as={ordered ? "ol" : "ul"}
    className={cn(ordered && "list-decimal", className)}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyList.displayName = "TypographyList";

const TypographyInlineCode = React.forwardRef<
  HTMLElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="inlineCode"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyInlineCode.displayName = "TypographyInlineCode";

const TypographyLead = React.forwardRef<
  HTMLParagraphElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="lead"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyLead.displayName = "TypographyLead";

const TypographyLarge = React.forwardRef<
  HTMLParagraphElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="large"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyLarge.displayName = "TypographyLarge";

const TypographySmall = React.forwardRef<
  HTMLParagraphElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="small"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographySmall.displayName = "TypographySmall";

const TypographyMuted = React.forwardRef<
  HTMLParagraphElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => (
  <Typography
    variant="muted"
    className={className}
    ref={ref as React.Ref<HTMLElement>}
    {...props}
  />
));
TypographyMuted.displayName = "TypographyMuted";

export {
  Typography,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  typographyVariants,
};
