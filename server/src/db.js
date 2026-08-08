import mongoose from "mongoose";

const state = {
  connected: false
};

export async function connectDB(uri) {
  if (!uri) {
    console.log("[db] MONGODB_URI not set - running with in-memory storage");
    return;
  }
  try {
    await mongoose.connect(uri);
    state.connected = true;
    console.log("[db] MongoDB connected");
  } catch (err) {
    console.warn("[db] MongoDB connection failed, falling back to in-memory storage:", err.message);
  }
}

export function isConnected() {
  return state.connected;
}