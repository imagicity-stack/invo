import { format } from "date-fns";

export const toISODate = (date: Date) => date.toISOString();

export const formatDisplayDate = (value?: string) =>
  value ? format(new Date(value), "dd MMM yyyy") : "";

export const fiscalYearLabel = (date = new Date()) => {
  const year = date.getFullYear();
  const startYear = date.getMonth() + 1 >= 4 ? year : year - 1;
  const endYearShort = (startYear + 1).toString().slice(-2);
  return `${startYear}-${endYearShort}`;
};
