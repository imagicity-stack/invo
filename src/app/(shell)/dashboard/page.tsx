"use client";

import { useEffect, useMemo, useState } from "react";
import { localDataClient } from "@/data/repos/local/client";
import { computeDashboardKPIs, detectDelayedProjects, dueTodayTasks } from "@/services/dashboard";
import { StatCard } from "@/components/dashboard/StatCard";
import { SimpleTable } from "@/components/tables/SimpleTable";
import { formatINR } from "@/utils/format";
import { formatDisplayDate } from "@/utils/dates";
import { Invoice, Payment, Deal, Task, Project } from "@/domain/types/entities";
import { AlertTriangle, Clock4, ArrowUpRight, FileWarning, HandCoins } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const load = async () => {
      setInvoices(await localDataClient.invoices.getAll());
      setPayments(await localDataClient.payments.getAll());
      setDeals(await localDataClient.deals.getAll());
      setTasks(await localDataClient.tasks.getAll());
      setProjects(await localDataClient.projects.getAll());
    };
    load();
  }, []);

  const kpis = useMemo(() => computeDashboardKPIs(invoices, payments, deals), [invoices, payments, deals]);
  const overdueInvoices = invoices.filter((inv) => inv.balanceDue > 0 && new Date(inv.dueDate) < new Date());
  const delayedProjects = detectDelayedProjects(projects);
  const followUps = dueTodayTasks(tasks);
  const negotiationDeals = deals.filter((d) => d.stage === "Negotiation");

  const chartData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((m, idx) => {
      const billed = invoices
        .filter((inv) => new Date(inv.issueDate).getMonth() === idx)
        .reduce((acc, inv) => acc + inv.grandTotal, 0);
      const collected = payments
        .filter((pay) => new Date(pay.paidAt).getMonth() === idx)
        .reduce((acc, pay) => acc + pay.amount, 0);
      return { month: m, billed, collected };
    });
  }, [invoices, payments]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Pipeline Value" value={kpis.pipelineValue} icon={<ArrowUpRight className="h-4 w-4 text-brand-600" />} />
        <StatCard title="This Month Billed" value={kpis.thisMonthBilled} />
        <StatCard title="This Month Collected" value={kpis.thisMonthCollected} />
        <StatCard title="Outstanding" value={kpis.outstanding} />
        <StatCard title="Overdue" value={kpis.overdue} icon={<AlertTriangle className="h-4 w-4 text-amber-500" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-900">Billed vs Collected</div>
              <div className="text-sm text-slate-500">FY {new Date().getFullYear()}</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                  <Tooltip formatter={(val: number) => formatINR(val)} />
                  <Legend />
                  <Bar dataKey="billed" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="collected" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <SimpleTable
            columns={[
              { key: "invoiceNumber", label: "Invoice" },
              { key: "clientId", label: "Client" },
              { key: "issueDate", label: "Issued", render: (v) => formatDisplayDate(v as string) },
              { key: "grandTotal", label: "Amount", render: (v) => formatINR(v as number) },
              { key: "balanceDue", label: "Balance", render: (v) => formatINR(v as number) },
            ]}
            rows={invoices.slice(0, 5)}
          />
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-amber-700 font-semibold">
              <Clock4 className="h-4 w-4" /> Action Center
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-800">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" /> {followUps.length} follow-ups due today
              </li>
              <li className="flex items-start gap-2">
                <FileWarning className="h-4 w-4 text-rose-600" /> {overdueInvoices.length} overdue invoices
              </li>
              <li className="flex items-start gap-2">
                <HandCoins className="h-4 w-4 text-emerald-600" /> {negotiationDeals.length} deals in negotiation
              </li>
              <li className="flex items-start gap-2">
                <Clock4 className="h-4 w-4 text-indigo-600" /> {delayedProjects.length} projects delayed
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="font-semibold text-slate-900 mb-2">Recent Payments</div>
            <div className="space-y-2 text-sm">
              {payments.slice(0, 5).map((pay) => (
                <div key={pay.id} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium text-slate-800">{pay.paymentNumber}</div>
                    <div className="text-slate-500">{formatDisplayDate(pay.paidAt)}</div>
                  </div>
                  <div className="text-slate-900 font-semibold">{formatINR(pay.amount)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
