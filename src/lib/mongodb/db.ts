import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI!)
      .then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
