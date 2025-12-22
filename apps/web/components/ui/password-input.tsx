import * as React from "react"
import { Input } from "./input"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

function PasswordInput({ className, type, ...props }: React.ComponentProps<"input">) {
   const [showPassword, setShowPassword] = useState(false)
    return (<div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    className={cn(className, '')}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                    ) : (
                    <Eye className="w-5 h-5" />
                    )}
                </button>
            </div>
        )
}

export { PasswordInput }
