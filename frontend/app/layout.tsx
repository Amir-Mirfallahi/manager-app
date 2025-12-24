import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatnSans = Vazirmatn({
  variable: "--font-vazirmatn-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "منیجر | manager",
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
        {children}
      </body>
    </html>
  );
}
