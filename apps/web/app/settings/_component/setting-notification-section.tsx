import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

export default function NotificationsSection() {
  return (
    <Card className='mb-6 shadow-sm'>
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
          defaultChecked
        />
        <NotificationItem
          title='Habit Reminders'
          description='Daily reminders for your habits'
          defaultChecked
        />
        <NotificationItem
          title='Focus Session Alerts'
          description='Alerts when timer completes'
          defaultChecked
        />
        <NotificationItem
          title='Mood Journal Reminder'
          description='Evening reminder to journal'
          defaultChecked
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
    <div className='flex items-center justify-between p-4 rounded-lg border border-border'>
      <div>
        <p className='font-medium'>{title}</p>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
