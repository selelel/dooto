"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  CircleCheck,
  Circle,
  Flame,
  CircleQuestionMark,
  Timer,
} from "lucide-react";
import DashboardHeader from "./_component/dashboard-header";
import StatusCard from "./_component/status-card";
import DashboardTodoCarousel from "./_component/dashboard-todo-carousel";
import { useGetTaskCollection } from "@/modules/tasks/hooks";
import {
  POSTTasksCollectionResponseT,
  TaskStatus,
} from "@/modules/tasks/types";
import { logger } from "@/lib/logger";
import { useGetTimers } from "@/modules/timer/hooks";
import { getTimeSince, hoursToDay } from "./timer/_utils";
import { isCompletedToday } from "./habits/_utils";
import { useGetHabits } from "@/modules/habit/hooks";
import { useGetMoodJournalByDate } from "@/modules/mood-journal/hooks";
import { cn, normalizeDate } from "@/lib/utils";
import { moodEmojis } from "./mood-journal/_utils";
import DashboardHabitList from "./_component/dashboard-habit-list";
import Navigation from "@/components/layout/navigation";
import { TasksProvider, useTasks } from "./tasks/_hooks/useTasks";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
  const today = new Date();
  const { tasksCollection, isTaskCollectionLoading } = useTasks();
  const dateRange = {
    from: normalizeDate(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
    ),
    to: normalizeDate(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    ),
  };
  const { data: timerData } = useGetTimers();
  const { data: todayMoodJournal } = useGetMoodJournalByDate(dateRange);
  const { data: habitsData } = useGetHabits();

  const overAllTaskCount = tasksCollection
    .map((d) => {
      return d.tasks;
    })
    .flat();

  const completedTasks = overAllTaskCount.filter(
    (d) => d.status === TaskStatus.DONE
  ).length; // O(3n)
  logger.trace(completedTasks);

  const totalHoursData = (timerData || [])
    .map((d) => hoursToDay(getTimeSince(new Date(d.lastRelapseAt)).totalHours))
    .reduce((max, hours) => Math.max(max, hours), 0);

  const completedTodayCount = habitsData?.filter(isCompletedToday).length ?? 0;

  const moodJournalData = (todayMoodJournal ?? [])[0];
  const moodConfig = moodJournalData?.mood
    ? moodEmojis[moodJournalData.mood]
    : undefined;

  const Icon = moodConfig?.icon;
  return (
    <Navigation>
      <div>
        <DashboardHeader />
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <StatusCard className='border-l-primary'>
            <div>
              <p className='text-sm text-muted-foreground mb-1'>Tasks Today</p>

              {isTaskCollectionLoading ? (
                <Skeleton className='h-10 w-15' />
              ) : (
                <p className='text-3xl'>
                  {completedTasks}/{overAllTaskCount.length}
                </p>
              )}
            </div>
            <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center'>
              <CircleCheck className='w-6 h-6 text-primary' />
            </div>
          </StatusCard>

          <StatusCard className='border-l-secondary'>
            <div>
              <p className='flex flex-col text-xs text-muted-foreground mb-1'>
                <span>Since Timer </span>
                <span>Longest Streak (days)</span>
              </p>
              <p className='text-3xl'>{totalHoursData}</p>
            </div>
            <div className='w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center'>
              <Timer className='w-6 h-6 text-secondary' />
            </div>
          </StatusCard>

          <StatusCard className='border-l-success'>
            <div>
              <p className='text-sm text-muted-foreground mb-1'>
                Completed Habit
              </p>
              <p className='text-3xl'>
                {completedTodayCount}/{(habitsData || []).length}
              </p>
            </div>
            <div className='w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center'>
              <Flame className='w-6 h-6 text-success' />
            </div>
          </StatusCard>

          <StatusCard className='border-l-accent'>
            <div>
              <p className='text-sm text-muted-foreground mb-1'>Mood Today</p>
              <p className='text-3xl'>
                {moodConfig?.label ? moodConfig?.label : "N / A"}
              </p>
            </div>
            <div
              className={cn(
                "w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center",
                moodConfig?.color,
                moodConfig?.bg
              )}
            >
              {Icon ? <Icon /> : <CircleQuestionMark />}
            </div>
          </StatusCard>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden'>
          <DashboardTodoCarousel />

          {/* Habit Tracker Preview */}
          <DashboardHabitList />
        </div>

        <Card className='mt-6 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 border-0 shadow-sm'>
          <CardContent className='p-6 text-center'>
            <p className='text-lg mb-2'>✨ You're doing amazing!</p>
            <p className='text-muted-foreground'>
              Keep up the great work. Small consistent steps lead to big
              achievements.
            </p>
          </CardContent>
        </Card>
      </div>
    </Navigation>
  );
}

export default function CONTEXTED() {
  return (
    <TasksProvider>
      <Dashboard />
    </TasksProvider>
  );
}
