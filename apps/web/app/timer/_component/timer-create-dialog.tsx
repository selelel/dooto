import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { useTimer } from "../_context/timer-context";

export const createTimerSchema = z.object({
  habitName: z
    .string()
    .min(2, "Habit name must be at least 2 characters")
    .max(50, "Habit name is too long"),
  details: z.string().max(300, "Description is too long"),
});

export type CreateTimerSchema = z.infer<typeof createTimerSchema>;

function TimerCreateDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { handleCreateTimer } = useTimer();
  const form = useForm<CreateTimerSchema>({
    resolver: zodResolver(createTimerSchema),
    mode: "onChange",
    defaultValues: {
      habitName: "",
      details: "",
    },
  });

  const onSubmit = (d: CreateTimerSchema) => {
    onOpenChange(false);
    handleCreateTimer(d);
    form.reset();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Create New Timer</DialogTitle>
          <DialogDescription>
            Create a timer to track how long it's been since you last performed
            an action.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              name='habitName'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timer Name *</FormLabel>
                  <Input
                    placeholder='e.g., Morning meditation, Exercise, Read...'
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='details'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <Textarea
                    rows={3}
                    className='resize-none'
                    placeholder='Add notes about this habit...'
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='gap-2'>
              <Button
                variant='outline'
                type='button'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={!form.formState.isValid}>
                Create Habit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TimerCreateDialog;
