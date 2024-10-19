import { Cloudinary } from "@cloudinary/url-gen";
import {
  generativeReplace,
  generativeRemove,
  generativeBackgroundReplace,
} from "@cloudinary/url-gen/actions/effect";

const CLOUD_NAME = "meju";
const UPLOAD_PRESET = "espejo_hachaton";

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

// services/cloudinaryService.ts
export const uploadTransformedImage = async (imageUrl: string) => {
  const formData = new FormData();
  formData.append("file", imageUrl);
  formData.append("upload_preset", UPLOAD_PRESET); // Usa tu preset de Cloudinary aquí

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  // Verificamos si la respuesta fue exitosa
  if (!response.ok) {
    throw new Error(
      "Error al subir la imagen transformada: " + response.statusText
    );
  }

  const data = await response.json(); // Parsear la respuesta JSON
  return data.secure_url; // Devolver la URL segura de la imagen subida
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
    .effect(generativeReplace().from(from).to(to));
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

// Aplicar cambio background
export const applyGenerativeBackgroundReplace = (
  publicId: string,
  inputPromt: string
) => {
  const transformedImage = cld
    .image(publicId)
    .effect(generativeBackgroundReplace().prompt(inputPromt));

  // Devuelve la URL transformada
  return transformedImage.toURL();
};
