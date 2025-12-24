'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { logger } from '@/lib/logger'
import {
  useCreateTask,
  useDeleteTask,
  useGetTaskCollectionById,
  usePatchTask,
  usePatchTasksCollection,
} from '@/modules/tasks/hooks'
import { Task, TaskStatus } from '@/modules/tasks/types'
import { Plus, Calendar, Trash2, Circle, CircleCheck } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import TaskCreateDialog, {
  TaskCreateFormValues,
} from './task-create-dialog'
import StatusCard from '@/app/_component/status-card'
import { Form, FormField } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { QueryKeys } from '@/constant/queryKeys'
import { useQueryClient } from '@tanstack/react-query'
import useTasksList from '../_hooks/useTasksList'
import TaskHeader from './task-header'
import TaskRow from './task-row'
import TaskSection from './task-section'
import StatsGrid from './task0-stats-grid'

function TasksList() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [dialog, setOpenDialog] = useState(false)
  const {
    tasks,
    taskCollectionData,
    handleToggleStatus,
    handleDeleteTask,
    handleCreateTask,
    patchTaskCollection,
    queryClient,
  } = useTasksList(id)

  const form = useForm({
    defaultValues: {
      taskName: '',
      details: '',
    },
  })

  // Reset form values when collection data changes
  useEffect(() => {
    if (taskCollectionData) {
      form.reset({
        taskName: taskCollectionData.tasksName,
        details: taskCollectionData.details,
      })
    }
  }, [taskCollectionData, form])

  const inProgress = tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS)
  const pending = tasks.filter((t) => t.status === TaskStatus.PENDING)
  const completed = tasks.filter((t) => t.status === TaskStatus.DONE)

  return (
    <>
      <TaskCreateDialog open={dialog} onOpenChange={setOpenDialog} onSubmit={handleCreateTask} />

      <div>
        <TaskHeader
          form={form}
          taskCollectionData={taskCollectionData}
          patchTaskCollection={patchTaskCollection}
          queryClient={queryClient}
          id={id}
          onOpenDialog={() => setOpenDialog(true)}
        />

        <StatsGrid
          inProgress={inProgress.length}
          pendingTasks={pending.length}
          completedTasks={completed.length}
          total={tasks.length}
        />

        {inProgress.length > 0 && (
          <TaskSection id={TaskStatus.IN_PROGRESS} title="In Progress Tasks">
            {inProgress.map((task) => (
              <TaskRow
                key={task.taskId}
                task={task}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteTask}
              />
            ))}
          </TaskSection>
        )}

        {pending.length > 0 && (
          <TaskSection id={TaskStatus.PENDING} title="Pending Tasks">
            {pending.map((task) => (
              <TaskRow
                key={task.taskId}
                task={task}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteTask}
              />
            ))}
          </TaskSection>
        )}

        {completed.length > 0 && (
          <TaskSection id={TaskStatus.DONE} title="Completed Tasks">
            {completed.map((task) => (
              <TaskRow
                key={task.taskId}
                task={task}
                faded
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteTask}
              />
            ))}
          </TaskSection>
        )}

        {tasks.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Circle className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl mb-2">No tasks</h3>
              <p className="text-muted-foreground">Start adding tasks to stay organized</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}

export default TasksList
