import React from "react";
import { motion } from "framer-motion";

/*
  FloatingGallery
  ----------------
  - Collage-style layout
  - Photo-frame appearance
  - Uses Cloudinary image URLs
*/

const FloatingGallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="gallery">
      <div className="collage">
        {images.map((url, index) => (
          <motion.div
            key={index}
            className="photo-frame"
            initial={{
              opacity: 0,
              y: 20,
              rotate: index % 2 === 0 ? -2 : 2,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: index % 2 === 0 ? -2 : 2,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.06,
              rotate: 0,
            }}
          >
            <img src={url} alt="memory" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FloatingGallery;
