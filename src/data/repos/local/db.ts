import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import {
  Activity,
  Client,
  Deal,
  Expense,
  Invoice,
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
  Lead,
} from "@/domain/types/entities";

interface ImagicityDB extends DBSchema {
  meta: {
    key: string;
    value: { seeded: boolean; seededAt: number };
  };
  settings: { key: string; value: Settings };
  clients: { key: string; value: Client };
  leads: { key: string; value: Lead };
  deals: { key: string; value: Deal };
  tasks: { key: string; value: Task };
  activities: { key: string; value: Activity };
  services: { key: string; value: Service };
  proposals: { key: string; value: ProposalQuotation };
  projects: { key: string; value: Project };
  invoices: { key: string; value: Invoice };
  payments: { key: string; value: Payment };
  receipts: { key: string; value: Receipt };
  vendors: { key: string; value: Vendor };
  expenses: { key: string; value: Expense };
  tickets: { key: string; value: Ticket };
  retainers: { key: string; value: Retainer };
}

const STORE_CONFIG: Record<keyof ImagicityDB, { keyPath?: string }> = {
  meta: { keyPath: "key" },
  settings: { keyPath: "id" },
  clients: { keyPath: "id" },
  leads: { keyPath: "id" },
  deals: { keyPath: "id" },
  tasks: { keyPath: "id" },
  activities: { keyPath: "id" },
  services: { keyPath: "id" },
  proposals: { keyPath: "id" },
  projects: { keyPath: "id" },
  invoices: { keyPath: "id" },
  payments: { keyPath: "id" },
  receipts: { keyPath: "id" },
  vendors: { keyPath: "id" },
  expenses: { keyPath: "id" },
  tickets: { keyPath: "id" },
  retainers: { keyPath: "id" },
};

export const getDB = async (): Promise<IDBPDatabase<ImagicityDB>> => {
  return openDB<ImagicityDB>("imagicity-os", 1, {
    upgrade(db) {
      Object.entries(STORE_CONFIG).forEach(([store, config]) => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, config);
        }
      });
    },
  });
};
