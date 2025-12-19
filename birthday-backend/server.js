import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import birthdayRoutes from "./routes/birthday.js";

const app = express();

// DB connection (safe for serverless)
connectDB();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("🎂 Birthday Backend is running");
});

app.use("/api/birthday", birthdayRoutes);

// ❌ DO NOT listen on Vercel
// app.listen(...)

// ✅ EXPORT for Vercel
export default app;
