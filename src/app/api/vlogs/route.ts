import { NextResponse } from "next/server";
import { getVlogs } from "@/lib/db/repository";

export async function GET() {
  try {
    const vlogs = await getVlogs(true);
    return NextResponse.json({ success: true, vlogs });
  } catch (error) {
    console.error("[Public Vlogs GET Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vlogs" },
      { status: 500 }
    );
  }
}
