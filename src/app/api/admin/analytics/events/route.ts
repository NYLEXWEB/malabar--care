import { NextRequest, NextResponse } from "next/server";
import { verifyApiAdminAuth } from "@/lib/auth/session";
import { getAnalyticsSummary } from "@/lib/db/repository";

export async function GET(request: NextRequest) {
  const session = await verifyApiAdminAuth(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = await getAnalyticsSummary(30);
    return NextResponse.json({
      success: true,
      events: summary.recentEvents,
    });
  } catch (error) {
    console.error("[Admin Analytics Events Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve recent events" },
      { status: 500 }
    );
  }
}
