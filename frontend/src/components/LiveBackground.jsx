import React from "react";
import { motion } from "framer-motion";

const shapes = Array.from({ length: 12 });

const LiveBackground = () => {
  return (
    <div className="live-bg">
      {shapes.map((_, i) => (
        <motion.div
          key={i}
          className="bg-shape"
          initial={{
            y: "110%",
            x: `${Math.random() * 100}%`,
            opacity: 0.4,
            scale: Math.random() * 0.6 + 0.4
          }}
          animate={{
            y: "-20%",
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

export default LiveBackground;
