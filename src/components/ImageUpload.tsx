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
    <div className="mb-4">
      <label
        htmlFor="imageUpload"
        className="flex items-center justify-center w-full h-32 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100"
      >
        <div className="flex flex-col items-center">
          <span className="mt-2 text-sm text-orange-600">Upload an image</span>
        </div>
        <input
          id="imageUpload"
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/*"
        />
      </label>
    </div>
  );
};

export default ImageUpload;
