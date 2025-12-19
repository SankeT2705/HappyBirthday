import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageInput from "../components/MessageInput";
import ImageUploader from "../components/ImageUploader";
import MusicUploader from "../components/MusicUploader";
import "../styles/createPage.css";

const API_BASE = process.env.REACT_APP_API_BASE || "";

const CreatePage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [messages, setMessages] = useState([{ text: "", author: "" }]);
  const [images, setImages] = useState([]);
  const [music, setMusic] = useState(null);
  const [loading, setLoading] = useState(false);

  // Convert File -> Base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleGenerate = async () => {
    if (!name.trim()) {
      alert("Please enter birthday person name");
      return;
    }

    const filteredMessages = messages.filter(
      (m) => m.text.trim() !== ""
    );

    try {
      setLoading(true);

      // Convert images to base64
      const base64Images = await Promise.all(
        images.map((file) => fileToBase64(file))
      );

      // Convert music to base64 (optional)
      const musicBase64 = music ? await fileToBase64(music) : null;

      const payload = {
        name,
        messages: filteredMessages,
        images: base64Images,
        music: musicBase64, // ✅ NEW
      };

      const res = await fetch(`${API_BASE}/api/birthday`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json();

      if (!data.slug) {
        throw new Error("Slug not returned");
      }

      navigate(`/birthday/${data.slug}`);
    } catch (err) {
      console.error("CREATE ERROR:", err);
      alert("Failed to generate birthday page");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <h1>Create Birthday Page 🎂</h1>

      {/* NAME */}
      <div className="card">
        <label>Birthday Person Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* MESSAGES */}
      <MessageInput messages={messages} setMessages={setMessages} />

      {/* IMAGES */}
      <ImageUploader images={images} setImages={setImages} />

      {/* MUSIC (OPTIONAL) */}
      <MusicUploader music={music} setMusic={setMusic} />

      {/* TEMPLATE */}
      <div className="card">
        <label>Template</label>
        <input type="text" value="Default Celebration Template" disabled />
      </div>

      {/* GENERATE */}
      <button
        className="generate-btn"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Birthday Page 🎉"}
      </button>
    </div>
  );
};

export default CreatePage;
