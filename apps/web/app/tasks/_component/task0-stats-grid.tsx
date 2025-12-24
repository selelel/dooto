import StatusCard from "@/app/_component/status-card"
import { TaskStatus } from "@/modules/tasks/types"

export default function StatsGrid({
  inProgress,
  pendingTasks,
  completedTasks,
  total,
}: {
  inProgress: number
  pendingTasks: number
  completedTasks: number
  total: number
}) {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto">
      <Stat title="In Progress" value={inProgress} color="primary" id={TaskStatus.IN_PROGRESS} />
      <Stat title="Not Started" value={pendingTasks} color="secondary" id={TaskStatus.PENDING} />
      <Stat title="Completed" value={completedTasks} color="success" id={TaskStatus.DONE} />
      <Stat title="Total" value={total} color="accent" id="TOTAL" />
    </div>
  )
}

function Stat({
  title,
  value,
  color,
  id,
}: {
  title: string
  value: number
  color: string
  id: string
}) {
  const handleClick = () => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div onClick={handleClick} className={`cursor-pointer`}>
      <StatusCard className={`border-l-${color} hover:opacity-60`}>
        <p className="text-3xl">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </StatusCard>
    </div>
  )
}