import type { Metadata } from "next";
import "../globals.css";
import Navigation from "@/components/layout/navigation";

export const metadata: Metadata = {
  title: "Mood Journal",
  description: "Some called this Diary, I won't argue.",
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
