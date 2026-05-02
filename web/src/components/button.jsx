import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// Fixed: Changed from "@/lib/utils" to relative path to prevent "Module not found"
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "btn",
  {
    variants: {
      variant: {
        default: "btn-primary",
        destructive: "btn-danger",
        outline: "btn-outline",
        secondary: "btn-secondary",
        ghost: "btn-ghost",
        link: "btn-link",
      },
      size: {
        default: "btn-md",
        sm: "btn-sm",
        lg: "btn-lg",
        icon: "btn-icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };