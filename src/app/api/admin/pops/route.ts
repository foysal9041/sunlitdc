import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { popInputSchema } from "@/lib/validation";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pops = await prisma.pointOfPresence.findMany({
    orderBy: [{ district: "asc" }, { generalArea: "asc" }],
  });
  return NextResponse.json({ pops });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = popInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
  }

  const created = await prisma.pointOfPresence.create({ data: parsed.data });
  return NextResponse.json({ pop: created }, { status: 201 });
}
