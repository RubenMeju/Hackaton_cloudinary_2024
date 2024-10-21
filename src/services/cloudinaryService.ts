import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import {
  generativeReplace,
  generativeRemove,
  generativeBackgroundReplace,
} from "@cloudinary/url-gen/actions/effect";

const CLOUD_NAME = "meju";
const UPLOAD_PRESET = "espejo_hachaton";

interface CustomError extends Error {
  http_code?: number;
}

const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME,
  },
});

// Subir imagen a Cloudinary
export const uploadImage = async (file: File) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const fileUploaded = await response.json();
  if (response.ok) {
    return fileUploaded.secure_url;
  } else {
    throw new Error(fileUploaded.error.message);
  }
};

export const uploadTransformedImage = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const file = new File([blob], "transformed_image.jpg", { type: blob.type });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!uploadResponse.ok) {
    const errorData = await uploadResponse.json();
    throw new Error(
      `Error al subir la imagen: ${
        errorData.message || uploadResponse.statusText
      }`
    );
  }

  const data = await uploadResponse.json();
  return data.secure_url;
};

// Aplicar reemplazo generativo
export const applyGenerativeReplace = (
  publicId: string,
  from: string,
  to: string
) => {
  console.log("applyGenerativeReplace");
  const transformedImage = cld
    .image(publicId)
    .effect(generativeReplace().from(from).to(to).preserveGeometry(true));
  return transformedImage.toURL();
};

// Aplicar eliminación generativa
export const applyGenerativeRemove = (publicId: string, inputPromt: string) => {
  console.log("applyGenerativeRemove");
  // Aplica el efecto de eliminación generativa
  const transformedImage = cld
    .image(publicId)
    .effect(
      generativeRemove()
        .prompt(inputPromt)
        .detectMultiple(false)
        .removeShadow(false)
    );

  // Devuelve la URL transformada
  return transformedImage.toURL();
};

// Aplicar cambio de fondo
// Aplicar cambio de fondo
export const applyGenerativeBackgroundReplace = async (
  publicId: string,
  inputPrompt: string,
  retryCount: number = 0 // Contador para el número de reintentos
): Promise<string> => {
  // Tipo de retorno Promise<string> ya que devuelves una URL
  try {
    const transformedImage: CloudinaryImage = cld
      .image(publicId)
      .effect(generativeBackgroundReplace().prompt(inputPrompt));

    // Devuelve la URL transformada
    return transformedImage.toURL();
  } catch (error) {
    // Asegúrate de que el error sea del tipo CustomError
    const customError = error as CustomError;

    // Manejo del error 423
    if (customError.http_code === 423 && retryCount < 3) {
      // Limitar a 3 reintentos
      console.warn(
        `Error 423: Resource is locked. Retrying... Attempt ${retryCount + 1}`
      );
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Esperar 2 segundos antes de reintentar
      return applyGenerativeBackgroundReplace(
        publicId,
        inputPrompt,
        retryCount + 1
      );
    } else {
      console.error(
        "Error applying generative background replace:",
        customError
      );
      throw customError; // Re-lanzar el error si no es 423 o se han agotado los reintentos
    }
  }
};
