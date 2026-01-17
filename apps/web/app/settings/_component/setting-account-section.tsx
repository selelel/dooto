import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";

export default function AccountSection() {
  return (
    <Card className='shadow-sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <LogOut className='w-5 h-5' />
          Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='p-4 rounded-lg border border-border'>
          <p className='font-medium mb-2'>Sign Out</p>
          <p className='text-sm text-muted-foreground mb-4'>
            Sign out of your BrightSide account
          </p>
          <Button variant='outline' className='gap-2'>
            <LogOut className='w-4 h-4' />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
