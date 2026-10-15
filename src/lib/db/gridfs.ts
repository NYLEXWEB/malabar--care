import { GridFSBucket, ObjectId } from "mongodb";
import mongoose from "mongoose";
import { connectToDatabase } from "./connection";

let bucket: GridFSBucket | null = null;

export async function getGridFSBucket(): Promise<GridFSBucket | null> {
  const dbStatus = await connectToDatabase();
  if (!dbStatus.isConnected || !mongoose.connection.db) {
    return null;
  }

  if (!bucket) {
    bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "media_uploads",
    });
  }

  return bucket;
}

export async function uploadToGridFS(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<{ fileId: string; filename: string; size: number } | null> {
  const gridFs = await getGridFSBucket();
  if (!gridFs) return null;

  return new Promise((resolve, reject) => {
    // Sanitize filename to prevent directory traversal or unsafe characters
    const safeName = filename.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
    const uniqueFilename = `${Date.now()}-${safeName}`;

    const uploadStream = gridFs.openUploadStream(uniqueFilename, {
      contentType,
      metadata: {
        originalName: filename,
        uploadedAt: new Date(),
      },
    });

    uploadStream.on("finish", () => {
      resolve({
        fileId: uploadStream.id.toString(),
        filename: uniqueFilename,
        size: buffer.length,
      });
    });

    uploadStream.on("error", (err) => {
      reject(err);
    });

    uploadStream.end(buffer);
  });
}

export async function getGridFSFileStream(fileId: string) {
  const gridFs = await getGridFSBucket();
  if (!gridFs) return null;

  try {
    const objectId = new ObjectId(fileId);
    const files = await gridFs.find({ _id: objectId }).toArray();
    if (!files || files.length === 0) return null;

    const file = files[0];
    const stream = gridFs.openDownloadStream(objectId);
    return {
      stream,
      file,
      contentType: file.contentType || "application/octet-stream",
      filename: file.filename,
    };
  } catch {
    return null;
  }
}

export async function deleteFromGridFS(fileId: string): Promise<boolean> {
  const gridFs = await getGridFSBucket();
  if (!gridFs) return false;

  try {
    const objectId = new ObjectId(fileId);
    await gridFs.delete(objectId);
    return true;
  } catch {
    return false;
  }
}
