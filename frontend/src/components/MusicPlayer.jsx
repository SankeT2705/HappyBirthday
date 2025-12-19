import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

/*
  MusicPlayer
  -----------
  - Plays user-uploaded music (Cloudinary URL)
  - No autoplay (browser-safe)
  - Smooth fade-in
  - Floating control button
*/

const MusicPlayer = ({ musicUrl }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // If no music provided, render nothing
  if (!musicUrl) return null;

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (!playing) {
      audioRef.current.volume = 0;
      audioRef.current.play();

      // Smooth fade-in
      let vol = 0;
      const fade = setInterval(() => {
        vol += 0.05;
        audioRef.current.volume = Math.min(vol, 1);
        if (vol >= 1) clearInterval(fade);
      }, 150);
    } else {
      audioRef.current.pause();
    }

    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={musicUrl} type="audio/mpeg" />
      </audio>

      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          background: "linear-gradient(135deg, #4caf50, #2196f3)",
          color: "#fff",
          border: "none",
          padding: "12px 18px",
          borderRadius: "30px",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          fontWeight: "500",
        }}
      >
        {playing ? "Pause Music ⏸️" : "Play Music 🎵"}
      </motion.button>
    </>
  );
};

export default MusicPlayer;
