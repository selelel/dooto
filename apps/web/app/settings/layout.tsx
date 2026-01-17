import type { Metadata } from "next";
import "../globals.css";
import { Geist } from "next/font/google";
import Navigation from "@/components/layout/navigation";

export const metadata: Metadata = {
  title: "Settings",
  description: "Some called this Diary, I won't argue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Navigation>{children}</Navigation>;
}
