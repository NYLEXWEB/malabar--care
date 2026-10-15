import { NextRequest, NextResponse } from "next/server";
import { verifyApiAdminAuth } from "@/lib/auth/session";
import { getVlogs, createVlog } from "@/lib/db/repository";
import { vlogSchema } from "@/lib/validation/schemas";

export async function GET(request: NextRequest) {
  const session = await verifyApiAdminAuth(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const vlogs = await getVlogs(false);
    return NextResponse.json({ success: true, vlogs });
  } catch (error) {
    console.error("[Admin Vlogs GET Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vlogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await verifyApiAdminAuth(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parseResult = vlogSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const created = await createVlog(parseResult.data);
    return NextResponse.json(
      {
        success: true,
        message: "Vlog post created successfully",
        vlog: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Admin Vlog POST Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create vlog" },
      { status: 500 }
    );
  }
}
