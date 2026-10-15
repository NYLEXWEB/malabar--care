import { NextRequest, NextResponse } from "next/server";
import { getGridFSFileStream, deleteFromGridFS } from "@/lib/db/gridfs";
import { verifyApiAdminAuth } from "@/lib/auth/session";
import { fallbackStore } from "@/lib/data/fallback-store";
import { Readable } from "stream";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fileResult = await getGridFSFileStream(id);

    if (!fileResult) {
      return NextResponse.json(
        { success: false, error: "Image not found or GridFS unavailable" },
        { status: 404 }
      );
    }

    // Convert Node stream to web ReadableStream
    const webStream = new ReadableStream({
      start(controller) {
        fileResult.stream.on("data", (chunk) => {
          controller.enqueue(chunk);
        });
        fileResult.stream.on("end", () => {
          controller.close();
        });
        fileResult.stream.on("error", (err) => {
          controller.error(err);
        });
      },
    });

    return new Response(webStream, {
      headers: {
        "Content-Type": fileResult.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": `inline; filename="${fileResult.filename}"`,
      },
    });
  } catch (error) {
    console.error("[Media Stream Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to stream image" },
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
    const deletedGrid = await deleteFromGridFS(id);
    const deletedFallback = fallbackStore.deleteMediaAsset(id);

    if (!deletedGrid && !deletedFallback) {
      return NextResponse.json({ success: false, error: "Asset not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Media asset deleted successfully",
    });
  } catch (error) {
    console.error("[Media DELETE Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete media asset" },
      { status: 500 }
    );
  }
}
