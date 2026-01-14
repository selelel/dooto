"use client";

import { Toaster } from "sonner";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useServerHealth } from "@/modules/server/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { state: healthState } = useServerHealth();
  const queryClient = new QueryClient();

  useEffect(() => {
    if (healthState === "offline") {
      router.push("/sleeping");
    }
  }, [healthState]);

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster />
    </>
  );
}
