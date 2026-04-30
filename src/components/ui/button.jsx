import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  const variants = {
    default: "bg-stone-900 text-white hover:bg-primary",
    outline: "border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white",
    ghost: "text-stone-700 hover:text-stone-900 hover:bg-stone-900/5",
    secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200 border border-stone-200",
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
        "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
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
