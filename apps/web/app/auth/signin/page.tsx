'use client';

import { useState } from "react";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import SignInForm from "./_component/signin-form";

interface LoginProps {
  onSwitchToRegister: () => void;
  onLogin: () => void;
}

export default function Login({ onSwitchToRegister, onLogin }: LoginProps) {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles color="var(--color-orange-300)" className="w-8 h-8 text-primary" />
                <h1 className="font-semibold text-4xl bg-linear-to-r from-orange-300 via-violet-300 to-teal-300 bg-clip-text text-transparent">
                  Dooto
                </h1>
            </div>
            <p className="text-muted-foreground">
              Welcome back! Let's make today amazing.
            </p>
          </div>

          <SignInForm />

          <div className="mt-8 pt-8 border-t border-border text-center">
            <Button
              onClick={onSwitchToRegister}
              variant="outline"
              className="bg-linear-to-r from-teal-400/10 to-amber-200/10 border-success/20 hover:border-success/40 transition-colors"
            >
              Create new account
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-linear-to-br from-rose-300/30 via-violet-300/10 to-teal-300/10 items-center justify-center p-8">
        <div className="max-w-lg text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-rose-300 to-violet-300 rounded-full flex items-center justify-center shadow-xl">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl bg-linear-to-r from-rose-300 via-violet-300 to-teal-300 bg-clip-text text-transparent">
            Your daily companion for productivity & wellness
          </h2>
          <p className="text-lg text-slate-400">
            Track your tasks, build habits, focus deeply, and celebrate your progress every day.
          </p>
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-rose-300"></div>
            <div className="w-2 h-2 rounded-full bg-violet-300"></div>
            <div className="w-2 h-2 rounded-full bg-teal-300"></div>
            <div className="w-2 h-2 rounded-full bg-amber-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
