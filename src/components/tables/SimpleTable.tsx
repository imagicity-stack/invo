import { ReactNode } from "react";

type Column<T extends Record<string, unknown>> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

export const SimpleTable = <T extends Record<string, unknown>>({
  columns,
  rows,
}: {
  columns: Column<T>[];
  rows: T[];
}) => (
  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <table className="min-w-full divide-y divide-slate-200 text-sm">
      <thead className="bg-slate-50">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-3 text-left font-medium text-slate-600">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row, idx) => (
          <tr key={idx} className="hover:bg-slate-50">
            {columns.map((col) => {
              const value = row[col.key];
              return (
                <td key={String(col.key)} className="px-4 py-2 text-slate-800">
                  {col.render ? col.render(value, row) : (value as ReactNode)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
