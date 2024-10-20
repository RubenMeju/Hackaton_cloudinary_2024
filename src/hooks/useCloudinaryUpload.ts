import { useState } from "react";
import {
  uploadImage,
  applyGenerativeReplace,
  applyGenerativeRemove,
  applyGenerativeBackgroundReplace,
  uploadTransformedImage, // Nueva función para guardar la imagen transformada
} from "../services/cloudinaryService";

// Función auxiliar para extraer el publicId correctamente eliminando cualquier parámetro de consulta
const extractPublicId = (url: string): string => {
  const [publicId] = url.split("?")[0].split("/").pop()?.split(".") || [];
  return publicId;
};

const urlFirstImg =
  "https://res.cloudinary.com/meju/image/upload/v1729449267/zlnmn8wiblyolg6fscyj.webp";
export const useCloudinaryUpload = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(urlFirstImg);
  const [transformedUrl, setTransformedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPublicId, setCurrentPublicId] = useState<string | null>(
    "zlnmn8wiblyolg6fscyj"
  );
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
      setIsLoading(true);
      try {
        const transformedImageUrl = await applyGenerativeReplace(
          currentPublicId,
          from,
          to
        );
        setTransformedUrl(transformedImageUrl);

        // Subimos la imagen transformada para obtener un nuevo public_id
        const savedImageUrl = await uploadTransformedImage(transformedImageUrl);
        const newPublicId = extractPublicId(savedImageUrl);

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
      setIsLoading(true);
      try {
        const transformedImageUrl = await applyGenerativeRemove(
          currentPublicId,
          inputPrompt
        );
        setTransformedUrl(transformedImageUrl);

        // Subimos la imagen transformada para obtener un nuevo public_id
        const savedImageUrl = await uploadTransformedImage(transformedImageUrl);
        const newPublicId = extractPublicId(savedImageUrl);

        console.log("newPublicId after Remove: ", newPublicId);

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
      setIsLoading(true);
      try {
        const transformedImageUrl = await applyGenerativeBackgroundReplace(
          currentPublicId,
          inputPrompt
        );
        setTransformedUrl(transformedImageUrl);

        // Subimos la imagen transformada para obtener un nuevo public_id
        const savedImageUrl = await uploadTransformedImage(transformedImageUrl);
        const newPublicId = extractPublicId(savedImageUrl);

        console.log("newPublicId after Background Replace: ", newPublicId);

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
    isLoading,
    handleImageUpload,
    applyTransformationReplace,
    applyTransformationRemove,
    applyTransformationRemoveBackground,
  };
};
