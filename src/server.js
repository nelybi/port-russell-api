import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const { PORT = 3000, MONGODB_URI } = process.env;

await connectDB(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
