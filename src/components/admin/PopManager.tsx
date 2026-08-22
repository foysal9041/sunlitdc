"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PointOfPresence } from "@prisma/client";
import { PopForm } from "@/components/admin/PopForm";
import { cn } from "@/lib/utils";

export function PopManager({ initialPops }: { initialPops: PointOfPresence[] }) {
  const router = useRouter();
  const [pops, setPops] = useState(initialPops);
  const [lastInitialPops, setLastInitialPops] = useState(initialPops);
  const [modalPop, setModalPop] = useState<PointOfPresence | null | "new">(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  if (initialPops !== lastInitialPops) {
    setLastInitialPops(initialPops);
    setPops(initialPops);
  }

  const stats = useMemo(() => {
    const active = pops.filter((p) => p.status === "ACTIVE");
    const districts = new Set(active.map((p) => p.district));
    return { total: pops.length, active: active.length, districts: districts.size };
  }, [pops]);

  function refreshFromServer() {
    setModalPop(null);
    router.refresh();
  }

  async function toggleStatus(pop: PointOfPresence) {
    setBusyId(pop.id);
    const nextStatus = pop.status === "ACTIVE" ? "DISABLED" : "ACTIVE";
    try {
      const res = await fetch(`/api/admin/pops/${pop.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setPops((list) => list.map((p) => (p.id === pop.id ? { ...p, status: nextStatus } : p)));
      }
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(pop: PointOfPresence) {
    if (!window.confirm(`Delete PoP in ${pop.district} (${pop.generalArea})? This cannot be undone.`)) {
      return;
    }
    setBusyId(pop.id);
    try {
      const res = await fetch(`/api/admin/pops/${pop.id}`, { method: "DELETE" });
      if (res.ok) {
        setPops((list) => list.filter((p) => p.id !== pop.id));
      }
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Coverage / PoP Management</h1>
          <p className="mt-1 text-sm text-slate-400">
            {stats.active} active of {stats.total} PoPs across {stats.districts} districts. Changes here
            update the public Coverage page immediately.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalPop("new")}
          className="rounded-lg bg-linear-to-r from-electric-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-navy-950"
        >
          + Add PoP
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Public Area Label</th>
              <th className="px-4 py-3">Internal Label</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {pops.map((pop) => (
              <tr key={pop.id} className="bg-navy-900/30">
                <td className="px-4 py-3 font-medium text-white">{pop.district}</td>
                <td className="px-4 py-3 text-slate-300">{pop.generalArea}</td>
                <td className="px-4 py-3 text-slate-500">{pop.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    disabled={busyId === pop.id}
                    onClick={() => toggleStatus(pop)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors disabled:opacity-50",
                      pop.status === "ACTIVE"
                        ? "bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/25"
                        : "bg-slate-500/15 text-slate-400 hover:bg-slate-500/25"
                    )}
                  >
                    {pop.status === "ACTIVE" ? "Active" : "Disabled"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => setModalPop(pop)}
                    className="mr-3 text-sm font-medium text-cyan-300 hover:text-cyan-200"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={busyId === pop.id}
                    onClick={() => handleDelete(pop)}
                    className="text-sm font-medium text-red-400 hover:text-red-300 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {pops.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No PoPs yet. Add one to start showing coverage publicly.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalPop !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-navy-950 p-6 shadow-2xl">
            <h2 className="mb-5 text-lg font-bold text-white">
              {modalPop === "new" ? "Add PoP" : `Edit PoP — ${modalPop.district}`}
            </h2>
            <PopForm
              pop={modalPop === "new" ? null : modalPop}
              onCancel={() => setModalPop(null)}
              onSaved={refreshFromServer}
            />
          </div>
        </div>
      )}
    </div>
  );
}
