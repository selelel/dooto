import type { Metadata } from "next";
import "./globals.css";
import CustomLayout from "./__layout__";
import { Geist } from 'next/font/google'
import Navigation from "@/components/layout/navigation";
export const metadata: Metadata = {
  title: "Dooto",
  description: "Make every moment count",
};

const geist = Geist({
  subsets: ['latin', 'cyrillic'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} `}>
         <CustomLayout>
          <Navigation>
            {children}
          </Navigation>
            
         </CustomLayout>
         {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
