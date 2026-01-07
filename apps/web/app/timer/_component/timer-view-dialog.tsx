import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { POSTTimerResponse } from "@/modules/timer/types";
import { Label } from "@radix-ui/react-label";
import {
  Badge,
  TimerIcon,
  Clock,
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  RotateCcw,
  Edit2,
  Trash2,
} from "lucide-react";
import React from "react";
import { useSinceTimer } from "../_hooks/use-since-timer";
import { Button } from "@/components/ui/button";
import { formatHours, secondsToHours } from "../_utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form, FormField } from "@/components/ui/form";
import { useTimer } from "../_context/timer-context";

export const TimerSchema = z.object({
  habitName: z.string().min(1, "Habit name is required").max(100),
  details: z.string().max(500, "Description is too long").optional(),
});

export type TimerFormT = z.infer<typeof TimerSchema>;

function TimerViewDialog({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: POSTTimerResponse;
}) {
  const { handleUpdateTimer, handleRelapseTimer, handleDeleteTimer } =
    useTimer();
  const form = useForm<TimerFormT>({
    resolver: zodResolver(TimerSchema),
    defaultValues: {
      habitName: data.habitName,
      details: data.details,
    },
    mode: "onChange",
  });

  const { days, hours, minutes, seconds, totalHours } = useSinceTimer(
    new Date(data.lastRelapseAt)
  );
  const totalHoursFormatted = formatHours(totalHours);

  const longestHours = secondsToHours(data.longestStreakSeconds ?? 0);
  const longestHoursFormatted =
    longestHours > 0 ? formatHours(longestHours) : totalHoursFormatted;

  const predefinedMilestones = [7, 14, 30, 60, 90, 180, 365];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg max-h-5/6 overflow-y-auto scrollbar-hide'>
        <Form {...form}>
          <form>
            <DialogHeader>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex items-start gap-3 flex-1'>
                  <div
                    className={`w-5 h-5 rounded-full bg-success border-2 border-success mt-1`}
                  />
                  <div className='flex-1'>
                    <DialogTitle className='text-xl mb-2 pr-8'>
                      <FormField
                        control={form.control}
                        name='habitName'
                        render={({ field }) => (
                          <input
                            className='text-2xl mb-2'
                            {...field}
                            onBlur={() => {
                              if (field.value !== data?.habitName) {
                                handleUpdateTimer({
                                  id: data.id,
                                  habitName: field.value,
                                });
                              }
                            }}
                          />
                        )}
                      />
                    </DialogTitle>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className='space-y-6'>
              <div
                className={`p-6 rounded-lg bg-linear-to-br bg-success/50 border border-success`}
              >
                <div className='text-center'>
                  <div className='flex items-center justify-center gap-2 mb-2'>
                    <TimerIcon className={`w-6 h-6`} />
                    <p className='text-sm text-muted-foreground'>
                      Time Since Last
                    </p>
                  </div>
                  {days > 0 ? (
                    <>
                      <div className='text-5xl font-bold'>{days}</div>
                      <div className='text-xl text-muted-foreground mt-1'>
                        {days === 1 ? "Day" : "Days"}
                      </div>
                      <div className='text-xl font-bold'>
                        {hours}h {minutes}m {seconds}s
                      </div>
                    </>
                  ) : hours > 0 ? (
                    <>
                      <div className='text-5xl font-bold'>
                        {hours}h {minutes}m {seconds}s
                      </div>
                      <div className='text-xl text-muted-foreground mt-1'>
                        Hours
                      </div>
                    </>
                  ) : minutes > 0 ? (
                    <>
                      <div className='text-5xl font-bold'>
                        {minutes}m {seconds}s
                      </div>
                      <div className='text-xl text-muted-foreground mt-1'>
                        Minutes
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='text-5xl font-bold'>{seconds}s</div>
                      <div className='text-xl text-muted-foreground mt-1'>
                        Seconds
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='p-4 rounded-lg bg-muted/50 border border-border'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Clock className='w-4 h-4 text-muted-foreground' />
                    <p className='text-xs text-muted-foreground'>Total Time</p>
                  </div>
                  <p className='text-2xl font-bold'>{totalHoursFormatted}</p>
                </div>

                <div className='p-4 rounded-lg bg-muted/50 border border-border'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Calendar className='w-4 h-4 text-muted-foreground' />
                    <p className='text-xs text-muted-foreground'>
                      Longest Streak
                    </p>
                  </div>
                  <p className='text-2xl font-bold'>{longestHoursFormatted}</p>
                </div>
              </div>

              {/* Milestones */}
              <div>
                <Label className='mb-3 flex items-center gap-2'>
                  <Trophy className='w-4 h-4' />
                  Milestones
                </Label>
                <div className='grid grid-cols-3 gap-2'>
                  {predefinedMilestones.slice(0, 6).map((milestone) => {
                    const reached = days >= milestone;
                    return (
                      <div
                        key={milestone}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          reached
                            ? `${"bg-success"} ${"border-success"} ${"-success"}`
                            : "border-border bg-muted/30 opacity-50"
                        }`}
                      >
                        <div className='text-lg font-bold'>{milestone}</div>
                        <div className='text-[10px] text-muted-foreground'>
                          {milestone === 1 ? "day" : "days"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              {data.details && (
                <div className='p-4 rounded-lg bg-muted/50 border border-border'>
                  <p className='text-sm text-muted-foreground mb-2'>Notes</p>
                  <p className='text-sm leading-relaxed'>
                    <FormField
                      control={form.control}
                      name='details'
                      render={({ field }) => (
                        <textarea
                          className='w-full mb-2 resize-none'
                          {...field}
                          onBlur={() => {
                            if (field.value !== data?.details) {
                              handleUpdateTimer({
                                id: data.id,
                                details: field.value,
                              });
                            }
                          }}
                        />
                      )}
                    />
                  </p>
                </div>
              )}
            </div>

            <DialogFooter className='gap-2 sm:gap-2 mt-10'>
              <Button
                onClick={() => {
                  handleRelapseTimer(data.id);
                }}
                variant='outline'
                className='flex-1'
              >
                <RotateCcw className='w-4 h-4 mr-2' />
                Reset
              </Button>
              <Button
                onClick={() => {
                  handleDeleteTimer(data.id);
                }}
                variant='destructive'
              >
                <Trash2 className='w-4 h-4' />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TimerViewDialog;
