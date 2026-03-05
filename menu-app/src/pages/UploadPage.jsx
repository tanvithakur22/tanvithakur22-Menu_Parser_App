import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export default function UploadPage() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please select a JPG or PNG image.");
      setImageFile(null);
      setPreviewUrl("");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFindDishes = () => {
    if (imageFile) {
      navigate("/loading", { state: { imageFile } });
    }
  };

  return (
  <div className="upload-page">
    <header className="upload-header center-text">
  <h1 className="brand-title">What’s On My Menu?</h1>
  <p className="brand-tagline">
    “Upload or capture a restaurant menu image to discover dishes with photos”
  </p>
</header>


    <main className="upload-main">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        capture="environment"
        onChange={handleFileChange}
        className="hidden-file-input"
      />

      <div
        className="upload-dropzone"
        onClick={() => fileInputRef.current.click()}
      >
        <div className="upload-plus">
  <span className="icon-plus">+</span>
  <span className="icon-camera">📷</span>
</div>

        <div className="upload-text">
          <span className="text-file">{imageFile ? "Choose another image" : "Choose menu image"}</span>
  <span className="text-camera">{imageFile ? "Capture another image" : "Capture menu image"}</span>
  </div>
        <div className="upload-helper">
          JPG or PNG or JPEG
        </div>
      </div>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Menu preview"
          className="image-preview"
        />
      )}

      {error && <div className="error">{error}</div>}

      <button
        type="button"
        className="gradient-button"
        disabled={!imageFile}
        onClick={handleFindDishes}
      >
        Find Dishes
      </button>
    </main>
  </div>
);

}
