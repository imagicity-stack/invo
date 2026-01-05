import { formatINR } from "@/utils/format";
import { ReactNode } from "react";

export const StatCard = ({ title, value, icon }: { title: string; value: number; icon?: ReactNode }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between text-sm text-slate-500">
      {title}
      {icon}
    </div>
    <div className="mt-2 text-2xl font-semibold text-slate-900">{formatINR(value)}</div>
  </div>
);
