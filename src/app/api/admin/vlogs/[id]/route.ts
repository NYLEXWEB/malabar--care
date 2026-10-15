import { NextRequest, NextResponse } from "next/server";
import { verifyApiAdminAuth } from "@/lib/auth/session";
import { updateVlog, deleteVlog } from "@/lib/db/repository";
import { vlogSchema } from "@/lib/validation/schemas";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyApiAdminAuth(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parseResult = vlogSchema.partial().safeParse(body);

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

    const updated = await updateVlog(id, parseResult.data);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Vlog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Vlog post updated successfully",
      vlog: updated,
    });
  } catch (error) {
    console.error("[Admin Vlog PUT Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to update vlog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyApiAdminAuth(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const deleted = await deleteVlog(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Vlog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Vlog post deleted successfully",
    });
  } catch (error) {
    console.error("[Admin Vlog DELETE Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete vlog" },
      { status: 500 }
    );
  }
}
