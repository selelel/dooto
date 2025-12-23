'use client';
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegisterForm from "./_component/register-form";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
        <div className="min-h-screen w-full flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-linear-to-br from-success/10 via-accent/10 to-primary/10 items-center justify-center p-8">
        <div className="max-w-lg text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-success to-accent rounded-full flex items-center justify-center shadow-xl">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl bg-linear-to-r from-success via-accent to-secondary bg-clip-text text-transparent">
            Start your journey to better productivity
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands who are building better habits, achieving their goals, and celebrating small wins every day.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8 text-left">
            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl mb-1">✓</p>
              <p className="text-sm">Track your tasks & goals</p>
            </div>
            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl mb-1">✓</p>
              <p className="text-sm">Build lasting habits</p>
            </div>
            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl mb-1">✓</p>
              <p className="text-sm">Focus with Pomodoro</p>
            </div>
            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl mb-1">✓</p>
              <p className="text-sm">Journal your mood</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-8 h-8 text-success" />
              <h1 className="font-semibold text-4xl bg-linear-to-r from-success via-accent to-secondary bg-clip-text text-transparent">
                Dooto
              </h1>
            </div>
            <p className="text-muted-foreground">
              Create your account and start building better habits today.
            </p>
          </div>

          <RegisterForm />

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Already have an account?
            </p>
              <Button
                onClick={() => router.push("/auth/signin")}
                variant="outline"
                className="bg-linear-to-r from-rose-300/10 to-violet-300/10 border-rose-300/20 hover:border-rose-300/40 transition-colors"
              >
                Log in
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
