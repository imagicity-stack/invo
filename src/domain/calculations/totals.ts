import { InvoiceItem, ProposalQuotation, Invoice } from "@/domain/types/entities";

export const computeTotals = (items: InvoiceItem[]) => {
  const subtotal = items.reduce((acc, item) => acc + item.qty * item.unitRate, 0);
  const discountTotal = items.reduce(
    (acc, item) => acc + (item.discountPercent ? (item.discountPercent / 100) * item.qty * item.unitRate : 0),
    0
  );
  const taxable = subtotal - discountTotal;
  const taxTotal = items.reduce(
    (acc, item) => acc + (item.gstRatePercent / 100) * (item.qty * item.unitRate - (item.discountPercent || 0) / 100 * item.qty * item.unitRate),
    0
  );
  const grandTotal = taxable + taxTotal;
  return { subtotal, discountTotal, taxTotal, grandTotal };
};

export const applyInvoiceTotals = (invoice: Invoice): Invoice => {
  const totals = computeTotals(invoice.items);
  const balanceDue = totals.grandTotal - (invoice.amountPaid || 0);
  const status = balanceDue <= 0 ? "Paid" : invoice.status;
  return { ...invoice, ...totals, balanceDue, status };
};

export const applyProposalTotals = (quote: ProposalQuotation): ProposalQuotation => {
  const totals = computeTotals(quote.items);
  return { ...quote, ...totals };
};
