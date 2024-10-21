import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface ImageTransformProps {
  originalUrl: string | null;
  transformedUrl: string | null;
}

const ImageTransform: React.FC<ImageTransformProps> = ({
  originalUrl,
  transformedUrl,
}) => {
  if (!originalUrl || !transformedUrl) {
    return null; // Si no hay imágenes, no renderiza nada.
  }

  return (
    <div className="max-w-2xl m-auto flex justify-center">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={originalUrl}
            alt="Original Image"
            style={{ maxWidth: "300px", height: "auto" }} // Limitar tamaño de la imagen
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={transformedUrl}
            alt="Transformed Image"
            style={{ maxWidth: "300px", height: "auto" }} // Limitar tamaño de la imagen
          />
        }
      />
    </div>
  );
};

export default ImageTransform;
