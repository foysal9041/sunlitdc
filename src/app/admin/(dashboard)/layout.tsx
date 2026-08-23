import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const newRequestCount = await prisma.availabilityRequest.count({ where: { status: "NEW" } });

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <header className="border-b border-white/10 bg-navy-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/admin/coverage" className="text-sm font-bold tracking-wide text-white">
            SUNLIT <span className="text-cyan-300">NOC ADMIN</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/admin/coverage" className="text-sm text-slate-300 hover:text-white">
              PoP Management
            </Link>
            <Link href="/admin/availability" className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white">
              Availability Requests
              {newRequestCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-electric-500 px-1.5 text-xs font-bold text-white">
                  {newRequestCount}
                </span>
              )}
            </Link>
            <span className="hidden text-sm text-slate-500 sm:inline">
              {session.name} · {session.role}
            </span>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8">{children}</main>
    </div>
  );
}
