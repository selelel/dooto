"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Palette, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  // We need mounted state to avoid hydration mismatch flash
  const [mounted, setMounted] = useState(false);

  // Only run after component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Consider system preference as "system" theme
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handleToggle = () => {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // Prevent flash / wrong initial render during hydration
  if (!mounted) {
    return (
      <Card className='mb-6 shadow-sm'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Palette className='w-5 h-5' />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center justify-between p-4 rounded-lg border border-border opacity-50'>
            <div>
              <p className='font-medium'>Dark Mode</p>
              <p className='text-sm text-muted-foreground'>
                Switch to dark theme
              </p>
            </div>
            <div className='h-6 w-11' /> {/* placeholder for switch */}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='mb-6 shadow-sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Palette className='w-5 h-5' />
          Appearance
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center justify-between p-4 rounded-lg border border-border'>
          <div className='flex items-center gap-3'>
            {isDark ? (
              <Moon className='h-5 w-5 text-primary' />
            ) : (
              <Sun className='h-5 w-5 text-amber-500' />
            )}
            <div>
              <p className='font-medium'>
                {isDark ? "Dark Mode" : "Light Mode"}
              </p>
              <p className='text-sm text-muted-foreground'>
                {isDark ? "Current theme: Dark" : "Current theme: Light"}
              </p>
            </div>
          </div>
          <Switch
            checked={isDark}
            onCheckedChange={handleToggle}
            aria-label='Toggle dark mode'
          />
        </div>
      </CardContent>
    </Card>
  );
}
