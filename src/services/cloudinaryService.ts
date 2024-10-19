import { Cloudinary } from "@cloudinary/url-gen";
import { generativeReplace } from "@cloudinary/url-gen/actions/effect";

const CLOUD_NAME = "meju";
const UPLOAD_PRESET = "espejo_hachaton";

const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME,
  },
});

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

export const applyGenerativeReplace = (
  publicId: string,
  from: string,
  to: string
) => {
  const transformedImage = cld
    .image(publicId)
    .effect(generativeReplace().from(from).to(to));
  return transformedImage.toURL();
};
