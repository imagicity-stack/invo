import { fiscalYearLabel } from "@/utils/dates";
import { localDataClient } from "@/data/repos/local/client";
import { Settings } from "@/domain/types/entities";

const padNumber = (num: number) => String(num).padStart(4, "0");

const nextNumber = async (
  type: keyof Settings["numberingNext"],
  prefix: string
): Promise<{ value: string; settings: Settings }> => {
  const existing = await localDataClient.settings.getById("default");
  if (!existing) {
    throw new Error("Settings not initialized");
  }
  const next = existing.numberingNext[type];
  const fy = fiscalYearLabel();
  const value = `${prefix}/${fy}/${padNumber(next)}`;
  existing.numberingNext[type] = next + 1;
  existing.updatedAt = new Date().toISOString();
  await localDataClient.settings.upsert(existing);
  return { value, settings: existing };
};

export const nextInvoiceNumber = () => nextNumber("invoices", "IMC/INV");
export const nextQuoteNumber = () => nextNumber("quotes", "IMC/QTN");
export const nextReceiptNumber = () => nextNumber("receipts", "IMC/RCPT");
export const nextProjectCode = () => nextNumber("projects", "IMC/PRJ");
