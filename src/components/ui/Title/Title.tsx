import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/styles";

const titleVariants = cva("font-bold leading-tight tracking-tight", {
  variants: {
    size: {
      default: "text-3xl md:text-4xl",
      large: "text-4xl md:text-5xl lg:text-6xl",
      small: "text-2xl md:text-3xl",
    },
    color: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
    } as const,
    alignment: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "default",
    color: "default",
    alignment: "left",
  },
});

export interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    Omit<VariantProps<typeof titleVariants>, "color"> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: "default" | "primary" | "secondary";
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, size, color, alignment, as = "h1", ...props }, ref) => {
    const Comp = as;

    return (
      <Comp
        ref={ref}
        className={cn(titleVariants({ size, color, alignment, className }))}
        {...props}
      />
    );
  },
);

Title.displayName = "Title";

export { Title, titleVariants };
