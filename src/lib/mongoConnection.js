import mongoose from "mongoose";

const MONGO_URI = process.env.NEXT_MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Not defined mongo uri");
}

let cache = global.mongoose || { conn: null };

export async function mongoConnect() {
  if (cache.conn) return cache.conn;
  cache.conn = await mongoose.connect(MONGO_URI);
  global.mongoose = cache.conn;
  return cache.conn;
}
