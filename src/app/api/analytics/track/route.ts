import { NextRequest, NextResponse } from "next/server";
import { analyticsTrackSchema } from "@/lib/validation/schemas";
import { trackAnalyticsEvent } from "@/lib/db/repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = analyticsTrackSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: "Invalid analytics event format" },
        { status: 400 }
      );
    }

    const event = await trackAnalyticsEvent({
      ...parseResult.data,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true, eventId: event._id });
  } catch (error) {
    console.error("[Analytics Track Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to record event" },
      { status: 500 }
    );
  }
}
