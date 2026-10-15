import { NextRequest, NextResponse } from "next/server";
import { getVlogBySlug } from "@/lib/db/repository";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vlog = await getVlogBySlug(slug);

    if (!vlog || vlog.status !== "published") {
      return NextResponse.json(
        { success: false, error: "Vlog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, vlog });
  } catch (error) {
    console.error("[Public Vlog Detail Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vlog" },
      { status: 500 }
    );
  }
}
