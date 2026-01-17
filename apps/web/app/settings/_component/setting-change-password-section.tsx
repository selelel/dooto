"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Key } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { useUpdateUser } from "@/modules/user/hooks";
import { toast } from "sonner";

const passwordChangeSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;

export default function ChangePasswordSection() {
  const { mutate: updateUser, data: updatedUser } = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<PasswordChangeInput>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: PasswordChangeInput) => {
    updateUser(
      { password: data.newPassword },
      {
        onSuccess() {
          toast.success("Password updated successfully", {
            description: "Your changes have been saved.",
          });
          setIsEditing(false);
        },
        onError(error: any) {
          toast.error(
            `Failed to update profile: ${error?.message || "Unknown error"}`
          );
        },
      }
    );
  };

  return (
    <Card className='mb-6 shadow-sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Key className='w-5 h-5' />
          Change Password
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!isEditing ? (
          <div className='flex items-center justify-between rounded-lg border border-border p-4'>
            <div>
              <p className='font-medium'>
                To keep your account secure, regularly update your password.
              </p>
              <p className='text-sm text-muted-foreground'>
                If you are not, lazy.
              </p>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              className='whitespace-nowrap'
            >
              Change Password
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-gray-700'>
                      New Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        type='password'
                        placeholder='Enter a new password'
                        {...field}
                        className='mt-1'
                      />
                    </FormControl>
                    <FormMessage className='text-red-600 text-sm mt-1' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-gray-700'>
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        type='password'
                        placeholder='Confirm your new password'
                        {...field}
                        className='mt-1'
                      />
                    </FormControl>
                    <FormMessage className='text-red-600 text-sm mt-1' />
                  </FormItem>
                )}
              />

              <div className='flex justify-end space-x-4 pt-4 border-t border-gray-200'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  className='bg-primary hover:bg-primary/90 font-semibold text-white'
                >
                  Update Password
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
