import { NextRequest, NextResponse } from "next/server";
import { verifyApiAdminAuth } from "@/lib/auth/session";
import { getServices, createService } from "@/lib/db/repository";
import { serviceSchema } from "@/lib/validation/schemas";

export async function GET(request: NextRequest) {
  const session = await verifyApiAdminAuth(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await getServices(false);
    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("[Admin Services GET Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
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
    const parseResult = serviceSchema.safeParse(body);

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

    const created = await createService(parseResult.data);
    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        service: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Admin Service POST Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create service" },
      { status: 500 }
    );
  }
}
