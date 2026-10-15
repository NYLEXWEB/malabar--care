import { NextResponse } from "next/server";
import { getWebsiteContent } from "@/lib/db/repository";

export async function GET() {
  try {
    const content = await getWebsiteContent();
    return NextResponse.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("[Public Content API Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve website content" },
      { status: 500 }
    );
  }
}
