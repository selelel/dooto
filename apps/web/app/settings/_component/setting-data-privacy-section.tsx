import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function DataPrivacySection() {
  return (
    <Card className='mb-6 shadow-sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Download className='w-5 h-5' />
          Data & Privacy
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='p-4 rounded-lg border border-border'>
          <p className='font-medium mb-2'>Export Your Data</p>
          <p className='text-sm text-muted-foreground mb-4'>
            Download all your tasks, habits, and journal entries
          </p>
          <Button variant='outline'>Export Data</Button>
        </div>

        <div className='p-4 rounded-lg border border-destructive/50 bg-destructive/5'>
          <p className='font-medium mb-2 text-destructive'>Delete Account</p>
          <p className='text-sm text-muted-foreground mb-4'>
            Permanently delete your account and all associated data
          </p>
          <Button variant='destructive'>Delete Account</Button>
        </div>
      </CardContent>
    </Card>
  );
}
