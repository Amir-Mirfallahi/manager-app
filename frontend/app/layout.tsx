import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DisableZoom } from "@/components/disable-zoom";

const vazirmatnSans = Vazirmatn({
  variable: "--font-vazirmatn-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Taskflow AI | تسک فلو",
  description: "کارات رو بسپر دست ما!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatnSans.variable} antialiased`}
      >
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
        </ThemeProvider>

      </body>
    </html>
  );
}
