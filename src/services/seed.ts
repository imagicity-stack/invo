import { localDataClient } from "@/data/repos/local/client";
import { applyInvoiceTotals } from "@/domain/calculations/totals";
import { fiscalYearLabel, toISODate } from "@/utils/dates";
import { Client, Deal, Invoice, Lead, Payment, Service, Settings } from "@/domain/types/entities";

const now = new Date();

const baseSettings: Settings = {
  id: "default",
  companyName: "IMAGICITY",
  address: "91 Market Street, Bengaluru",
  gstin: "29ABCDE1234F2Z5",
  pan: "ABCDE1234F",
  bankDetails: {
    accountName: "IMAGICITY LLP",
    accountNo: "1234567890",
    ifsc: "ICIC0000123",
    bankName: "ICICI Bank",
  },
  upiId: "imagicity@upi",
  invoicePrefix: "IMC/INV",
  quotePrefix: "IMC/QTN",
  receiptPrefix: "IMC/RCPT",
  fiscalYearMode: "India FY Apr-Mar",
  numberingNext: {
    invoices: 4,
    quotes: 4,
    receipts: 3,
    projects: 2,
  },
  defaultGstRatePercent: 18,
  defaultTermsText: "Payment due in 15 days. Late fee 1.5% per month.",
  defaultNotesText: "Thank you for partnering with IMAGICITY.",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
};

const makeServices = (): Service[] => [
  {
    id: crypto.randomUUID(),
    name: "Brand Identity Sprint",
    unitType: "Project",
    defaultRate: 120000,
    gstRatePercent: 18,
    description: "2-week sprint covering brand strategy and visual identity",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Performance Marketing",
    unitType: "Month",
    defaultRate: 85000,
    gstRatePercent: 18,
    description: "Always-on ads management across Meta + Google",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Webflow Build",
    unitType: "Project",
    defaultRate: 150000,
    gstRatePercent: 18,
    description: "CMS-driven marketing site with animations",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  },
];

const clients: Client[] = [
  {
    id: crypto.randomUUID(),
    name: "Ravi Kumar",
    companyName: "RK Retail",
    email: "ravi@rkretail.com",
    phone: "+91 9876543210",
    billingAddress: { line1: "11 Residency Road", city: "Bengaluru", state: "KA" },
    defaultPaymentTermsDays: 15,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Ananya Singh",
    companyName: "Northstar Ventures",
    email: "ananya@northstar.vc",
    phone: "+91 9822221111",
    billingAddress: { line1: "Sector 18", city: "Gurugram", state: "HR" },
    defaultPaymentTermsDays: 15,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Karthik Rao",
    companyName: "Studio K",
    email: "karthik@studiok.in",
    phone: "+91 9988776655",
    billingAddress: { line1: "Andheri West", city: "Mumbai", state: "MH" },
    defaultPaymentTermsDays: 20,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  },
];

const leads: Lead[] = [
  {
    id: crypto.randomUUID(),
    name: "Meera Patel",
    source: "Website",
    contactEmail: "meera@example.com",
    contactPhone: "+91 9000000001",
    interestNotes: "Needs rebrand for D2C launch",
    status: "Qualified",
    ownerName: "Nihar",
    nextFollowUpAt: toISODate(new Date(now.getTime() + 3 * 86400000)),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Aman Verma",
    source: "Referral",
    contactEmail: "aman@example.com",
    contactPhone: "+91 9000000002",
    status: "Contacted",
    ownerName: "Nihar",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Sana Khan",
    source: "Instagram",
    contactEmail: "sana@example.com",
    contactPhone: "+91 9000000003",
    status: "New",
    ownerName: "Sneha",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Rohan Iyer",
    source: "WhatsApp",
    contactEmail: "rohan@example.com",
    contactPhone: "+91 9000000004",
    status: "Contacted",
    ownerName: "Sneha",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Priya Malhotra",
    source: "Website",
    contactEmail: "priya@example.com",
    contactPhone: "+91 9000000005",
    status: "Qualified",
    ownerName: "Nihar",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  },
];

  const deals: Deal[] = [];

