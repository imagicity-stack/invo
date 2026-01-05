import { LocalRepo } from "./local-repo";
import {
  Activity,
  Client,
  Deal,
  Expense,
  Invoice,
  Lead,
  Payment,
  Project,
  ProposalQuotation,
  Receipt,
  Retainer,
  Service,
  Settings,
  Task,
  Ticket,
  Vendor,
} from "@/domain/types/entities";

export class LocalDataClient {
  settings = new LocalRepo<Settings>("settings");
  clients = new LocalRepo<Client>("clients");
  leads = new LocalRepo<Lead>("leads");
  deals = new LocalRepo<Deal>("deals");
  tasks = new LocalRepo<Task>("tasks");
  activities = new LocalRepo<Activity>("activities");
  services = new LocalRepo<Service>("services");
  proposals = new LocalRepo<ProposalQuotation>("proposals");
  projects = new LocalRepo<Project>("projects");
  invoices = new LocalRepo<Invoice>("invoices");
  payments = new LocalRepo<Payment>("payments");
  receipts = new LocalRepo<Receipt>("receipts");
  vendors = new LocalRepo<Vendor>("vendors");
  expenses = new LocalRepo<Expense>("expenses");
  tickets = new LocalRepo<Ticket>("tickets");
  retainers = new LocalRepo<Retainer>("retainers");
  meta = new LocalRepo<{ key: string; seeded: boolean; seededAt: number }>("meta", "key");
}

export const localDataClient = new LocalDataClient();
