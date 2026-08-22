"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { contactApi, ApiNotConfiguredError } from "@/lib/api";
import { company } from "@/data/company";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";

type Status = "idle" | "loading" | "success" | "error" | "unavailable-backend";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-electric-400";

const subjectFromParams = (params: URLSearchParams) => {
  const service = params.get("service");
  const pkg = params.get("package");
  const type = params.get("type");
  if (pkg) return `Package inquiry: ${pkg}`;
  if (service) return `Service inquiry: ${service}`;
  if (type === "business") return "Business Internet inquiry";
  if (type === "real-ip") return "Real IP request";
  if (type === "custom") return "Custom package request";
  return "";
};

export function ContactForm({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const t = getPagesDictionary(locale).contact.form;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      await contactApi.submit(payload);
      setStatus("success");
      setMessage(t.success);
      event.currentTarget.reset();
    } catch (error) {
      if (error instanceof ApiNotConfiguredError) {
        setStatus("unavailable-backend");
        setMessage(t.unconfigured.replace("{phone}", company.contact.phone).replace("{email}", company.contact.email));
      } else {
        setStatus("error");
        setMessage(t.error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 shadow-lg shadow-slate-900/5 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-slate-600">{t.fullName}</span>
          <input name="name" required placeholder={t.namePlaceholder} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-slate-600">{t.phone}</span>
          <input name="phone" type="tel" required placeholder={t.phonePlaceholder} className={inputClass} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-slate-600">{t.email}</span>
          <input name="email" type="email" placeholder={t.emailPlaceholder} className={inputClass} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-slate-600">{t.subject}</span>
          <input
            name="subject"
            defaultValue={subjectFromParams(searchParams)}
            placeholder={t.subjectPlaceholder}
            className={inputClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-slate-600">{t.message}</span>
          <textarea name="message" required rows={4} placeholder={t.messagePlaceholder} className={inputClass} />
        </label>
      </div>

      <Button type="submit" className="mt-5 w-full justify-center" disabled={status === "loading"}>
        {status === "loading" ? t.sending : t.send}
      </Button>

      {message && (
        <p className={`mt-4 text-sm ${status === "error" ? "text-red-600" : "text-electric-600"}`}>{message}</p>
      )}
    </form>
  );
}
