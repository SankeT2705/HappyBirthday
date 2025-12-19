import React from "react";
import { motion } from "framer-motion";

const AnimatedTitle = ({ name }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{ fontSize: "40px", marginBottom: "20px" }}
    >
      🎉 Happy Birthday {name} 🎂
    </motion.h1>
  );
};

export default AnimatedTitle;
