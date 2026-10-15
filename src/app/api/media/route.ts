import { NextRequest, NextResponse } from "next/server";
import { verifyApiAdminAuth } from "@/lib/auth/session";
import { uploadToGridFS } from "@/lib/db/gridfs";
import { getMediaAssetsList, recordMediaAsset } from "@/lib/db/repository";
import { connectToDatabase, isDbConnected } from "@/lib/db/connection";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function GET() {
  try {
    const { isConnected } = await connectToDatabase();
    const assets = await getMediaAssetsList();
    return NextResponse.json({
      success: true,
      storageMode: isConnected ? "gridfs" : "local_fallback",
      assets,
    });
  } catch (error) {
    console.error("[Media GET Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to load media assets" },
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
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Only JPEG, PNG, WebP, SVG, and GIF are allowed.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "File is too large. Maximum allowed size is 5MB.",
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // If MongoDB is connected, upload to MongoDB GridFS!
    const { isConnected } = await connectToDatabase();
    if (isConnected) {
      try {
        const uploadResult = await uploadToGridFS(buffer, file.name, file.type);
        if (uploadResult) {
          const mediaRecord = await recordMediaAsset({
            fileId: uploadResult.fileId,
            filename: uploadResult.filename,
            originalName: file.name,
            contentType: file.type,
            size: uploadResult.size,
            url: `/api/media/${uploadResult.fileId}`,
            uploadedBy: session.username,
            storageMode: "gridfs",
          });

          return NextResponse.json(
            {
              success: true,
              message: "Image uploaded and stored in MongoDB GridFS successfully",
              asset: mediaRecord,
            },
            { status: 201 }
          );
        }
      } catch (gridErr) {
        console.warn("[GridFS upload error, falling back]", gridErr);
      }
    }

    // In demo / fallback mode: register demo asset
    const fallbackId = `media_${Date.now()}`;
    const mediaRecord = await recordMediaAsset({
      fileId: fallbackId,
      filename: file.name,
      originalName: file.name,
      contentType: file.type,
      size: file.size,
      url: `/images/hero.jpg`, // Preview reference for demo
      uploadedBy: session.username,
      storageMode: "local_fallback",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Image processed in Demo Local Mode (Configure MONGODB_URI to stream directly to GridFS)",
        asset: mediaRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Media Upload POST Error]", error);
    return NextResponse.json(
      { success: false, error: "Image upload processing failed" },
      { status: 500 }
    );
  }
}
