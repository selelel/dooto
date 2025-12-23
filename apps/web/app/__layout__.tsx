'use client'; 

import { Toaster, useSonner } from "sonner";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function CustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Soner = useSonner()
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
