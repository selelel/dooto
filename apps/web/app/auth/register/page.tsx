'use client';
import { useState } from "react";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RegisterForm from "./_component/register-form";

interface RegisterProps {
  onSwitchToLogin: () => void;
  onRegister: () => void;
}

export default function Register({ onSwitchToLogin, onRegister }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just proceed to the app
    onRegister();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-linear-to-br from-teal-300/20 via-amber-300/20 to-rose-300/20 items-center justify-center p-8">
        <div className="max-w-lg text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-teal-300 to-amber-300 rounded-full flex items-center justify-center shadow-xl">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl bg-linear-to-r from-teal-300 via-amber-300 to-violet-300 bg-clip-text text-transparent">
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
              <Sparkles className="w-8 h-8 text-teal-300" />
              <h1 className="text-4xl bg-linear-to-r from-teal-300 via-amber-300 to-violet-300 bg-clip-text text-transparent">
                BrightSide
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
              onClick={onSwitchToLogin}
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
