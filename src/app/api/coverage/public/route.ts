import { NextResponse } from "next/server";
import { getPublicCoverageData } from "@/lib/coverage";

export async function GET() {
  const data = await getPublicCoverageData();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
  });
}
