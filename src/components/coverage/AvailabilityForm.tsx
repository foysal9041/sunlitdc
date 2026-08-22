"use client";

import { useState, type FormEvent } from "react";
import { coverageApi, ApiNotConfiguredError } from "@/lib/api";
import { company } from "@/data/company";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import { districtNamesBn, localizeName } from "@/i18n/dictionaries/content";

type Status = "idle" | "loading" | "success" | "error" | "unavailable-backend";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-electric-400";

export function AvailabilityForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const t = getPagesDictionary(locale).coverage.form;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const district = String(formData.get("district") ?? "");
    const area = String(formData.get("area") ?? "");
    const phone = String(formData.get("phone") ?? "");

    try {
      const result = await coverageApi.checkAvailability({ district, area, phone });
      setStatus("success");
      setMessage(result.message);
    } catch (error) {
      if (error instanceof ApiNotConfiguredError) {
        setStatus("unavailable-backend");
        setMessage(t.unconfigured.replace("{phone}", company.contact.phone));
      } else {
        setStatus("error");
        setMessage(t.error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-slate-600">{t.district}</span>
          <select name="district" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              {t.selectDistrict}
            </option>
            {company.coverage.districts.map((d) => (
              <option key={d} value={d}>
                {localizeName(locale, districtNamesBn, d)}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-slate-600">{t.area}</span>
          <input name="area" required placeholder={t.areaPlaceholder} className={inputClass} />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-slate-600">{t.phone}</span>
          <input name="phone" type="tel" placeholder="01XXXXXXXXX" className={inputClass} />
        </label>
      </div>

      <Button type="submit" className="mt-5 w-full justify-center" disabled={status === "loading"}>
        {status === "loading" ? t.checking : getCommonDictionary(locale).buttons.checkAvailability}
      </Button>

      {message && (
        <p className={`mt-4 text-sm ${status === "error" ? "text-red-600" : "text-electric-600"}`}>{message}</p>
      )}
    </form>
  );
}
