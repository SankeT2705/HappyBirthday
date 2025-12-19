import mongoose from "mongoose";

const BirthdaySchema = new mongoose.Schema({
  slug: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  messages: { type: Array, default: [] },
  images: { type: [String], default: [] },
    musicUrl: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Birthday", BirthdaySchema);
