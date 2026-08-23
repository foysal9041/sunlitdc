"use client";

import { useMemo, useState } from "react";
import type { AvailabilityRequest, AvailabilityStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS: AvailabilityStatus[] = ["NEW", "CONTACTED", "CONFIRMED", "DECLINED"];

const STATUS_STYLES: Record<AvailabilityStatus, string> = {
  NEW: "bg-electric-400/15 text-electric-300",
  CONTACTED: "bg-amber-400/15 text-amber-300",
  CONFIRMED: "bg-emerald-400/15 text-emerald-300",
  DECLINED: "bg-slate-500/15 text-slate-400",
};

function formatDate(value: Date | string) {
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AvailabilityManager({ initialRequests }: { initialRequests: AvailabilityRequest[] }) {
  const [requests, setRequests] = useState(initialRequests);
  const [lastInitial, setLastInitial] = useState(initialRequests);
  const [busyId, setBusyId] = useState<string | null>(null);

  if (initialRequests !== lastInitial) {
    setLastInitial(initialRequests);
    setRequests(initialRequests);
  }

  const stats = useMemo(() => {
    const newCount = requests.filter((r) => r.status === "NEW").length;
    return { total: requests.length, newCount };
  }, [requests]);

  async function updateStatus(id: string, status: AvailabilityStatus) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/availability/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setRequests((list) => list.map((r) => (r.id === id ? { ...r, status } : r)));
      }
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(request: AvailabilityRequest) {
    if (!window.confirm(`Delete this request from ${request.district} (${request.area})?`)) return;
    setBusyId(request.id);
    try {
      const res = await fetch(`/api/admin/availability/${request.id}`, { method: "DELETE" });
      if (res.ok) {
        setRequests((list) => list.filter((r) => r.id !== request.id));
      }
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Availability Requests</h1>
          <p className="mt-1 text-sm text-slate-400">
            {stats.newCount} new of {stats.total} total — submitted from the public Coverage page&apos;s
            &quot;Check Availability&quot; form.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Area</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {requests.map((request) => (
              <tr key={request.id} className="bg-navy-900/30">
                <td className="px-4 py-3 text-slate-400">{formatDate(request.createdAt)}</td>
                <td className="px-4 py-3 font-medium text-white">{request.district}</td>
                <td className="px-4 py-3 text-slate-300">{request.area}</td>
                <td className="px-4 py-3 text-slate-300">{request.phone ?? "—"}</td>
                <td className="px-4 py-3">
                  <select
                    value={request.status}
                    disabled={busyId === request.id}
                    onChange={(e) => updateStatus(request.id, e.target.value as AvailabilityStatus)}
                    className={cn(
                      "rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none disabled:opacity-50",
                      STATUS_STYLES[request.status]
                    )}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-navy-900 text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    disabled={busyId === request.id}
                    onClick={() => handleDelete(request)}
                    className="text-sm font-medium text-red-400 hover:text-red-300 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No availability requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
