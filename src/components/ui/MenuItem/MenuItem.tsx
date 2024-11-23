import * as React from "react";
import { cn } from "@/utils/styles";

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  icon?: React.ReactNode;
}

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ className, children, icon, isActive, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `${isActive ? "bg-accent-foreground text-accent" : ""} `,
          "flex items-center p-2 rounded-md text-sm cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground",
          className,
        )}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </div>
    );
  },
);

MenuItem.displayName = "MenuItem";

export { MenuItem };
