import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation/schemas";
import { verifyAdminCredentials } from "@/lib/db/repository";
import { setSessionCookie } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = loginSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { username, password } = parseResult.data;
    const authResult = await verifyAdminCredentials(username, password);

    if (!authResult.valid || !authResult.user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin username or password.",
        },
        { status: 401 }
      );
    }

    const token = await setSessionCookie({
      userId: authResult.user.userId,
      username: authResult.user.username,
      role: authResult.user.role,
    });

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      token,
      user: {
        username: authResult.user.username,
        role: authResult.user.role,
      },
    });
  } catch (error) {
    console.error("[Login API Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: "An internal authentication error occurred.",
      },
      { status: 500 }
    );
  }
}
