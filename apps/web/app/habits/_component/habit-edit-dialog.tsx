import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHabits } from "../_context/habit-context";
import { POSTHabitResponse } from "@/modules/habit/types";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Circle,
  CircleCheck,
  Flame,
  Trash2,
  TrendingUp,
} from "lucide-react";
import {
  completedToday as completedTodayFn,
  computeStreak,
  weekCompleted,
  weekCompletionRate,
  weekDates,
} from "../_utils";
import Habit from "./habit-day";
import { cn } from "@/lib/utils";
import { ContributionGrid } from "./habit-annual-contribution";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

export const HabitCreateSchema = z.object({
  habitName: z.string().min(1, "Habit name is required").max(100),

  categoryId: z.string().min(1, "Category is required"),

  details: z.string().max(500, "Description is too long").optional(),
});

export type HabitCreateDTO = z.infer<typeof HabitCreateSchema>;

function HabitEditDialog({
  open,
  onOpenChange,
  habitData,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  habitData: POSTHabitResponse;
}) {
  const { today, handleToggleHabit, handleDelete, handleUpdate } = useHabits();
  const completedToday = completedTodayFn(habitData);
  const streak = computeStreak(habitData.contributions);
  const jsDay = new Date().getDay();

  const form = useForm<HabitCreateDTO>({
    resolver: zodResolver(HabitCreateSchema),
    defaultValues: {
      habitName: habitData.habitName,
      categoryId: habitData.categoryId,
      details: habitData.details,
    },
    mode: "onChange",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form>
          <DialogContent>
            <DialogHeader>
              <div className='flex items-start justify-between'>
                <div className='flex items-start gap-3 flex-1'>
                  <div className='flex-1'>
                    <DialogTitle className='flex  gap-4 text-xl mb-2 pr-8'>
                      <div
                        className={`w-5 h-5 rounded-full ${completedToday ? "bg-success" : "bg-muted-foreground/30"} mt-1`}
                      />
                      <FormField
                        control={form.control}
                        name='habitName'
                        render={({ field }) => (
                          <input
                            className='text-2xl mb-2'
                            {...field}
                            onBlur={() => {
                              if (field.value !== habitData?.habitName) {
                                handleUpdate({
                                  habitId: habitData.id,
                                  habitName: field.value,
                                });
                              }
                            }}
                          />
                        )}
                      />
                    </DialogTitle>
                    <div className='w-full flex items-center gap-2 flex-wrap'>
                      {/* {habitData.categoryId && (
                        <Badge variant='outline' className='text-xs'>
                          {habitData.category.name}
                        </Badge>
                      )} */}
                      <Badge
                        variant={completedToday ? "default" : "outline"}
                        className={completedToday ? "bg-success" : ""}
                      >
                        {completedToday ? (
                          <>
                            <CircleCheck className='w-3 h-3 mr-1' />
                            Completed Today
                          </>
                        ) : (
                          <>
                            <Circle className='w-3 h-3 mr-1' />
                            Not Yet Completed
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className='space-y-6'>
              {/* Streak & Stats */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='p-4 rounded-lg bg-linear-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Flame className='w-5 h-5 text-orange-500' />
                    <p className='text-sm text-muted-foreground'>
                      Current Streak
                    </p>
                  </div>
                  <p className='text-3xl font-bold'>{streak}</p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    {streak === 1 ? "day" : "days"}
                  </p>
                </div>

                <div className='p-4 rounded-lg bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20'>
                  <div className='flex items-center gap-2 mb-2'>
                    <TrendingUp className='w-5 h-5 text-primary' />
                    <p className='text-sm text-muted-foreground'>This Week</p>
                  </div>
                  <p className='text-3xl font-bold'>
                    {weekCompletionRate(habitData)}%
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    completion rate
                  </p>
                </div>
              </div>

              <div className='justify-end hidden md:flex'>
                <Popover>
                  <div className='flex justify-between'>
                    <PopoverTrigger asChild>
                      <Button>View Annual</Button>
                    </PopoverTrigger>
                  </div>
                  <PopoverContent className='hidden md:flex w-fit p-0 rounded-xl border-none'>
                    <ContributionGrid id={habitData.id} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className='flex gap-2 pointer-events-none'>
                {weekCompleted(habitData).map((d, index) => {
                  const todayIndex = jsDay === 0 ? 6 : jsDay - 1;
                  return (
                    <Habit
                      onClick={() => {
                        handleToggleHabit({
                          habitId: habitData.id,
                          date: weekDates[index]!,
                        });
                      }}
                      className={cn(
                        index >= todayIndex + 1 ? "bg-muted-foreground/10" : "",
                        todayIndex === index ? "border-2 border-red-300" : "",
                      )}
                      key={index}
                      completed={d}
                      completedColor={"bg-success"}
                      disabled={index >= new Date().getDay()}
                    />
                  );
                })}
              </div>

              <div className='p-4 rounded-lg bg-muted/50 border border-border'>
                <p className='text-sm text-muted-foreground mb-2'>
                  Description
                </p>
                <p className='text-sm leading-relaxed'>
                  <FormField
                    control={form.control}
                    name='details'
                    render={({ field }) => (
                      <textarea
                        className='w-full h-20 resize-none'
                        {...field}
                        onBlur={() => {
                          if (field.value !== habitData.details) {
                            handleUpdate({
                              habitId: habitData.id,
                              details: field.value,
                            });
                          }
                        }}
                      />
                    )}
                  />
                </p>
              </div>

              {habitData.createdAt && (
                <div className='text-sm text-muted-foreground flex items-center gap-2'>
                  <Award className='w-4 h-4' />
                  <span>Started on {habitData.createdAt}</span>
                </div>
              )}
            </div>

            <DialogFooter className='gap-2 sm:gap-2'>
              <Button
                variant='outline'
                onClick={() => {
                  handleToggleHabit({
                    habitId: habitData.id,
                    date: today,
                  });
                }}
                className='flex-1'
              >
                {completedToday ? (
                  <>
                    <Circle className='w-4 h-4 mr-2' />
                    Mark Incomplete
                  </>
                ) : (
                  <>
                    <CircleCheck className='w-4 h-4 mr-2' />
                    Mark Complete
                  </>
                )}
              </Button>
              <Button
                onClick={() => {
                  handleDelete(habitData.id);
                }}
                variant='destructive'
              >
                <Trash2 className='w-4 h-4' />
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}

export default HabitEditDialog;
