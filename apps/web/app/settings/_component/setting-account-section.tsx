"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES_CLIENT } from "@/constant/http";
import { useSignOut } from "@/modules/user/hooks";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountSection() {
  const router = useRouter();
  const { mutate: signOut } = useSignOut();

  const handleSignOut = () => {
    signOut(undefined, {
      onSuccess() {
        router.push(ROUTES_CLIENT.PUBLIC.SIGNIN);
      },
    });
  };
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
          <Button onClick={handleSignOut} variant='outline' className='gap-2'>
            <LogOut className='w-4 h-4' />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
