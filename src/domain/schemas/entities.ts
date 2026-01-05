import { z } from "zod";

const addressSchema = z.object({
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

export const clientSchema = z.object({
  name: z.string().min(1),
  companyName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  gstin: z.string().optional(),
  billingAddress: addressSchema,
  shippingAddress: addressSchema.optional(),
  defaultPaymentTermsDays: z.number().min(0).default(15),
  notes: z.string().optional(),
});

export const leadSchema = z.object({
  name: z.string().min(1),
  source: z.enum(["Instagram", "Website", "Referral", "WhatsApp", "Other"]),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(5),
  interestNotes: z.string().optional(),
  status: z.enum(["New", "Contacted", "Qualified", "Unqualified"]),
  ownerName: z.string().min(1),
  nextFollowUpAt: z.string().optional(),
});

export const dealSchema = z.object({
  dealName: z.string().min(1),
  clientId: z.string().optional(),
  leadId: z.string().optional(),
  stage: z.enum(["Discovery", "ProposalSent", "Negotiation", "Won", "Lost"]),
  expectedCloseAt: z.string().optional(),
  valueExpected: z.number().min(0),
  probabilityPercent: z.number().min(0).max(100),
  servicesPlanned: z
    .array(
      z.object({
        serviceId: z.string().optional(),
        qty: z.number().min(0),
        rate: z.number().min(0),
        title: z.string().optional(),
      })
    )
    .default([]),
  notes: z.string().optional(),
  lastActivityAt: z.string().optional(),
});

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  linkedType: z.enum(["Lead", "Deal", "Client", "Project", "Invoice"]),
  linkedId: z.string().min(1),
  dueAt: z.string(),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["Open", "Done"]),
});

export const activitySchema = z.object({
  type: z.enum(["Note", "Call", "Message", "Email"]),
  linkedType: z.enum(["Lead", "Deal", "Client", "Project", "Invoice"]),
  linkedId: z.string(),
  content: z.string().min(1),
});

export const serviceSchema = z.object({
  name: z.string().min(1),
  unitType: z.enum(["Project", "Month", "Hour", "Quantity"]),
  defaultRate: z.number().min(0),
  gstRatePercent: z.number().min(0).max(100).default(18),
  description: z.string().optional(),
});

const lineItemSchema = z.object({
  serviceId: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  qty: z.number().min(0),
  unitRate: z.number().min(0),
  discountPercent: z.number().min(0).max(100).optional(),
  gstRatePercent: z.number().min(0).max(100),
});

export const proposalSchema = z.object({
  clientId: z.string(),
  dealId: z.string().optional(),
  status: z.enum(["Draft", "Sent", "Approved", "Rejected", "Expired"]),
  issueDate: z.string(),
  validUntil: z.string(),
  items: z.array(lineItemSchema),
  termsText: z.string().optional(),
  notes: z.string().optional(),
});

export const projectSchema = z.object({
  name: z.string(),
  clientId: z.string(),
  dealId: z.string().optional(),
  status: z.enum(["Planning", "InProgress", "Review", "Completed", "OnHold"]),
  startDate: z.string(),
  targetEndDate: z.string(),
  budgetRevenue: z.number().min(0),
  budgetCost: z.number().min(0),
  milestones: z
    .array(
      z.object({
        title: z.string(),
        dueAt: z.string(),
        status: z.enum(["Open", "Done"]),
      })
    )
    .default([]),
  assignedPeople: z.array(z.string()).default([]),
});

export const invoiceSchema = z.object({
  clientId: z.string(),
  projectId: z.string().optional(),
  quoteId: z.string().optional(),
  status: z.enum(["Draft", "Sent", "PartiallyPaid", "Paid", "Overdue", "Cancelled"]),
  issueDate: z.string(),
  dueDate: z.string(),
  items: z.array(lineItemSchema),
  notes: z.string().optional(),
  termsText: z.string().optional(),
});

export const paymentSchema = z.object({
  invoiceId: z.string(),
  clientId: z.string(),
  amount: z.number().min(0),
  mode: z.enum(["UPI", "BankTransfer", "Cash", "Card", "Other"]),
  referenceId: z.string().optional(),
  paidAt: z.string(),
  notes: z.string().optional(),
});

export const vendorSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export const expenseSchema = z.object({
  vendorId: z.string().optional(),
  projectId: z.string().optional(),
  category: z.enum(["Software", "Freelance", "Travel", "Ads", "Print", "Other"]),
  amount: z.number().min(0),
  expenseDate: z.string(),
  status: z.enum(["Unpaid", "Paid"]),
  notes: z.string().optional(),
});

export const ticketSchema = z.object({
  clientId: z.string(),
  projectId: z.string().optional(),
  title: z.string(),
  description: z.string(),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["Open", "InProgress", "Resolved", "Closed"]),
});

export const retainerSchema = z.object({
  clientId: z.string(),
  serviceBundleText: z.string(),
  monthlyFee: z.number().min(0),
  startDate: z.string(),
  endDate: z.string().optional(),
  billingDayOfMonth: z.number().min(1).max(28),
  status: z.enum(["Active", "Paused", "Ended"]),
  nextInvoiceDate: z.string(),
});

export const settingsSchema = z.object({
  companyName: z.string(),
  logoUrl: z.string().url().optional(),
  address: z.string(),
  gstin: z.string().optional(),
  pan: z.string().optional(),
  bankDetails: z.object({
    accountName: z.string(),
    accountNo: z.string(),
    ifsc: z.string(),
    bankName: z.string(),
  }),
  upiId: z.string().optional(),
  invoicePrefix: z.string(),
  quotePrefix: z.string(),
  receiptPrefix: z.string(),
  fiscalYearMode: z.string(),
  numberingNext: z.object({
    invoices: z.number().default(1),
    quotes: z.number().default(1),
    receipts: z.number().default(1),
    projects: z.number().default(1),
  }),
  defaultGstRatePercent: z.number().default(18),
  defaultTermsText: z.string().optional(),
  defaultNotesText: z.string().optional(),
});

export type ClientInput = z.infer<typeof clientSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
