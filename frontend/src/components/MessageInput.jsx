import React from "react";

const MessageInput = ({ messages, setMessages }) => {
  const addMessage = () => {
    setMessages([...messages, { text: "", author: "" }]);
  };

  const removeMessage = (index) => {
    const updated = messages.filter((_, i) => i !== index);
    setMessages(updated);
  };

  const updateMessage = (index, field, value) => {
    const updated = [...messages];
    updated[index][field] = value;
    setMessages(updated);
  };

  return (
    <div className="card">
      <h3>Messages 💌</h3>

      {messages.map((msg, index) => (
        <div key={index} className="message-box">
          <textarea
            placeholder="Write your message"
            value={msg.text}
            onChange={(e) =>
              updateMessage(index, "text", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="From (optional)"
            value={msg.author}
            onChange={(e) =>
              updateMessage(index, "author", e.target.value)
            }
          />

          {messages.length > 1 && (
            <button
              className="remove-btn"
              onClick={() => removeMessage(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button className="add-btn" onClick={addMessage}>
        + Add Another Message
      </button>
    </div>
  );
};

export default MessageInput;
