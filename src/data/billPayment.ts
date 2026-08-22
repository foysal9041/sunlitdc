import type { Locale } from "@/i18n/config";
import { billPaymentStepsBn, billPaymentNotesBn } from "@/i18n/dictionaries/content";

export interface PaymentStep {
  step: number;
  title: string;
  description: string;
}

const bkashStepsEn: PaymentStep[] = [
  { step: 1, title: "Open the bKash App", description: "Open your bKash App and tap Pay Bill." },
  { step: 2, title: "Search 'STN'", description: "Search for 'STN' and select STN – Internet from the billers list." },
  { step: 3, title: "Select Bill Period", description: "Choose the month you want to pay for and enter your Customer ID." },
  { step: 4, title: "Review Your Bill", description: "Check your bill details — biller, amount and due date — carefully." },
  { step: 5, title: "Confirm & Enter PIN", description: "Tap Next, review the summary and enter your bKash PIN to confirm." },
  { step: 6, title: "Payment Confirmation", description: "On success, you'll get an SMS and in-app payment confirmation." },
];

const paymentNotesEn = [
  "Your Customer ID must be entered correctly.",
  "An additional charge may apply on top of the bill amount.",
  "Confirm your bKash balance covers the bill before paying.",
  "You'll receive an SMS and in-app confirmation once payment succeeds.",
];

export const paymentExample = {
  customerId: "1001",
  billAmount: 525,
  availableBalance: 349.87,
};

export function getBkashSteps(locale: Locale): PaymentStep[] {
  if (locale === "en") return bkashStepsEn;
  return bkashStepsEn.map((s, i) => ({ ...s, ...billPaymentStepsBn[i] }));
}

export function getPaymentNotes(locale: Locale): string[] {
  return locale === "en" ? paymentNotesEn : billPaymentNotesBn;
}
