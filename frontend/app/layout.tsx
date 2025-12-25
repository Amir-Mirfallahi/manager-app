import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DisableZoom } from "@/components/disable-zoom";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Taskflow AI | تسک فلو",
  description: "کارات رو بسپر دست ما!",
  creator: "Amir Mirfallahi",
  keywords: ["task", "ai", "schedule"],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased font-vazirmatn pb-12">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
        </head>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DisableZoom />
          {children}
          <BottomNav />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
