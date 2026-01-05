import { Invoice, Payment, Deal, Task, Project } from "@/domain/types/entities";
import { isAfter, isBefore, startOfMonth } from "date-fns";

export const computeDashboardKPIs = (invoices: Invoice[], payments: Payment[], deals: Deal[]) => {
  const monthStart = startOfMonth(new Date());
  const thisMonthInvoices = invoices.filter((inv) => isAfter(new Date(inv.issueDate), monthStart) || inv.issueDate === monthStart.toISOString());
  const thisMonthPayments = payments.filter(
    (pay) => isAfter(new Date(pay.paidAt), monthStart) || pay.paidAt === monthStart.toISOString()
  );
  const thisMonthBilled = thisMonthInvoices.reduce((acc, inv) => acc + inv.grandTotal, 0);
  const thisMonthCollected = thisMonthPayments.reduce((acc, pay) => acc + pay.amount, 0);
  const outstanding = invoices.reduce((acc, inv) => acc + inv.balanceDue, 0);
  const overdue = invoices
    .filter((inv) => inv.balanceDue > 0 && isBefore(new Date(inv.dueDate), new Date()))
    .reduce((acc, inv) => acc + inv.balanceDue, 0);
  const pipelineValue = deals.filter((d) => d.stage !== "Won" && d.stage !== "Lost").reduce((acc, d) => acc + d.valueExpected, 0);

  return { pipelineValue, thisMonthBilled, thisMonthCollected, outstanding, overdue };
};

export const detectDelayedProjects = (projects: Project[]) =>
  projects.filter((p) => p.status !== "Completed" && isBefore(new Date(p.targetEndDate), new Date()));

export const dueTodayTasks = (tasks: Task[]) =>
  tasks.filter((t) => t.status === "Open" && new Date(t.dueAt).toDateString() === new Date().toDateString());
