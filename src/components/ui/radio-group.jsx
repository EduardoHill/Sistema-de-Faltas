import * as React from "react"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, value, onValueChange, children, ...props }, ref) => {
  return (
    <div
      className={cn("grid gap-2", className)}
      role="radiogroup"
      {...props}
      ref={ref}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onSelect: () => onValueChange && onValueChange(child.props.value)
          })
        }
        return child
      })}
    </div>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(({ className, children, value, checked, onSelect, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {checked && (
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      )}
    </button>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }

