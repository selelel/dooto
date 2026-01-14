"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskStatus } from "@/modules/tasks/types";
import { Circle } from "lucide-react";
import TaskCreateDialog from "./task-create-dialog";
import { useForm } from "react-hook-form";
import TaskHeader from "./task-header";
import TaskRow from "./task-row";
import TaskSection from "./task-section";
import StatsGrid from "./task-stats-grid";
import { useTasks } from "../_hooks/useTasks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

function TasksList({ id }: { id: string }) {
  const [dialog, setOpenDialog] = useState(false);
  const [openCollectionDialog, setOpenCollectionDialog] = useState(false);
  const {
    getTaskCollectionById,
    handleCreateTaskCollection,
    isCreatingTaskLoading,
  } = useTasks();
  const taskCollectionData = getTaskCollectionById(id)!;
  const tasks = taskCollectionData?.tasks || [];

  const collectionForm = useForm({
    defaultValues: {
      tasksName: "",
      details: "",
    },
  });

  const inProgress = tasks?.filter((t) => t.status === TaskStatus.IN_PROGRESS);
  const pending = tasks?.filter((t) => t.status === TaskStatus.PENDING);
  const completed = tasks?.filter((t) => t.status === TaskStatus.DONE);

  return (
    <>
      <TaskCreateDialog
        open={dialog}
        onOpenChange={setOpenDialog}
        data={taskCollectionData!}
      />

      <Dialog
        open={openCollectionDialog}
        onOpenChange={setOpenCollectionDialog}
      >
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Create your first task list</DialogTitle>
            <DialogDescription>
              Give your list a name to get started.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={collectionForm.handleSubmit((data) => {
              handleCreateTaskCollection(data);
              setOpenCollectionDialog(false);
              collectionForm.reset();
            })}
            className='space-y-4'
          >
            <Input
              placeholder='List name'
              {...collectionForm.register("tasksName", { required: true })}
            />

            <Input
              placeholder='Details (optional)'
              {...collectionForm.register("details")}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {!!id && !!taskCollectionData ? (
        <div>
          <TaskHeader
            data={taskCollectionData}
            onOpenDialog={() => setOpenDialog(true)}
          />

          <StatsGrid
            inProgress={inProgress.length}
            pendingTasks={pending.length}
            completedTasks={completed.length}
            total={tasks.length}
          />

          {inProgress.length > 0 && (
            <TaskSection id={TaskStatus.IN_PROGRESS} title='In Progress Tasks'>
              {inProgress.map((task) => (
                <TaskRow key={task.taskId} task={task} />
              ))}
            </TaskSection>
          )}

          {isCreatingTaskLoading || pending.length > 0 ? (
            <TaskSection id={TaskStatus.PENDING} title='Pending Tasks'>
              {pending.map((task) => (
                <TaskRow key={task.taskId} task={task} />
              ))}
              {isCreatingTaskLoading && (
                <Skeleton className='w-full h-15 bg-slate-500/10' />
              )}
            </TaskSection>
          ) : (
            <></>
          )}

          {completed.length > 0 && (
            <TaskSection id={TaskStatus.DONE} title='Completed Tasks'>
              {completed.map((task) => (
                <TaskRow key={task.taskId} task={task} faded />
              ))}
            </TaskSection>
          )}

          {tasks.length === 0 && !isCreatingTaskLoading ? (
            <Card>
              <CardContent className='py-16 text-center'>
                <Circle className='w-16 h-16 text-muted-foreground/30 mx-auto mb-4' />
                <h3 className='text-xl mb-2'>No tasks</h3>
                <p className='text-muted-foreground'>
                  Start adding tasks to stay organized
                </p>
              </CardContent>
            </Card>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className='py-20 text-center space-y-4'>
            <Circle className='w-16 h-16 text-muted-foreground/30 mx-auto' />
            <h3 className='text-xl font-semibold'>No task lists found</h3>
            <p className='text-muted-foreground'>
              Create your first task list to get started.
            </p>
            <Button onClick={() => setOpenCollectionDialog(true)}>
              Create your first list
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default TasksList;