export const seedDemoData = async () => {
  const meta = await localDataClient.meta.getById("seeded");
  if (meta?.seeded) return;

  const serviceItems = makeServices();
  await localDataClient.services.upsertMany(serviceItems);
  await localDataClient.clients.upsertMany(clients);
  await localDataClient.leads.upsertMany(leads);
  await localDataClient.settings.upsert(baseSettings);

  const primaryDeal: Deal = {
    id: crypto.randomUUID(),
    dealName: "Northstar launch retainer",
    clientId: clients[1].id,
    valueExpected: 650000,
    probabilityPercent: 65,
    servicesPlanned: [
      { serviceId: serviceItems[1].id, qty: 3, rate: 85000 },
      { serviceId: serviceItems[2].id, qty: 1, rate: 150000 },
    ],
    stage: "Negotiation",
    expectedCloseAt: toISODate(new Date(now.getTime() + 7 * 86400000)),
    notes: "Awaiting updated scope",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  const secondDeal: Deal = {
    id: crypto.randomUUID(),
    dealName: "RK Retail omnichannel revamp",
    clientId: clients[0].id,
    valueExpected: 420000,
    probabilityPercent: 55,
    servicesPlanned: [{ serviceId: serviceItems[0].id, qty: 1, rate: 120000 }],
    stage: "ProposalSent",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  const wonDeal: Deal = {
    id: crypto.randomUUID(),
    dealName: "Studio K creative sprint",
    clientId: clients[2].id,
    valueExpected: 180000,
    probabilityPercent: 100,
    servicesPlanned: [{ serviceId: serviceItems[0].id, qty: 1, rate: 120000 }],
    stage: "Won",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  deals.push(primaryDeal, secondDeal, wonDeal);
  await localDataClient.deals.upsertMany(deals);

  const invoices: Invoice[] = [
    applyInvoiceTotals({
      id: crypto.randomUUID(),
      invoiceNumber: `${baseSettings.invoicePrefix}/${fiscalYearLabel()}/0001`,
      clientId: clients[0].id,
      status: "Sent",
      issueDate: toISODate(new Date(now.getTime() - 20 * 86400000)),
      dueDate: toISODate(new Date(now.getTime() - 5 * 86400000)),
      items: [
        {
          title: serviceItems[0].name,
          qty: 1,
          unitRate: 120000,
          gstRatePercent: 18,
        },
      ],
      projectId: undefined,
      quoteId: undefined,
      subtotal: 0,
      discountTotal: 0,
      taxTotal: 0,
      grandTotal: 0,
      amountPaid: 50000,
      balanceDue: 0,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }),
    applyInvoiceTotals({
      id: crypto.randomUUID(),
      invoiceNumber: `${baseSettings.invoicePrefix}/${fiscalYearLabel()}/0002`,
      clientId: clients[1].id,
      status: "PartiallyPaid",
      issueDate: toISODate(new Date(now.getTime() - 10 * 86400000)),
      dueDate: toISODate(new Date(now.getTime() + 10 * 86400000)),
      items: [
        {
          title: serviceItems[1].name,
          qty: 1,
          unitRate: 85000,
          gstRatePercent: 18,
        },
      ],
      projectId: undefined,
      quoteId: undefined,
      subtotal: 0,
      discountTotal: 0,
      taxTotal: 0,
      grandTotal: 0,
      amountPaid: 0,
      balanceDue: 0,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }),
    applyInvoiceTotals({
      id: crypto.randomUUID(),
      invoiceNumber: `${baseSettings.invoicePrefix}/${fiscalYearLabel()}/0003`,
      clientId: clients[2].id,
      status: "Overdue",
      issueDate: toISODate(new Date(now.getTime() - 45 * 86400000)),
      dueDate: toISODate(new Date(now.getTime() - 15 * 86400000)),
      items: [
        {
          title: serviceItems[0].name,
          qty: 1,
          unitRate: 150000,
          gstRatePercent: 18,
        },
      ],
      projectId: undefined,
      quoteId: undefined,
      subtotal: 0,
      discountTotal: 0,
      taxTotal: 0,
      grandTotal: 0,
      amountPaid: 0,
      balanceDue: 0,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }),
  ];

  await localDataClient.invoices.upsertMany(invoices);

  const payments: Payment[] = [
    {
      id: crypto.randomUUID(),
      paymentNumber: `${baseSettings.receiptPrefix}/${fiscalYearLabel()}/0001`,
      invoiceId: invoices[0].id,
      clientId: clients[0].id,
      amount: 50000,
      mode: "UPI",
      paidAt: toISODate(new Date(now.getTime() - 7 * 86400000)),
      createdAt: now.toISOString(),
    },
    {
      id: crypto.randomUUID(),
      paymentNumber: `${baseSettings.receiptPrefix}/${fiscalYearLabel()}/0002`,
      invoiceId: invoices[1].id,
      clientId: clients[1].id,
      amount: 50000,
      mode: "BankTransfer",
      paidAt: toISODate(new Date(now.getTime() - 2 * 86400000)),
      createdAt: now.toISOString(),
    },
  ];

  await localDataClient.payments.upsertMany(payments);
  await localDataClient.meta.upsert({ key: "seeded", seeded: true, seededAt: Date.now() });
};

export const resetDemoData = async () => {
  await Promise.all([
    localDataClient.clients.clear(),
    localDataClient.leads.clear(),
    localDataClient.deals.clear(),
    localDataClient.tasks.clear(),
    localDataClient.activities.clear(),
    localDataClient.services.clear(),
    localDataClient.proposals.clear(),
    localDataClient.projects.clear(),
    localDataClient.invoices.clear(),
    localDataClient.payments.clear(),
    localDataClient.receipts.clear(),
    localDataClient.vendors.clear(),
    localDataClient.expenses.clear(),
    localDataClient.tickets.clear(),
    localDataClient.retainers.clear(),
    localDataClient.meta.clear(),
    localDataClient.settings.clear(),
  ]);
  await seedDemoData();
};
