import { NextRequest, NextResponse } from "next/server";
import { verifyApiAdminAuth } from "@/lib/auth/session";
import { getEnquiries } from "@/lib/db/repository";

export async function GET(request: NextRequest) {
  const session = await verifyApiAdminAuth(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const list = await getEnquiries();
    return NextResponse.json({ success: true, enquiries: list });
  } catch (error) {
    console.error("[Admin Enquiries GET Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
