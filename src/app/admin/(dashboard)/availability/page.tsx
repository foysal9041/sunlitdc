import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AvailabilityManager } from "@/components/admin/AvailabilityManager";

export const metadata: Metadata = {
  title: "Availability Requests | Sunlit Network Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAvailabilityPage() {
  const requests = await prisma.availabilityRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AvailabilityManager initialRequests={requests} />;
}
