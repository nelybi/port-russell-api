import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // on supprime l’existant pour éviter les doublons
    await User.deleteMany({ email: "admin@port-russell.local" });

    // on recrée l’admin — le pre('save') va hasher "Admin123!"
    const u = await User.create({
      username: "Admin",
      email: "admin@port-russell.local",
      password: "Admin123!",
    });

    console.log("✅ Admin créé :", u.email);
  } catch (e) {
    console.error("❌ Erreur createAdmin:", e);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();
