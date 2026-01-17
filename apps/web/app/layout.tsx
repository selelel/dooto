import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import CustomLayout from "./__layout__";
export const metadata: Metadata = {
  title: "Dooto",
  description: "Make every moment count",
};

const geist = Geist({
  subsets: ["latin", "cyrillic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geist.className} `}>
        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
  );
}
