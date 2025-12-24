import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Task, TaskStatus } from "@/modules/tasks/types"
import { CircleCheck, Circle, Calendar, Trash2 } from "lucide-react"

const StatusIconRender = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.DONE:
      return <CircleCheck className="text-success" />
    case TaskStatus.IN_PROGRESS:
      return <Circle className="animate-pulse text-primary" />
    case TaskStatus.PENDING:
    default:
      return <Circle className="text-muted-foreground" />
  }
}

export default function TaskRow({
  task,
  faded = false,
  onToggleStatus,
  onDelete,
}: {
  task: Task
  faded?: boolean
  onToggleStatus: (task: Task) => void
  onDelete: (taskId: string) => void
}) {
  return (
    <div
      onClick={() => onToggleStatus(task)}
      className={`flex items-center gap-3 p-4 rounded-xl border transition ${
        faded ? 'opacity-60' : ''
      }`}
    >
      {StatusIconRender(task.status)}

      <div className="flex-1">
        <p className={task.status === TaskStatus.DONE ? 'line-through text-muted-foreground' : ''}>
          {task.taskName}
        </p>
        <p className={cn(task.status === TaskStatus.DONE ? 'line-through text-muted-foreground' : '', 'text-xs')}>
          {task.details}
        </p>

        {task.due && (
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.due).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(task.taskId)
        }}
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </Button>
    </div>
  )
}