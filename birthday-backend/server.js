import dotenv from "dotenv";
dotenv.config(); // ✅ MUST BE FIRST LINE

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import birthdayRoutes from "./routes/birthday.js";

// 🔎 PROOF LOG (TEMPORARY)
console.log("ENV CHECK:");
console.log("CLOUDINARY_CLOUD_NAME =", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY =", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET =", process.env.CLOUDINARY_API_SECRET);

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("🎂 Birthday Backend is running");
});

app.use("/api/birthday", birthdayRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
