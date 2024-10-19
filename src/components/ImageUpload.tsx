import React from "react";

interface ImageUploadProps {
  onUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <h2>Subir Imagen</h2>
      <input type="file" onChange={handleChange} accept="image/*" />
    </div>
  );
};

export default ImageUpload;
