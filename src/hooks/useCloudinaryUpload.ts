import { useState } from "react";
import {
  uploadImage,
  applyGenerativeReplace,
} from "../services/cloudinaryService";

export const useCloudinaryUpload = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [transformedUrl, setTransformedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    try {
      const uploadedUrl = await uploadImage(file);
      setImageUrl(uploadedUrl);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const applyTransformation = (publicId: string, from: string, to: string) => {
    const transformedImageUrl = applyGenerativeReplace(publicId, from, to);
    setTransformedUrl(transformedImageUrl);
  };

  return {
    imageUrl,
    transformedUrl,
    errorMessage,
    handleImageUpload,
    applyTransformation,
  };
};
