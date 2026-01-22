import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Dooto",
  description: "Make every moment count",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function SleepingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
