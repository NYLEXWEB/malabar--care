import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation/schemas";
import { createEnquiry } from "@/lib/db/repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = enquirySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all required fields correctly.",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const enquiry = await createEnquiry(parseResult.data);
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your quote request has been received. Our team will contact you promptly.",
        enquiryId: enquiry._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Enquiry POST Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry. Please try again." },
      { status: 500 }
    );
  }
}
