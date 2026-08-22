import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PopManager } from "@/components/admin/PopManager";

export const metadata: Metadata = {
  title: "PoP Management | Sunlit Network Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminCoveragePage() {
  const pops = await prisma.pointOfPresence.findMany({
    orderBy: [{ district: "asc" }, { generalArea: "asc" }],
  });

  return <PopManager initialPops={pops} />;
}
