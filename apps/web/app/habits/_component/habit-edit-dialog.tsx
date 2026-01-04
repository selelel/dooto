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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetCategory } from "@/modules/user/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHabits } from "../_context/habit-context";

export const HabitCreateSchema = z.object({
  habitName: z.string().min(1, "Habit name is required").max(100),

  categoryId: z.string().min(1, "Category is required"),

  details: z.string().max(500, "Description is too long").optional(),
});

export type HabitCreateDTO = z.infer<typeof HabitCreateSchema>;
function HabitCreateDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { handleCreateHabit } = useHabits();
  const { data } = useGetCategory();

  const form = useForm<HabitCreateDTO>({
    resolver: zodResolver(HabitCreateSchema),
    defaultValues: {
      habitName: "",
      categoryId: "",
      details: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: HabitCreateDTO) => {
    // handleCreateHabit(data); // 👈 naming already matches backend
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Create New Habit</DialogTitle>
          <DialogDescription>
            Start building a new positive habit
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Habit Name */}
            <FormField
              name='habitName'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit Name *</FormLabel>
                  <Input
                    placeholder='e.g., Morning meditation, Exercise, Read...'
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              name='categoryId'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {(data?.categories || []).map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Details */}
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
                type='button'
                variant='outline'
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

export default HabitCreateDialog;
