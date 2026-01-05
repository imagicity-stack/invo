import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function ShellLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="dev-banner px-4 py-2 text-sm font-medium text-slate-700 border-b border-brand-100">
          No Auth Mode enabled. Dev-only workspace. Seeded demo data with IMAGICITY defaults.
        </div>
        <Topbar />
        <main className="flex-1 bg-slate-50 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
