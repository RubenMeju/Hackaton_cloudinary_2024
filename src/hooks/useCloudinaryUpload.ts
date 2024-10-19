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
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga

  // Subir imagen
  const handleImageUpload = async (file: File) => {
    setIsLoading(true); // Inicia el loader
    try {
      const uploadedUrl = await uploadImage(file);
      console.log("uploadedUrl: ", uploadedUrl);
      setImageUrl(uploadedUrl);
      setErrorMessage(null);

      // Extrae el public_id de la URL
      const publicId = uploadedUrl.split("/").pop()?.split(".")[0] || "";
      setCurrentPublicId(publicId);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false); // Detén el loader una vez que termine
    }
  };

  // Aplicar reemplazo generativo
  const applyTransformationReplace = async (from: string, to: string) => {
    if (currentPublicId) {
      setIsLoading(true); // Inicia el loader
      try {
        const transformedImageUrl = await applyGenerativeReplace(
          currentPublicId,
          from,
          to
        );
        setTransformedUrl(transformedImageUrl);

        // Actualiza el public_id para usar el de la imagen transformada
        const newPublicId =
          transformedImageUrl.split("/").pop()?.split(".")[0] || "";
        setCurrentPublicId(newPublicId);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false); // Detén el loader
      }
    }
  };

  // Aplicar eliminación generativa
  const applyTransformationRemove = async (inputPrompt: string) => {
    if (currentPublicId) {
      setIsLoading(true); // Inicia el loader
      try {
        const transformedImageUrl = await applyGenerativeRemove(
          currentPublicId,
          inputPrompt
        );
        setTransformedUrl(transformedImageUrl);

        // Actualiza el public_id para usar el de la imagen transformada
        const newPublicId =
          transformedImageUrl.split("/").pop()?.split(".")[0] || "";
        setCurrentPublicId(newPublicId);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false); // Detén el loader
      }
    }
  };

  return {
    imageUrl,
    transformedUrl,
    errorMessage,
    isLoading, // Exponer isLoading para usar en el componente
    handleImageUpload,
    applyTransformationReplace,
    applyTransformationRemove,
  };
};
