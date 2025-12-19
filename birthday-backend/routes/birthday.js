import express from "express";
import { nanoid } from "nanoid";
import Birthday from "../models/Birthday.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/* ============================
   CREATE BIRTHDAY PAGE
============================ */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      messages = [],
      images = [],
      music = null, // 🎵 NEW
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }

    const slug = `${name
      .toLowerCase()
      .replace(/\s+/g, "-")}-${nanoid(6)}`;

    /* ----------------------------
       Upload Images (Cloudinary)
    ----------------------------- */
    const uploadedImages = [];

    if (Array.isArray(images) && images.length > 0) {
      for (const base64 of images) {
        if (typeof base64 === "string" && base64.startsWith("data:image")) {
          const upload = await cloudinary.uploader.upload(base64, {
            folder: "birthday-images",
          });
          uploadedImages.push(upload.secure_url);
        }
      }
    }

    /* ----------------------------
       Upload Music (Optional)
       NOTE: Cloudinary uses
       resource_type: "video"
       for audio files
    ----------------------------- */
    let musicUrl = null;

    if (music && typeof music === "string" && music.startsWith("data:audio")) {
      const upload = await cloudinary.uploader.upload(music, {
        folder: "birthday-music",
        resource_type: "video", // 👈 REQUIRED for audio
      });
      musicUrl = upload.secure_url;
    }

    /* ----------------------------
       Save Page in MongoDB
    ----------------------------- */
    const page = await Birthday.create({
      slug,
      name,
      messages,
      images: uploadedImages,
      musicUrl, // 🎵 NEW
    });

    res.status(201).json({ slug: page.slug });
  } catch (error) {
    console.error("CREATE PAGE ERROR:", error);
    res.status(500).json({ error: "Failed to create page" });
  }
});

/* ============================
   FETCH BIRTHDAY PAGE
============================ */
router.get("/:slug", async (req, res) => {
  try {
    const page = await Birthday.findOne({ slug: req.params.slug });

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.json(page);
  } catch (error) {
    console.error("FETCH PAGE ERROR:", error);
    res.status(500).json({ error: "Failed to fetch page" });
  }
});

export default router;
