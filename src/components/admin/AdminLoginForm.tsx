"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Invalid credentials.");
        setLoading(false);
        return;
      }

      const from = searchParams.get("from");
      router.replace(from && from.startsWith("/admin") ? from : "/admin/coverage");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
      <h1 className="text-xl font-bold text-white">Sunlit Network — NOC Admin</h1>
      <p className="mt-1.5 text-sm text-slate-400">Sign in to manage network coverage.</p>

      <label className="mt-6 block">
        <span className="mb-1.5 block text-xs font-medium text-slate-400">Email</span>
        <input
          name="email"
          type="email"
          required
          autoFocus
          autoComplete="username"
          className="w-full rounded-lg border border-white/10 bg-navy-900/70 px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400/50"
        />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-medium text-slate-400">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-white/10 bg-navy-900/70 px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400/50"
        />
      </label>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-linear-to-r from-electric-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-navy-950 transition-opacity disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
