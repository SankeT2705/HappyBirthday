import React from "react";

const ImageUploader = ({ images, setImages }) => {
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    // limit to 10 images
    const updated = [...images, ...files].slice(0, 10);
    setImages(updated);

    // reset input so same file can be selected again
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="card">
      <h3>Upload Images 📸</h3>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
      />

      <div className="image-preview">
        {images.map((file, index) => (
          <div key={index} className="image-box">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
            />
            <button onClick={() => removeImage(index)}>✕</button>
          </div>
        ))}
      </div>

      <p className="hint">Max 10 images • Max 5MB each</p>
    </div>
  );
};

export default ImageUploader;
