import { useState } from "react";
import {
  uploadImage,
  applyGenerativeReplace,
  applyGenerativeRemove,
  applyGenerativeBackgroundReplace,
} from "../services/cloudinaryService";

// Función auxiliar para extraer el publicId correctamente eliminando cualquier parámetro de consulta
const extractPublicId = (url: string): string => {
  // Tomamos la parte antes del `?` (si existe)
  const [publicId] = url.split("?")[0].split("/").pop()?.split(".") || [];
  return publicId;
};

export const useCloudinaryUpload = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [transformedUrl, setTransformedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPublicId, setCurrentPublicId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga

  // Subir imagen
  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const uploadedUrl = await uploadImage(file);
      setImageUrl(uploadedUrl);
      setErrorMessage(null);

      // Extrae el public_id de la URL
      const publicId = extractPublicId(uploadedUrl);

      console.log("uploadedUrl: ", uploadedUrl);
      console.log("public_id: ", publicId);

      setCurrentPublicId(publicId); // Guardamos el publicId inicial de la imagen subida
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Aplicar reemplazo generativo (Activa loader solo durante la transformación)
  const applyTransformationReplace = async (from: string, to: string) => {
    if (currentPublicId) {
      console.log(
        "currentPublicId en applyGenerativeReplace: ",
        currentPublicId
      );
      setIsLoading(true); // Inicia el loader para la transformación
      try {
        const transformedImageUrl = await applyGenerativeReplace(
          currentPublicId,
          from,
          to
        );
        setTransformedUrl(transformedImageUrl);

        // Extraemos el nuevo public_id limpio (sin parámetros de consulta)
        const newPublicId = extractPublicId(transformedImageUrl);
        console.log("newPublicId after Replace: ", newPublicId);

        // Actualizamos el currentPublicId con el nuevo publicId de la imagen transformada
        setCurrentPublicId(newPublicId);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Aplicar eliminación generativa (Activa loader solo durante la transformación)
  const applyTransformationRemove = async (inputPrompt: string) => {
    if (currentPublicId) {
      setIsLoading(true); // Inicia el loader para la transformación
      try {
        const transformedImageUrl = await applyGenerativeRemove(
          currentPublicId,
          inputPrompt
        );
        setTransformedUrl(transformedImageUrl);

        // Extraemos el nuevo public_id limpio (sin parámetros de consulta)
        const newPublicId = extractPublicId(transformedImageUrl);
        console.log("newPublicId after Remove: ", newPublicId);

        // Actualizamos el currentPublicId con el nuevo publicId de la imagen transformada
        setCurrentPublicId(newPublicId);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Aplicar cambio background (Activa loader solo durante la transformación)
  const applyTransformationRemoveBackground = async (inputPrompt: string) => {
    if (currentPublicId) {
      setIsLoading(true); // Inicia el loader para la transformación
      try {
        const transformedImageUrl = await applyGenerativeBackgroundReplace(
          currentPublicId,
          inputPrompt
        );
        setTransformedUrl(transformedImageUrl);

        // Extraemos el nuevo public_id limpio (sin parámetros de consulta)
        const newPublicId = extractPublicId(transformedImageUrl);
        console.log("newPublicId after Remove: ", newPublicId);

        // Actualizamos el currentPublicId con el nuevo publicId de la imagen transformada
        setCurrentPublicId(newPublicId);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
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
    applyTransformationRemoveBackground,
  };
};
