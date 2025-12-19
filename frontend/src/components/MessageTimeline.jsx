import React from "react";
import { motion } from "framer-motion";

const MessageTimeline = ({ messages }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.6 }}
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px",
            maxWidth: "600px",
            marginInline: "auto"
          }}
        >
          <p>{msg.text}</p>
          {msg.author && <small>- {msg.author}</small>}
        </motion.div>
      ))}
    </div>
  );
};

export default MessageTimeline;
