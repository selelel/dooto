import type { Metadata } from "next";
import "../globals.css";
import { Geist } from "next/font/google";
import Navigation from "@/components/layout/navigation";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Bro, do the task.",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Navigation>{children}</Navigation>;
}
