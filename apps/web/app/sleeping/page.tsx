"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Cloud,
  Zap,
  Coffee,
  Sun,
  Sparkles,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useServerHealth } from "@/modules/server/hooks";

export default function ServerWakingUp() {
  const estimatedTime = 50;
  const health = useServerHealth();
  const router = useRouter();

  // States
  const [timeRemaining, setTimeRemaining] = useState(estimatedTime);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"waking" | "ready">("waking");
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    { icon: Coffee, label: "Starting services...", color: "text-primary" },
    { icon: Zap, label: "Initializing database...", color: "text-secondary" },
    { icon: Cloud, label: "Connecting systems...", color: "text-success" },
    { icon: Sparkles, label: "Almost there...", color: "text-accent" },
  ];

  // Countdown timer for waking phase
  useEffect(() => {
    if (status !== "waking") return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  // Progress bar updates
  useEffect(() => {
    if (status !== "waking") return;

    const progressPercent =
      ((estimatedTime - timeRemaining) / estimatedTime) * 100;
    setProgress(Math.min(progressPercent, 95)); // Cap at 95% until ready
  }, [timeRemaining, estimatedTime, status]);

  // Phase progression updates
  useEffect(() => {
    if (status !== "waking") return;

    const phaseInterval = estimatedTime / phases.length;
    const newPhase = Math.min(
      Math.floor((estimatedTime - timeRemaining) / phaseInterval),
      phases.length - 1
    );
    setCurrentPhase(newPhase);
  }, [timeRemaining, estimatedTime, phases.length, status]);

  // React to server health state changes
  useEffect(() => {
    if (health.state === "online" && status !== "ready") {
      setStatus("ready");
      setProgress(100);
      router.replace("/");
    }
  }, [health.state, router, status]);

  // Format seconds to mm:ss or seconds
  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const CurrentPhaseIcon = phases[currentPhase]!.icon;

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-secondary/5 p-4'>
      <div className='w-full max-w-2xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='text-center mb-8'>
            <motion.div
              animate={{
                scale: status === "ready" ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: status === "ready" ? 0 : Infinity,
                repeatDelay: 1,
              }}
              className='inline-block'
            >
              {status === "ready" ? (
                <div className='w-24 h-24 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center'>
                  <CheckCircle2 className='w-12 h-12 text-success' />
                </div>
              ) : (
                <div className='w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative'>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className='absolute inset-0 border-4 border-transparent border-t-primary rounded-full'
                  />
                  <CurrentPhaseIcon
                    className={`w-12 h-12 ${phases[currentPhase]!.color}`}
                  />
                </div>
              )}
            </motion.div>

            <motion.div
              key={status}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className='text-3xl md:text-4xl mb-3'>
                {status === "ready"
                  ? "We're Ready! 🎉"
                  : "Waking Up Your Workspace ☀️"}
              </h1>
              <p className='text-muted-foreground text-lg mb-4'>
                {status === "ready"
                  ? "Your BrightSide workspace is now available"
                  : "Our servers are starting up to serve you better"}
              </p>
            </motion.div>

            {status === "waking" && (
              <Badge
                variant='outline'
                className='bg-primary/5 border-primary/20 text-primary'
              >
                <RefreshCw className='w-3 h-3 mr-2 animate-spin' />
                {phases[currentPhase]!.label}
              </Badge>
            )}
          </div>

          {/* Progress Section */}
          {status !== "ready" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='space-y-6'
            >
              {/* Progress Bar */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Progress</span>
                  <span className='font-medium'>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className='h-3' />
              </div>

              {/* Time Estimate */}
              <div className='p-4 rounded-lg bg-linear-to-br from-accent/10 to-accent/5 border border-accent/20'>
                <div className='flex items-center justify-center gap-3'>
                  <Sun className='w-5 h-5 text-accent' />
                  <div className='text-center'>
                    <p className='text-sm text-muted-foreground mb-1'>
                      Estimated time remaining
                    </p>
                    <p className='text-2xl font-semibold text-foreground'>
                      {formatTime(timeRemaining)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Ready State */}
          {status === "ready" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className='space-y-6'
            >
              <div className='p-6 rounded-lg bg-linear-to-br from-success/10 to-success/5 border border-success/20'>
                <p className='text-center text-foreground'>
                  Redirecting you to your workspace...
                </p>
              </div>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className='mt-8 pt-8 border-t border-border'
          >
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
              <div className='space-y-1'>
                <div className='w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center'>
                  <Coffee className='w-5 h-5 text-primary' />
                </div>
                <p className='text-sm font-medium'>First Time?</p>
                <p className='text-xs text-muted-foreground'>
                  Servers sleep when idle to save energy
                </p>
              </div>
              <div className='space-y-1'>
                <div className='w-10 h-10 mx-auto rounded-lg bg-success/10 flex items-center justify-center'>
                  <Zap className='w-5 h-5 text-success' />
                </div>
                <p className='text-sm font-medium'>Fast Next Time</p>
                <p className='text-xs text-muted-foreground'>
                  Instant access once warmed up
                </p>
              </div>
              <div className='space-y-1'>
                <div className='w-10 h-10 mx-auto rounded-lg bg-secondary/10 flex items-center justify-center'>
                  <Sparkles className='w-5 h-5 text-secondary' />
                </div>
                <p className='text-sm font-medium'>Worth the Wait</p>
                <p className='text-xs text-muted-foreground'>
                  Your productivity awaits!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Reassurance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className='mt-6 text-center'
          >
            <p className='text-xs text-muted-foreground'>
              This typically takes {estimatedTime} seconds. Thanks for your
              patience! 💙
            </p>
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <div className='fixed inset-0 pointer-events-none overflow-hidden'>
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className='absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl'
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className='absolute bottom-20 right-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl'
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className='absolute top-1/2 left-1/4 w-24 h-24 bg-success/5 rounded-full blur-2xl'
          />
        </div>
      </div>
    </div>
  );
}
