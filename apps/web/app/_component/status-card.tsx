import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

function StatusCard({children, className}: {children: ReactNode, className: string}) {
  return (
    <Card className={cn("border-l-4 shadow-sm", className)}>
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                {children}
            </div>
        </CardContent>
    </Card>
  )
}

export default StatusCard