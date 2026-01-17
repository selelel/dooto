import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

export default function ProfileSection() {
  return (
    <Card className='mb-6 shadow-sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='w-5 h-5' />
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center gap-6'>
          <Avatar className='w-20 h-20'>
            <AvatarFallback className='bg-linear-to-br from-primary to-secondary text-white text-2xl'>
              JS
            </AvatarFallback>
          </Avatar>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              placeholder='Your name'
              defaultValue='Jamie Smith'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='your@email.com'
              defaultValue='jamie@example.com'
            />
          </div>
        </div>

        <Button className='bg-primary hover:bg-primary/90'>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
