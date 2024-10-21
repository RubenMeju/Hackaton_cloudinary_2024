import {
  applyGenerativeBackgroundReplace,
  applyGenerativeRemove,
  applyGenerativeReplace,
  uploadImage,
  uploadTransformedImage,
} from "../services/cloudinaryService";
import useStore from "../store/store";

// Función auxiliar para extraer el publicId
const extractPublicId = (url: string): string => {
  const [publicId] = url.split("?")[0].split("/").pop()?.split(".") || [];
  return publicId;
};

export const useCloudinaryUpload = () => {
  const {
    currentPublicId,
    setImageUrl,
    setTransformedUrl,
    setCurrentPublicId,
    setErrorMessage,
    setIsLoading,
  } = useStore();

  // Subir imagen
  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const uploadedUrl = await uploadImage(file);
      setImageUrl(uploadedUrl);
      setErrorMessage(null);

      // Extrae el publicId de la URL
      const publicId = extractPublicId(uploadedUrl);
      setCurrentPublicId(publicId);
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
    handleImageUpload,
    applyTransformationReplace,
    applyTransformationRemove,
    applyTransformationRemoveBackground,
  };
};
