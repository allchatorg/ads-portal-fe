import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: LucideIcon
    children: React.ReactNode
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
    ({ className, children, icon: Icon, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                className={cn(
                    "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200",
                    className
                )}
                {...props}
            >
                {children}
                {Icon && <Icon className="w-4 h-4 ml-2" />}
            </Button>
        )
    }
)
ActionButton.displayName = "ActionButton"

export { ActionButton }
