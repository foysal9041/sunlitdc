"use client";

import { useState, type FormEvent } from "react";
import type { PointOfPresence } from "@prisma/client";

const CANONICAL_DISTRICTS = ["Jashore", "Satkhira", "Khulna", "Narail", "Chuadanga", "Jhenaidah"];

export interface PopFormValues {
  district: string;
  generalArea: string;
  status: "ACTIVE" | "DISABLED";
  name: string;
  btrcPopId: string;
  exactAddress: string;
  latitude: string;
  longitude: string;
  nttnProvider: string;
  linkId: string;
  vlan: string;
  ipAddress: string;
  oltInfo: string;
  routerSwitchInfo: string;
  internalCapacityMbps: string;
  topologyNotes: string;
}

function fromPop(pop: PointOfPresence | null): PopFormValues {
  return {
    district: pop?.district ?? "",
    generalArea: pop?.generalArea ?? "",
    status: pop?.status ?? "ACTIVE",
    name: pop?.name ?? "",
    btrcPopId: pop?.btrcPopId ?? "",
    exactAddress: pop?.exactAddress ?? "",
    latitude: pop?.latitude?.toString() ?? "",
    longitude: pop?.longitude?.toString() ?? "",
    nttnProvider: pop?.nttnProvider ?? "",
    linkId: pop?.linkId ?? "",
    vlan: pop?.vlan ?? "",
    ipAddress: pop?.ipAddress ?? "",
    oltInfo: pop?.oltInfo ?? "",
    routerSwitchInfo: pop?.routerSwitchInfo ?? "",
    internalCapacityMbps: pop?.internalCapacityMbps?.toString() ?? "",
    topologyNotes: pop?.topologyNotes ?? "",
  };
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-navy-900/70 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50";
const labelClass = "mb-1 block text-xs font-medium text-slate-400";

export function PopForm({
  pop,
  onCancel,
  onSaved,
}: {
  pop: PointOfPresence | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<PopFormValues>(() => fromPop(pop));
  const [showInternal, setShowInternal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof PopFormValues>(key: K, value: PopFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      district: values.district,
      generalArea: values.generalArea,
      status: values.status,
      name: values.name || null,
      btrcPopId: values.btrcPopId || null,
      exactAddress: values.exactAddress || null,
      latitude: values.latitude === "" ? null : Number(values.latitude),
      longitude: values.longitude === "" ? null : Number(values.longitude),
      nttnProvider: values.nttnProvider || null,
      linkId: values.linkId || null,
      vlan: values.vlan || null,
      ipAddress: values.ipAddress || null,
      oltInfo: values.oltInfo || null,
      routerSwitchInfo: values.routerSwitchInfo || null,
      internalCapacityMbps: values.internalCapacityMbps === "" ? null : Number(values.internalCapacityMbps),
      topologyNotes: values.topologyNotes || null,
    };

    try {
      const url = pop ? `/api/admin/pops/${pop.id}` : "/api/admin/pops";
      const method = pop ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to save PoP.");
        setSaving(false);
        return;
      }

      onSaved();
    } catch {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label>
          <span className={labelClass}>District *</span>
          <input
            required
            list="district-options"
            value={values.district}
            onChange={(e) => update("district", e.target.value)}
            className={inputClass}
            placeholder="e.g. Jashore"
          />
          <datalist id="district-options">
            {CANONICAL_DISTRICTS.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
        </label>

        <label>
          <span className={labelClass}>Public Area Label *</span>
          <input
            required
            value={values.generalArea}
            onChange={(e) => update("generalArea", e.target.value)}
            className={inputClass}
            placeholder="e.g. Jashore Sadar"
          />
        </label>

        <label>
          <span className={labelClass}>Status</span>
          <select
            value={values.status}
            onChange={(e) => update("status", e.target.value as "ACTIVE" | "DISABLED")}
            className={inputClass}
          >
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </label>

        <label>
          <span className={labelClass}>Internal Label</span>
          <input
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            placeholder="e.g. Jashore Sadar PoP-1"
          />
        </label>
      </div>

      <p className="text-xs text-slate-500">
        District and Area Label are the only fields ever shown on the public website. Everything below is
        internal NOC data and stays private.
      </p>

      <button
        type="button"
        onClick={() => setShowInternal((v) => !v)}
        className="text-sm font-medium text-cyan-300 hover:text-cyan-200"
      >
        {showInternal ? "− Hide internal / NOC details" : "+ Show internal / NOC details"}
      </button>

      {showInternal && (
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-navy-900/40 p-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>BTRC PoP ID</span>
            <input value={values.btrcPopId} onChange={(e) => update("btrcPopId", e.target.value)} className={inputClass} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Exact Address</span>
            <input value={values.exactAddress} onChange={(e) => update("exactAddress", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>Latitude</span>
            <input value={values.latitude} onChange={(e) => update("latitude", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>Longitude</span>
            <input value={values.longitude} onChange={(e) => update("longitude", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>NTTN Provider</span>
            <input value={values.nttnProvider} onChange={(e) => update("nttnProvider", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>Link ID</span>
            <input value={values.linkId} onChange={(e) => update("linkId", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>VLAN</span>
            <input value={values.vlan} onChange={(e) => update("vlan", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>IP Address</span>
            <input value={values.ipAddress} onChange={(e) => update("ipAddress", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>OLT Info</span>
            <input value={values.oltInfo} onChange={(e) => update("oltInfo", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>Router / Switch Info</span>
            <input value={values.routerSwitchInfo} onChange={(e) => update("routerSwitchInfo", e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>Internal Capacity (Mbps)</span>
            <input
              type="number"
              value={values.internalCapacityMbps}
              onChange={(e) => update("internalCapacityMbps", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Topology Notes</span>
            <textarea
              rows={3}
              value={values.topologyNotes}
              onChange={(e) => update("topologyNotes", e.target.value)}
              className={inputClass}
            />
          </label>
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-linear-to-r from-electric-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-navy-950 disabled:opacity-60"
        >
          {saving ? "Saving..." : pop ? "Save Changes" : "Add PoP"}
        </button>
      </div>
    </form>
  );
}
