"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useSignInUser } from "@/modules/user/hooks";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/logger";


const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  alwaysSignedIn: z.boolean(),
});

type SignInFormValues = z.infer<typeof formSchema>;

function SignInForm() {
  const router = useRouter();
  const {mutate, data, error} = useSignInUser()
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      alwaysSignedIn: false,
    },
  });

  const onSubmit = (values: SignInFormValues) => {
  mutate(values, {
    onSuccess: (data) => {
      logger.trace("Success response:", data);
      if (data.status === 200) {
        router.push('/');
      }
    },
    onError: (error: any) => {
  let errorMessage = "Unknown error";
  if (error?.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (error?.message) {
    errorMessage = error.message;
  } else {
    errorMessage = String(error);
  }
  form.setError("root", { type: "manual", message: errorMessage });
},
  });
};

  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormControl>
          <UncontrolledFormMessage />
        </FormControl>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jan@email.com"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput className="h-12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alwaysSignedIn"
          render={({ field }) => (
            <FormItem className="">
                <label
                    htmlFor="alwaysSignedIn"
                    className="flex flex-row items-center gap-2 font-semibold text-sm text-gray-400 cursor-pointer"
                >
                    <Checkbox
                        id="alwaysSignedIn"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    Keep me signed in
                </label>
            </FormItem>
          )}
        />

        <Button
          type="submit"
        className="w-full h-12 bg-linear-to-r from-rose-300 to-violet-300 hover:opacity-90 transition-opacity"
        >
          Log in
        </Button>

        <button
          type="button"
          className="font-semibold w-full text-sm text-rose-400 hover:underline"
        >
          Forgotten your password?
        </button>
      </form>
    </Form>
  );
}

export default SignInForm;