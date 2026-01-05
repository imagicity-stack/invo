"use client";

import { Search, Calendar, Plus, ReceiptIndianRupee, BadgePlus } from "lucide-react";
import { useState } from "react";

const quickActions = ["New Lead", "New Deal", "New Invoice", "Add Payment"];

export const Topbar = () => {
  const [query, setQuery] = useState("");
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clients, leads, deals, invoice number"
            className="w-full rounded-md border border-slate-200 pl-10 pr-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <button className="hidden md:inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
          <Calendar className="h-4 w-4" /> This Month
        </button>
      </div>
      <div className="flex items-center gap-2">
        {quickActions.map((action) => (
          <button
            key={action}
            className="hidden lg:inline-flex items-center gap-2 rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" /> {action}
          </button>
        ))}
        <button className="inline-flex lg:hidden items-center gap-2 rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700">
          <BadgePlus className="h-4 w-4" />
        </button>
        <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
          <ReceiptIndianRupee className="h-4 w-4" /> Dev Mode
        </button>
      </div>
    </header>
  );
};
