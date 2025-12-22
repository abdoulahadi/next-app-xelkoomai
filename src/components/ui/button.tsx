import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm",
  {
    variants: {
      variant: {
        primary: "text-white hover:opacity-90 active:scale-95 [background:var(--primary)] focus-visible:ring-[var(--primary)]",
        secondary: "text-white hover:opacity-90 active:scale-95 [background:var(--secondary)] focus-visible:ring-[var(--secondary)]",
        destructive: "text-white hover:opacity-90 active:scale-95 [background:var(--error)] focus-visible:ring-[var(--error)]",
        outline: "border-2 bg-transparent hover:text-white [border-color:var(--primary)] [color:var(--primary)] hover:[background:var(--primary)]",
        ghost: "hover:bg-gray-100 text-gray-900",
        link: "underline-offset-4 hover:underline [color:var(--primary)]",
      },
      size: {
        sm: "h-11 px-4 py-2 text-xs min-w-[44px]",
        md: "h-11 px-6 py-3 min-w-[44px]",
        lg: "h-14 px-8 py-4 text-base min-w-[44px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
