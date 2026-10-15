import { NextRequest, NextResponse } from "next/server";
import { verifyApiAdminAuth } from "@/lib/auth/session";
import { getWebsiteContent, updateWebsiteContent } from "@/lib/db/repository";
import { websiteContentSchema } from "@/lib/validation/schemas";

export async function GET(request: NextRequest) {
  const session = await verifyApiAdminAuth(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await getWebsiteContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("[Admin Content GET Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to load content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await verifyApiAdminAuth(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parseResult = websiteContentSchema.safeParse(body);

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

    const updated = await updateWebsiteContent(parseResult.data);
    return NextResponse.json({
      success: true,
      message: "Website content updated successfully",
      content: updated,
    });
  } catch (error) {
    console.error("[Admin Content PUT Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to save website content" },
      { status: 500 }
    );
  }
}
