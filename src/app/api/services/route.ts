import { NextResponse } from "next/server";
import { getServices } from "@/lib/db/repository";

export async function GET() {
  try {
    const services = await getServices(true);
    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("[Public Services GET Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
