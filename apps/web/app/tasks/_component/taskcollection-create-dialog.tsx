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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTasks } from "../_hooks/useTasks";
import { POSTTasksCollectionRequestT } from "@/modules/tasks/types";
import { useRouter } from "next/navigation";
import { ROUTES_CLIENT } from "@/constant/http";

/** Define Zod schema for task collection creation */
const taskCollectionCreateSchema = z.object({
  tasksName: z.string().min(2, {
    message: "List name must be at least 2 characters.",
  }),
  details: z.string().optional(),
});

export type TaskCollectionCreateFormValues = z.infer<
  typeof taskCollectionCreateSchema
>;

interface TaskCollectionCreateDialogProps {
  open: boolean;
  onOpenChange: Dispatch<React.SetStateAction<boolean>>;
}

function TaskCollectionCreateDialog({
  open,
  onOpenChange,
}: TaskCollectionCreateDialogProps) {
  const router = useRouter();
  const { handleCreateTaskCollection } = useTasks();

  const form = useForm<TaskCollectionCreateFormValues>({
    resolver: zodResolver(taskCollectionCreateSchema),
    defaultValues: {
      tasksName: "",
      details: "",
    },
  });

  const handleSubmit = (data: POSTTasksCollectionRequestT) => {
    handleCreateTaskCollection(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Create Task Collection</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new list.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='tasksName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter list name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='details'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input placeholder='List details' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit' disabled={!form.formState.isValid}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskCollectionCreateDialog;
