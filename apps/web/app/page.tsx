import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CircleCheck, Circle, Flame, Smile, Timer } from "lucide-react";
import { Progress } from "../components/ui/progress";

export default function Dashboard() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tasks = [
    { id: 1, text: "Morning meditation", completed: true },
    { id: 2, text: "Review project proposal", completed: false },
    { id: 3, text: "Team meeting at 2pm", completed: false },
    { id: 4, text: "Work on design mockups", completed: false },
  ];

  const habits = [
    { id: 1, name: "Drink water", streak: 12, completedToday: true, color: "bg-chart-3" },
    { id: 2, name: "Exercise", streak: 5, completedToday: false, color: "bg-chart-1" },
    { id: 3, name: "Read", streak: 8, completedToday: true, color: "bg-chart-2" },
  ];

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <div className="p-8 w-full max-w-9/12 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Good morning! ☀️</h1>
        <p className="text-muted-foreground">{today}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tasks Today</p>
                <p className="text-3xl">{completedTasks}/{tasks.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CircleCheck className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Focus Time</p>
                <p className="text-3xl">2h 15m</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Timer className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Habit Streak</p>
                <p className="text-3xl">12 days</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Flame className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Mood Today</p>
                <p className="text-3xl">Great!</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Smile className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Today's Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm">{completedTasks} of {tasks.length} completed</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {task.completed ? (
                    <CircleCheck className="w-5 h-5 text-success shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                  <span
                    className={task.completed ? "line-through text-muted-foreground" : ""}
                  >
                    {task.text}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Circle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground mb-2">No tasks yet</p>
                <p className="text-sm text-muted-foreground">
                  Add your first task to get started!
                </p>
              </div>
            )}

            <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
              View All Tasks
            </Button>
          </CardContent>
        </Card>

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

      {/* Motivational Message */}
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