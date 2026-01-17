"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMe, useUpdateUser } from "@/modules/user/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
});

type UserUpdateInput = z.infer<typeof userUpdateSchema>;

export default function ProfileSection() {
  const { mutate: updateUser, data: updatedUser } = useUpdateUser();
  const { data, isLoading } = useGetMe();

  const form = useForm<UserUpdateInput>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: data?.user.name || "",
      username: data?.user.username || "",
      email: data?.user.email || "",
    },
  });

  useEffect(() => {
    if (updatedUser) {
      form.reset({
        name: updatedUser.user.name,
        username: updatedUser.user.username,
        email: updatedUser.user.email,
      });
    } else if (data) {
      form.reset({
        name: data.user.name,
        username: data.user.username,
        email: data.user.email,
      });
    }
  }, [data, updatedUser, form]);

  const onSubmit = (data: UserUpdateInput) => {
    updateUser(data, {
      onSuccess() {
        toast.success("Profile updated successfully", {
          description: "Your changes have been saved.",
        });
      },
      onError(error: any) {
        toast.error(
          `Failed to update profile: ${error?.message || "Unknown error"}`
        );
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='mb-6 shadow-sm'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='w-5 h-5' />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col md:flex-row md:items-center md:gap-8 mb-6'>
              {isLoading ? (
                <Skeleton className='w-24 h-24 rounded-full mx-auto md:mx-0' />
              ) : (
                <Avatar className='w-24 h-24 mx-auto md:mx-0'>
                  <AvatarFallback className='bg-linear-to-br from-primary to-secondary text-white text-3xl font-bold'>
                    {data?.user.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "JS"}
                  </AvatarFallback>
                </Avatar>
              )}

              <div className='mt-6 md:mt-0 flex-1 grid grid-cols-1 md:grid-cols-2 gap-6'>
                {isLoading ? (
                  <>
                    <Skeleton className='h-12 rounded-md' />
                    <Skeleton className='h-12 rounded-md' />
                    <Skeleton className='h-12 rounded-md md:col-span-2' />
                  </>
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='Your full name' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='username'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='Your username' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type='email'
                              placeholder='you@example.com'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            </div>

            <Button
              type='submit'
              className='bg-primary hover:bg-primary/90 w-full md:w-auto'
              disabled={isLoading}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
