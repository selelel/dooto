import type { Metadata } from "next";
import "../globals.css";
import { Geist } from "next/font/google";
import Navigation from "@/components/layout/navigation";
import CustomLayout from "../__layout__";

export const metadata: Metadata = {
  title: "Habits",
  description: "Drink water bud",
};

const geist = Geist({
  subsets: ["latin", "cyrillic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Navigation>{children}</Navigation>;
}
