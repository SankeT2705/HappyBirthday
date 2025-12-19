import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimatedTitle from "../components/AnimatedTitle";
import FloatingGallery from "../components/FloatingGallery";
import MessageTimeline from "../components/MessageTimeline";
import "../styles/preview.css";

const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:5000";

const PreviewPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  // Load last created page from backend (optional UX preview)
  useEffect(() => {
    fetch(`${API_BASE}/api/birthday/latest`)
      .then((res) => {
        if (!res.ok) throw new Error("No preview data");
        return res.json();
      })
      .then(setData)
      .catch(() => navigate("/create"));
  }, [navigate]);

  if (!data) return null;

  return (
    <div className="preview-container">
      <div className="preview-content">
        <AnimatedTitle name={data.name} />

        <FloatingGallery images={data.images} />

        <MessageTimeline messages={data.messages} />

        <motion.button
          className="generate-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/birthday/${data.slug}`)}
        >
          Generate Final Page 🎉
        </motion.button>
      </div>
    </div>
  );
};

export default PreviewPage;
