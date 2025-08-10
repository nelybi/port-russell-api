import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Catway from "../models/Catway.js";
import Reservation from "../models/Reservation.js";
import User from "../models/User.js";

dotenv.config();

const __dirname = path.resolve();

async function run() {
  await connectDB(process.env.MONGODB_URI);

  // Import catways
  const catways = JSON.parse(
    fs.readFileSync(path.join(__dirname, "catways.json"), "utf-8")
  );
  await Catway.deleteMany({});
  await Catway.insertMany(catways);

  // Import reservations
  const reservations = JSON.parse(
    fs.readFileSync(path.join(__dirname, "reservations.json"), "utf-8")
  );
  await Reservation.deleteMany({});
  await Reservation.insertMany(reservations);

  // Création d'un utilisateur admin
  await User.deleteMany({});
  await User.create({
    username: "Admin",
    email: "admin@port-russell.local",
    password: "Admin123!",
  });

  console.log("✅ Données importées + admin créé");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
