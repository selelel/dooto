'use client'; 

import { Toaster } from "sonner";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function CustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
      <Toaster />
    </>
  );
}
