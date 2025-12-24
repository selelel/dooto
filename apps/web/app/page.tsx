'use client';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CircleCheck, Circle, Flame, Smile, Timer } from "lucide-react";
import DashboardHeader from "./_component/dashboard-header";
import StatusCard from "./_component/status-card";
import DashboardTodoCarousel from "./_component/dashboard-todo-carousel";
import { useGetTaskCollection } from "@/modules/tasks/hooks";
import { POSTTasksCollectionResponseT, TaskStatus } from "@/modules/tasks/types";
import { logger } from "@/lib/logger";

export default function Dashboard() {
  const query = useGetTaskCollection();
  const taskCollection: POSTTasksCollectionResponseT[] = query.data?.data || [];
  
  const habits = [
    { id: 1, name: "Drink water", streak: 12, completedToday: true, color: "bg-chart-3" },
    { id: 2, name: "Exercise", streak: 5, completedToday: false, color: "bg-chart-1" },
    { id: 3, name: "Read", streak: 8, completedToday: true, color: "bg-chart-2" },
  ];

  const overAllTaskCount = taskCollection.map((d) => {
    return d.tasks
  }).flat()

  const completedTasks = overAllTaskCount.filter((d) => d.status === TaskStatus.DONE).length // O(3n)
  logger.trace(completedTasks)
  
  return (
    <div>
      <DashboardHeader />
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatusCard className="border-l-primary">
            <div>
                  <p className="text-sm text-muted-foreground mb-1">Tasks Today</p>
                  <p className="text-3xl">{completedTasks}/{overAllTaskCount.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CircleCheck className="w-6 h-6 text-primary" />
              </div>
        </StatusCard>

        <StatusCard className="border-l-secondary">
           <div>
                <p className="text-sm text-muted-foreground mb-1">Focus Time</p>
                <p className="text-3xl">2h 15m</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Timer className="w-6 h-6 text-secondary" />
              </div>
        </StatusCard>

        <StatusCard className="border-l-success">
              <div>
                  <p className="text-sm text-muted-foreground mb-1">Habit Streak</p>
                  <p className="text-3xl">12 days</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-success" />
              </div>
        </StatusCard>

        <StatusCard className="border-l-accent">
            <div>
                <p className="text-sm text-muted-foreground mb-1">Mood Today</p>
                <p className="text-3xl">Great!</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Smile className="w-6 h-6 text-accent-foreground" />
              </div>
        </StatusCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
       <DashboardTodoCarousel query={query} />

        {/* Habit Tracker Preview */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Daily Habits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 rounded-xl bg-linear-to-r from-muted/50 to-transparent border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${habit.color}`} />
                  <div>
                    <p className="font-medium">{habit.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-muted-foreground">
                        {habit.streak} day streak
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    habit.completedToday
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {habit.completedToday ? (
                    <CircleCheck className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full mt-4">
              View All Habits
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 border-0 shadow-sm">
        <CardContent className="p-6 text-center">
          <p className="text-lg mb-2">✨ You're doing amazing!</p>
          <p className="text-muted-foreground">
            Keep up the great work. Small consistent steps lead to big achievements.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}