import React from "react";

const MusicUploader = ({ music, setMusic }) => {
  const handleMusic = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      alert("Please upload a valid audio file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Music file must be under 10MB");
      return;
    }

    setMusic(file);
  };

  return (
    <div className="card">
      <h3>Upload Music 🎵 (Optional)</h3>

      <input type="file" accept="audio/*" onChange={handleMusic} />

      {music && (
        <p style={{ marginTop: "8px", fontSize: "14px" }}>
          🎶 {music.name}
        </p>
      )}
    </div>
  );
};

export default MusicUploader;
