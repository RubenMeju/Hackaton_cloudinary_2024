import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import useStore from "../store/store";

const ImageTransform = () => {
  const { imageUrl, transformedUrl } = useStore();

  if (!imageUrl || !transformedUrl) {
    return null; // Si no hay imágenes, no renderiza nada.
  }

  return (
    <div className="max-w-2xl m-auto flex justify-center">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={imageUrl}
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
