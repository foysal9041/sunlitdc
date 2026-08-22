/**
 * Thin API service abstraction so the frontend has a single, typed seam to
 * swap in the real ISP billing/CRM backend later. Every call is
 * unimplemented on purpose — no mock/fake backend is wired up.
 * Customer authentication itself lives outside this app, at
 * company.customerPortalUrl (selfcare.sunlitnetwork.com).
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiNotConfiguredError extends Error {
  constructor(action: string) {
    super(
      `${action} requires NEXT_PUBLIC_API_URL to be configured and the backend endpoint to be implemented.`
    );
    this.name = "ApiNotConfiguredError";
  }
}

export interface AvailabilityQuery {
  district: string;
  area: string;
  phone?: string;
}

export interface AvailabilityResult {
  available: boolean;
  message: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

async function requestJSON<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiNotConfiguredError(`Request to ${path}`);
  }
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const coverageApi = {
  checkAvailability: (query: AvailabilityQuery) =>
    requestJSON<AvailabilityResult>("/coverage/check", {
      method: "POST",
      body: JSON.stringify(query),
    }),
};

export const contactApi = {
  submit: (payload: ContactSubmission) =>
    requestJSON<{ received: boolean }>("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export const billingApi = {
  getInvoices: (customerId: string) =>
    requestJSON<unknown[]>(`/billing/${customerId}/invoices`),
};
