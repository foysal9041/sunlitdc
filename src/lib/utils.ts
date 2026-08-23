type ClassValue = string | number | null | undefined | false | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }
  return out.join(" ");
}

export function formatBDT(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

export function formatNumber(value: number, useGrouping = true): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 1,
    useGrouping,
  }).format(value);
}

/**
 * Builds a wa.me link from a local Bangladeshi number (e.g. "01334-921013").
 * wa.me requires the full international number with country code and no
 * leading 0 (e.g. "8801334921013") — a bare local number silently fails to
 * open a chat.
 */
export function whatsappLink(localNumber: string): string {
  const digits = localNumber.replace(/\D/g, "").replace(/^0+/, "");
  return `https://wa.me/880${digits}`;
}
