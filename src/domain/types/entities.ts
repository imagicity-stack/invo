export type ID = string;

export interface Address {
  line1: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface Client {
  id: ID;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  gstin?: string;
  billingAddress: Address;
  shippingAddress?: Address;
  defaultPaymentTermsDays: number;
  notes?: string;
  lifetimeBilled?: number;
  lifetimePaid?: number;
  outstanding?: number;
  createdAt: string;
  updatedAt: string;
}

export type LeadSource = "Instagram" | "Website" | "Referral" | "WhatsApp" | "Other";
export type LeadStatus = "New" | "Contacted" | "Qualified" | "Unqualified";

export interface Lead {
  id: ID;
  name: string;
  source: LeadSource;
  contactEmail: string;
  contactPhone: string;
  interestNotes?: string;
  status: LeadStatus;
  ownerName: string;
  nextFollowUpAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type DealStage = "Discovery" | "ProposalSent" | "Negotiation" | "Won" | "Lost";

export interface PlannedServiceItem {
  serviceId?: ID;
  qty: number;
  rate: number;
  title?: string;
}

export interface Deal {
  id: ID;
  dealName: string;
  clientId?: ID;
  leadId?: ID;
  stage: DealStage;
  expectedCloseAt?: string;
  valueExpected: number;
  probabilityPercent: number;
  servicesPlanned: PlannedServiceItem[];
  notes?: string;
  lastActivityAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type LinkedType = "Lead" | "Deal" | "Client" | "Project" | "Invoice";

export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Open" | "Done";

export interface Task {
  id: ID;
  title: string;
  description?: string;
  linkedType: LinkedType;
  linkedId: ID;
  dueAt: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export type ActivityType = "Note" | "Call" | "Message" | "Email";

export interface Activity {
  id: ID;
  type: ActivityType;
  linkedType: LinkedType;
  linkedId: ID;
  content: string;
  createdAt: string;
}

export type ServiceUnit = "Project" | "Month" | "Hour" | "Quantity";

export interface Service {
  id: ID;
  name: string;
  unitType: ServiceUnit;
  defaultRate: number;
  gstRatePercent: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type QuoteStatus = "Draft" | "Sent" | "Approved" | "Rejected" | "Expired";

export interface QuoteItem {
  serviceId?: ID;
  title: string;
  description?: string;
  qty: number;
  unitRate: number;
  discountPercent?: number;
  gstRatePercent: number;
}

export interface ProposalQuotation {
  id: ID;
  quoteNumber: string;
  clientId: ID;
  dealId?: ID;
  status: QuoteStatus;
  issueDate: string;
  validUntil: string;
  items: QuoteItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  grandTotal: number;
  termsText?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = "Planning" | "InProgress" | "Review" | "Completed" | "OnHold";

export interface ProjectMilestone {
  title: string;
  dueAt: string;
  status: "Open" | "Done";
}

export interface Project {
  id: ID;
  projectCode: string;
  name: string;
  clientId: ID;
  dealId?: ID;
  status: ProjectStatus;
  startDate: string;
  targetEndDate: string;
  budgetRevenue: number;
  budgetCost: number;
  milestones: ProjectMilestone[];
  assignedPeople: string[];
  createdAt: string;
  updatedAt: string;
}

export type InvoiceStatus = "Draft" | "Sent" | "PartiallyPaid" | "Paid" | "Overdue" | "Cancelled";

export interface InvoiceItem {
  serviceId?: ID;
  title: string;
  description?: string;
  qty: number;
  unitRate: number;
  discountPercent?: number;
  gstRatePercent: number;
}

export interface Invoice {
  id: ID;
  invoiceNumber: string;
  clientId: ID;
  projectId?: ID;
  quoteId?: ID;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  grandTotal: number;
  amountPaid: number;
  balanceDue: number;
  notes?: string;
  termsText?: string;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMode = "UPI" | "BankTransfer" | "Cash" | "Card" | "Other";

export interface Payment {
  id: ID;
  paymentNumber: string;
  invoiceId: ID;
  clientId: ID;
  amount: number;
  mode: PaymentMode;
  referenceId?: string;
  paidAt: string;
  notes?: string;
  createdAt: string;
}

export interface Receipt {
  id: ID;
  receiptNumber: string;
  paymentId: ID;
  invoiceId: ID;
  generatedAt: string;
}

export interface Vendor {
  id: ID;
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ExpenseCategory = "Software" | "Freelance" | "Travel" | "Ads" | "Print" | "Other";
export type ExpenseStatus = "Unpaid" | "Paid";

export interface Expense {
  id: ID;
  vendorId?: ID;
  projectId?: ID;
  category: ExpenseCategory;
  amount: number;
  expenseDate: string;
  status: ExpenseStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type TicketPriority = "Low" | "Medium" | "High";
export type TicketStatus = "Open" | "InProgress" | "Resolved" | "Closed";

export interface Ticket {
  id: ID;
  clientId: ID;
  projectId?: ID;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

export type RetainerStatus = "Active" | "Paused" | "Ended";

export interface Retainer {
  id: ID;
  clientId: ID;
  serviceBundleText: string;
  monthlyFee: number;
  startDate: string;
  endDate?: string;
  billingDayOfMonth: number;
  status: RetainerStatus;
  nextInvoiceDate: string;
}

export interface NumberingNext {
  invoices: number;
  quotes: number;
  receipts: number;
  projects: number;
}

export interface Settings {
  id: string;
  companyName: string;
  logoUrl?: string;
  address: string;
  gstin?: string;
  pan?: string;
  bankDetails: {
    accountName: string;
    accountNo: string;
    ifsc: string;
    bankName: string;
  };
  upiId?: string;
  invoicePrefix: string;
  quotePrefix: string;
  receiptPrefix: string;
  fiscalYearMode: string;
  numberingNext: NumberingNext;
  defaultGstRatePercent: number;
  defaultTermsText?: string;
  defaultNotesText?: string;
}

export interface DashboardKPIs {
  pipelineValue: number;
  thisMonthBilled: number;
  thisMonthCollected: number;
  outstanding: number;
  overdue: number;
}
