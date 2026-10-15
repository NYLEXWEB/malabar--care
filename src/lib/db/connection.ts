import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  isAvailable: boolean;
  statusMessage: string;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  isAvailable: false,
  statusMessage: "Uninitialized",
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<{
  isConnected: boolean;
  mongooseInstance: typeof mongoose | null;
  message: string;
}> {
  if (!MONGODB_URI) {
    cached.isAvailable = false;
    cached.statusMessage = "MONGODB_URI not set. Running in Demo In-Memory mode.";
    return {
      isConnected: false,
      mongooseInstance: null,
      message: cached.statusMessage,
    };
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return {
      isConnected: true,
      mongooseInstance: cached.conn,
      message: "Connected to MongoDB Atlas",
    };
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        cached.conn = m;
        cached.isAvailable = true;
        cached.statusMessage = "Connected to MongoDB Atlas";
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        cached.conn = null;
        cached.isAvailable = false;
        cached.statusMessage = `MongoDB connection error: ${err.message}`;
        console.warn("[MongoDB] Connection warning:", err.message);
        throw err;
      });
  }

  try {
    const conn = await cached.promise;
    return {
      isConnected: true,
      mongooseInstance: conn,
      message: "Connected to MongoDB Atlas",
    };
  } catch {
    return {
      isConnected: false,
      mongooseInstance: null,
      message: cached.statusMessage,
    };
  }
}

export function isDbConnected(): boolean {
  return cached.isAvailable && mongoose.connection.readyState === 1;
}

export function getDbStatus(): { isConnected: boolean; message: string } {
  return {
    isConnected: cached.isAvailable && mongoose.connection.readyState === 1,
    message: cached.statusMessage,
  };
}
