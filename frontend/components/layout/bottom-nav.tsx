"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, LayoutDashboard, User, LucideIcon } from "lucide-react";

// 1. Define the items here, INSIDE the client-side file
const NAV_ITEMS = [
  { label: "چت", href: "/chat", icon: MessageSquare },
  { label: "برنامه‌ها", href: "/", icon: LayoutDashboard },
  { label: "پروفایل", href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background pb-safe-area-inset-bottom z-50">
      <div className="flex h-16 items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors flex-1 h-full
                ${
                  isActive
                    ? "text-primary border-t-3 border-primary scale-125"
                    : "text-muted-foreground hover:text-primary"
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}