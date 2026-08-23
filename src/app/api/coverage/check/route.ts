import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { availabilityInputSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = availabilityInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
  }

  await prisma.availabilityRequest.create({
    data: {
      district: parsed.data.district,
      area: parsed.data.area,
      phone: parsed.data.phone || null,
    },
  });

  return NextResponse.json({ received: true }, { status: 201 });
}
