"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Icons.home,
  },
  {
    title: "Accounts",
    href: "/dashboard/accounts",
    icon: Icons.building,
  },
  {
    title: "Destinations",
    href: "/dashboard/destinations",
    icon: Icons.upload,
  },
  {
    title: "Activity",
    href: "/dashboard/activity",
    icon: Icons.activity,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: Icons.billing,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Icons.settings,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="font-bold text-lg">BSR</span>
        </Link>
      </div>

      <div className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-3 border-t border-border">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icons.user className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Your Account</p>
            <p className="text-xs text-muted-foreground truncate">
              Manage your profile
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
