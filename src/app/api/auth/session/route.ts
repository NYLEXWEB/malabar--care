import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";
import { getDbStatus } from "@/lib/db/connection";

export async function GET() {
  const session = await getServerSession();
  const dbStatus = getDbStatus();

  if (!session) {
    return NextResponse.json({
      authenticated: false,
      user: null,
      database: dbStatus,
    });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      username: session.username,
      role: session.role,
    },
    database: dbStatus,
  });
}
