'use client';
import { ROUTES_CLIENT } from '@/constant/http';
import { logger } from '@/lib/logger';
import { BookHeart, LayoutDashboard, Palette, Settings, SquareCheck, Target, Timer } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

function Navigation({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: ROUTES_CLIENT.PRIVATE.HOME },
  { id: "tasks", label: "Tasks", icon: SquareCheck, path: ROUTES_CLIENT.PRIVATE.TASKS },
  { id: "timer", label: "Focus Timer", icon: Timer, path: ROUTES_CLIENT.PRIVATE.TIMER },
  { id: "habits", label: "Habit Tracker", icon: Target, path: ROUTES_CLIENT.PRIVATE.HABITS },
  { id: "mood", label: "Mood Journal", icon: BookHeart, path: ROUTES_CLIENT.PRIVATE.MOOD },
  { id: "settings", label: "Settings", icon: Settings, path: ROUTES_CLIENT.PRIVATE.SETTINGS },
];

  const publicRoutes = Object.values(ROUTES_CLIENT.PUBLIC)

  return (
     <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar Navigation */}
      {!publicRoutes.includes(pathname) && <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="font-semibold text-2xl bg-linear-to-r from-primary via-secondary to-success bg-clip-text text-transparent">
            Dooto
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your daily companion
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === item.path
                  ? "bg-orange-50 text-orange-600 shadow-sm"
                  : "text-sidebar-foreground hover:bg-rose-50/50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">
              "Every small step forward is progress worth
              celebrating."
            </p>
          </div>
        </div>
      </aside>}

      <div className='p-8 w-full max-w-9/12 mx-auto overflow-y-auto scrollbar-hide'>
        {children}
      </div>
    </div>
  );
}

export default Navigation;