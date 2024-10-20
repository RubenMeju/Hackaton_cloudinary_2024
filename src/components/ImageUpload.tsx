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
    <div className="max-w-2xl m-auto">
      <label
        htmlFor="imageUpload"
        className="flex items-center justify-center w-full px-4 py-2 border-2 border-purple-800 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 transition duration-300"
      >
        <div className="flex flex-col items-center text-center">
          <span className="text-lg text-orange-400 font-bold animate-pulse">
            Sube una imagen
          </span>
          <span className="mt-1 text-sm text-gray-400">Sera terroficio</span>
          <span className="text-3xl">🎃</span>
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
