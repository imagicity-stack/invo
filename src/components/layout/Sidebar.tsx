"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  Briefcase,
  ListChecks,
  History,
  ClipboardList,
  FileText,
  FolderKanban,
  ReceiptIndianRupee,
  BadgeIndianRupee,
  Wallet,
  FileBarChart,
  LifeBuoy,
  Repeat,
  Settings,
  Package,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Leads", href: "/crm/leads", icon: PhoneCall },
  { label: "Deals", href: "/crm/deals", icon: Briefcase },
  { label: "Clients", href: "/crm/clients", icon: Users },
  { label: "Tasks", href: "/crm/tasks", icon: ListChecks },
  { label: "Activities", href: "/crm/activities", icon: History },
  { label: "Services", href: "/erp/services", icon: ClipboardList },
  { label: "Proposals", href: "/erp/proposals", icon: FileText },
  { label: "Projects", href: "/erp/projects", icon: FolderKanban },
  { label: "Invoices", href: "/erp/invoices", icon: ReceiptIndianRupee },
  { label: "Payments", href: "/erp/payments", icon: Wallet },
  { label: "Expenses", href: "/erp/expenses", icon: BadgeIndianRupee },
  { label: "Tickets", href: "/erp/tickets", icon: LifeBuoy },
  { label: "Retainers", href: "/erp/retainers", icon: Repeat },
  { label: "Reports", href: "/reports", icon: FileBarChart },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100">
        <div className="h-10 w-10 rounded-lg bg-brand-100 flex items-center justify-center">
          <Package className="h-6 w-6 text-brand-700" />
        </div>
        <div>
          <div className="text-sm text-slate-500">IMAGICITY</div>
          <div className="font-semibold text-slate-900">Operations OS</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "mx-3 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                active ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
