import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import AnimatedTitle from "../components/AnimatedTitle";
import FloatingGallery from "../components/FloatingGallery";
import MessageSequence from "../components/MessageSequence";
import LiveBackground from "../components/LiveBackground";
import MusicPlayer from "../components/MusicPlayer"; // 🎵 ADD
import "../styles/birthday.css";

// ✅ Works for local & production
const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:5000";

const BirthdayPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!slug) {
      navigate("/create", { replace: true });
      return;
    }

    let timer;

    fetch(`${API_BASE}/api/birthday/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((page) => {
        setData(page);
        timer = setTimeout(() => setStart(true), 1500);
      })
      .catch(() => navigate("/create", { replace: true }));

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [slug, navigate]);

  // ✅ Clean single loading state
  if (!data || !start) {
    return (
      <div className="loader">
        🎁 Preparing your surprise...
      </div>
    );
  }

  return (
    <div className="birthday-container background-blobs">
      <LiveBackground />

      {/* Confetti once */}
      <Confetti recycle={false} numberOfPieces={350} />

      <AnimatedTitle name={data.name} />

      <div className="birthday-layout">
        <MessageSequence messages={data.messages} />
        <FloatingGallery images={data.images} />
      </div>

      {/* 🎵 USER-UPLOADED MUSIC */}
      <MusicPlayer musicUrl={data.musicUrl} />
    </div>
  );
};

export default BirthdayPage;
