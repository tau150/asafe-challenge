import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/utils/styles";

const errorVariants = cva("flex items-center p-4 rounded-md", {
  variants: {
    variant: {
      error: "bg-destructive/15 text-destructive",
      warning: "bg-warning/15 text-warning",
      info: "bg-info/15 text-info",
    },
    size: {
      default: "text-sm",
      large: "text-base",
    },
  },
  defaultVariants: {
    variant: "error",
    size: "default",
  },
});

const iconMap = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export interface ErrorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorVariants> {
  title?: string;
  description: string;
}

const Error = React.forwardRef<HTMLDivElement, ErrorProps>(
  ({ className, variant, size, title, description, ...props }, ref) => {
    const IconComponent = iconMap[variant || "error"];

    return (
      <div
        ref={ref}
        className={cn(errorVariants({ variant, size, className }))}
        role="alert"
        {...props}
      >
        <IconComponent aria-hidden="true" className="h-5 w-5 mr-3 flex-shrink-0" />
        <div>
          {title && (
            <h3 className={cn("font-semibold", size === "large" ? "text-lg" : "text-base")}>
              {title}
            </h3>
          )}
          <p className={cn("text-current", size === "large" ? "text-base" : "text-sm")}>
            {description}
          </p>
        </div>
      </div>
    );
  },
);

Error.displayName = "Error";

export { Error, errorVariants };
