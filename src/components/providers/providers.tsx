"use client";

import { useEffect, useState } from "react";
import { seedDemoData } from "@/services/seed";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    seedDemoData().finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Booting IMAGICITY OS...
      </div>
    );
  }

  return <>{children}</>;
}
