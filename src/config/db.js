import mongoose from "mongoose";

/**
 * Connecte à MongoDB
 * @param {string} uri - URI de connexion MongoDB
 */
export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
