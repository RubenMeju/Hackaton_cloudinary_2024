import { useState } from "react";
import {
  uploadImage,
  applyGenerativeReplace,
  applyGenerativeRemove,
} from "../services/cloudinaryService";

export const useCloudinaryUpload = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [transformedUrl, setTransformedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPublicId, setCurrentPublicId] = useState<string | null>(null);

  // Subir imagen
  const handleImageUpload = async (file: File) => {
    try {
      const uploadedUrl = await uploadImage(file);
      console.log("uploadedUrl: ", uploadedUrl);
      setImageUrl(uploadedUrl);
      // setTransformedUrl(uploadedUrl);
      setErrorMessage(null);

      // Extrae el public_id de la URL
      const publicId = uploadedUrl.split("/").pop()?.split(".")[0] || "";
      setCurrentPublicId(publicId);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Aplicar reemplazo generativo
  const applyTransformationReplace = (from: string, to: string) => {
    if (currentPublicId) {
      const transformedImageUrl = applyGenerativeReplace(
        currentPublicId,
        from,
        to
      );
      setTransformedUrl(transformedImageUrl);

      // Actualiza el public_id para usar el de la imagen transformada
      const newPublicId =
        transformedImageUrl.split("/").pop()?.split(".")[0] || "";
      setCurrentPublicId(newPublicId);
    }
  };

  // Aplicar eliminación generativa
  const applyTransformationRemove = (inputPromt: string) => {
    if (currentPublicId) {
      const transformedImageUrl = applyGenerativeRemove(
        currentPublicId,
        inputPromt
      );
      setTransformedUrl(transformedImageUrl);

      // Actualiza el public_id para usar el de la imagen transformada
      const newPublicId =
        transformedImageUrl.split("/").pop()?.split(".")[0] || "";
      setCurrentPublicId(newPublicId);
    }
  };

  return {
    imageUrl,
    transformedUrl,
    errorMessage,
    handleImageUpload,
    applyTransformationReplace,
    applyTransformationRemove,
  };
};
