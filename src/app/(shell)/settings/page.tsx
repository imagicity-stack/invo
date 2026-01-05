"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema, SettingsInput } from "@/domain/schemas/entities";
import { localDataClient } from "@/data/repos/local/client";
import { resetDemoData } from "@/services/seed";
import { Settings } from "@/domain/types/entities";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: "",
      address: "",
      bankDetails: { accountName: "", accountNo: "", ifsc: "", bankName: "" },
      invoicePrefix: "IMC/INV",
      quotePrefix: "IMC/QTN",
      receiptPrefix: "IMC/RCPT",
      fiscalYearMode: "India FY Apr-Mar",
      numberingNext: { invoices: 1, quotes: 1, receipts: 1, projects: 1 },
      defaultGstRatePercent: 18,
    },
  });

  useEffect(() => {
    const load = async () => {
      const settings = await localDataClient.settings.getById("default");
      if (settings) {
        form.reset(settings);
      }
    };
    load();
  }, [form]);

  const onSubmit = async (values: SettingsInput) => {
    setLoading(true);
    const payload: Settings = {
      ...values,
      id: "default",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await localDataClient.settings.upsert(payload);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-slate-900">Workspace Settings</h1>
          <p className="text-sm text-slate-600">Defaults for IMAGICITY billing and numbering.</p>
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm text-slate-700">
              <span>Company Name</span>
              <input className="w-full rounded-md border border-slate-200 px-3 py-2" {...form.register("companyName")} />
            </label>
            <label className="space-y-1 text-sm text-slate-700">
              <span>Address</span>
              <input className="w-full rounded-md border border-slate-200 px-3 py-2" {...form.register("address")} />
            </label>
            <label className="space-y-1 text-sm text-slate-700">
              <span>GSTIN</span>
              <input className="w-full rounded-md border border-slate-200 px-3 py-2" {...form.register("gstin")} />
            </label>
            <label className="space-y-1 text-sm text-slate-700">
              <span>PAN</span>
              <input className="w-full rounded-md border border-slate-200 px-3 py-2" {...form.register("pan")} />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm text-slate-700">
              <span>Bank Name</span>
              <input className="w-full rounded-md border border-slate-200 px-3 py-2" {...form.register("bankDetails.bankName")} />
            </label>
            <label className="space-y-1 text-sm text-slate-700">
              <span>Account Name</span>
              <input className="w-full rounded-md border border-slate-200 px-3 py-2" {...form.register("bankDetails.accountName")} />
            </label>
            <label className="space-y-1 text-sm text-slate-700">
              <span>Account Number</span>
              <input className="w-full rounded-md border border-slate-200 px-3 py-2" {...form.register("bankDetails.accountNo")} />
            </label>
            <label className="space-y-1 text-sm text-slate-700">
              <span>IFSC</span>
              <input className="w-full rounded-md border border-slate-200 px-3 py-2" {...form.register("bankDetails.ifsc")} />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-1 text-sm text-slate-700">
              <span>Invoice Prefix</span>
              <input className="w-full rounded-md border border-slate-200 px-3 py-2" {...form.register("invoicePrefix")} />
            </label>
            <label className="space-y-1 text-sm text-slate-700">
              <span>Quote Prefix</span>
              <input className="w-full rounded-md border border-slate-200 px-3 py-2" {...form.register("quotePrefix")} />
            </label>
            <label className="space-y-1 text-sm text-slate-700">
              <span>Receipt Prefix</span>
              <input className="w-full rounded-md border border-slate-200 px-3 py-2" {...form.register("receiptPrefix")} />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-800">Default GST %</div>
              <input type="number" className="mt-1 w-24 rounded-md border border-slate-200 px-3 py-2" {...form.register("defaultGstRatePercent", { valueAsNumber: true })} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
        <div className="font-semibold text-red-800">Danger Zone</div>
        <p className="text-sm text-red-700">Reset and reseed demo data.</p>
        <button
          onClick={() => resetDemoData()}
          className="mt-2 rounded-md border border-red-300 px-3 py-2 text-sm font-semibold text-red-800 hover:bg-red-100"
        >
          Reset Demo Data
        </button>
      </div>
    </div>
  );
}
