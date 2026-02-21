import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  const variants = {
    default: "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-primary/40",
    outline: "border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
    ghost: "text-gray-300 hover:text-white hover:bg-white/5",
    secondary: "bg-white/10 text-white hover:bg-white/20",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-11 px-6 py-2 text-sm",
    sm: "h-9 px-4 text-xs",
    lg: "h-12 px-8 text-base",
    xl: "h-14 px-10 text-lg",
    icon: "h-10 w-10",
  }

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
