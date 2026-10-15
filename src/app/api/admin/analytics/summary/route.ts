import { NextRequest, NextResponse } from "next/server";
import { verifyApiAdminAuth } from "@/lib/auth/session";
import { getAnalyticsSummary } from "@/lib/db/repository";

export async function GET(request: NextRequest) {
  const session = await verifyApiAdminAuth(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get("days") || "30", 10);
    const summary = await getAnalyticsSummary(days);

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error("[Admin Analytics Summary Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to compile analytics summary" },
      { status: 500 }
    );
  }
}
