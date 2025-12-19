import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/*
  MessageSequence
  ----------------
  - Messages appear one-by-one
  - Loading dots between messages
  - Smooth fade + slide + scale animation
  - Emotion-focused timing
*/

const MessageSequence = ({ messages }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < messages.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 1600); // slightly faster, smoother rhythm

      return () => clearTimeout(timer);
    }
  }, [visibleCount, messages.length]);

  return (
    <div className="message-sequence">
      {messages.slice(0, visibleCount).map((msg, index) => (
        <motion.div
          key={index}
          className="message-card"
          initial={{
            opacity: 0,
            y: 14,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
        >
          <p>{msg.text}</p>
          {msg.author && <span>- {msg.author}</span>}
        </motion.div>
      ))}

      {/* Loading indicator between messages */}
      {visibleCount < messages.length && (
        <div className="message-loading">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      )}
    </div>
  );
};

export default MessageSequence;
