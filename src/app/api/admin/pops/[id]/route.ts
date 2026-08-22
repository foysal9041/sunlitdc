import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { popUpdateSchema } from "@/lib/validation";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = popUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
  }

  const existing = await prisma.pointOfPresence.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "PoP not found" }, { status: 404 });
  }

  const updated = await prisma.pointOfPresence.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ pop: updated });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.pointOfPresence.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "PoP not found" }, { status: 404 });
  }

  await prisma.pointOfPresence.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
