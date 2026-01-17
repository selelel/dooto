import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

export default function NotificationsSection() {
  return (
    <Card
      className='relative mb-6 shadow-sm *:opacity-50 pointer-events-none'
      aria-disabled='true'
    >
      <div className='absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm'>
        <div className='text-center'>
          <p className='text-2xl font-semibold'>Coming Soon</p>
          <p className='mt-1 text-sm text-muted-foreground'>
            Notification settings will be available soon
          </p>
        </div>
      </div>

      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Bell className='w-5 h-5' />
          Notifications
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <NotificationItem
          title='Task Reminders'
          description='Get notified about upcoming tasks'
        />
        <NotificationItem
          title='Habit Reminders'
          description='Daily reminders for your habits'
        />
        <NotificationItem
          title='Focus Session Alerts'
          description='Alerts when timer completes'
        />
        <NotificationItem
          title='Mood Journal Reminder'
          description='Evening reminder to journal'
        />
      </CardContent>
    </Card>
  );
}

function NotificationItem({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className='flex items-center justify-between rounded-lg border border-border p-4'>
      <div>
        <p className='font-medium'>{title}</p>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} disabled />
    </div>
  );
}
