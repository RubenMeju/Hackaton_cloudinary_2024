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
        className="flex items-center justify-center w-full h-32 px-4 border-2 border-purple-800 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 transition duration-300"
      >
        <div className="flex flex-col items-center text-center">
          <span className="mt-2 text-lg text-orange-400 font-bold animate-pulse">
            Sube una imagen
          </span>
          <span className="mt-1 text-sm text-gray-400">Sera terroficio</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-orange-400 mt-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h18M3 12h18M3 21h18M6 3v18M6 12v9"
            />
            <path d="M9 3c0 2.5-2 3.5-2 6s2-3 2-6z" />
            <path d="M15 3c0 2.5 2 3.5 2 6s-2-3-2-6z" />
          </svg>
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
