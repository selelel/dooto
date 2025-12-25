"use client";

import React, { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/modules/tasks/types";
import { logger } from "@/lib/logger";
import useTasksList from "../_hooks/useTasksList";

/** Define your Zod schema for task creation */
const taskSchema = z.object({
  taskName: z.string().min(2, {
    message: "Task name must be at least 2 characters.",
  }),
  details: z.string().optional(),
  due: z.date().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskDialogProps {
  open: boolean;
  onOpenChange: Dispatch<React.SetStateAction<boolean>>;
  task: Task;
}

function TaskDialog({ open, onOpenChange, task }: TaskDialogProps) {
  const { handlePatchTasks } = useTasksList(task.taskId);
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: task.taskName,
      details: task.details || "",
      due: new Date(task.due)!,
    },
  });
  logger.info(task);

  const handleSubmit = (data: TaskFormValues) => {
    console.log(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          <DialogContent className='sm:max-w-lg'>
            <DialogHeader>
              <FormField
                control={form.control}
                name='taskName'
                render={({ field }) => (
                  <DialogTitle>
                    <input
                      className='w-full'
                      {...field}
                      onBlur={() => {
                        if (field.value !== task?.taskName) {
                          handlePatchTasks({
                            taskId: task.taskId!,
                            taskName: field.value,
                          });
                        }
                      }}
                    />
                  </DialogTitle>
                )}
              />
              <FormField
                control={form.control}
                name='details'
                render={({ field }) => (
                  <DialogDescription>
                    <input
                      className='w-full'
                      {...field}
                      onBlur={() => {
                        if (field.value !== task.details) {
                          handlePatchTasks({
                            taskId: task.taskId!,
                            details: field.value,
                          });
                        }
                      }}
                    />
                  </DialogDescription>
                )}
              />
            </DialogHeader>

            <FormField
              control={form.control}
              name='due'
              render={({ field }) => {
                const date = field.value ?? undefined;

                return (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          className={`w-full justify-start text-left ${
                            !date ? "text-muted-foreground" : ""
                          }`}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {date ? date.toLocaleDateString() : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={date}
                          onSelect={(selectedDate) => {
                            field.onChange(selectedDate ?? undefined);
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. pending, in-progress, done" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}

export default TaskDialog;
