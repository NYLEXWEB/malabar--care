import { NextRequest, NextResponse } from "next/server";
import { getServerSession, verifyApiAdminAuth } from "@/lib/auth/session";
import { connectToDatabase, getDbStatus } from "@/lib/db/connection";

export async function GET(request: NextRequest) {
  await connectToDatabase();
  const session = (await verifyApiAdminAuth(request)) || (await getServerSession());
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
