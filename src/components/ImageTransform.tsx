import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import useStore from "../store/store";

const ImageTransform = () => {
  const { imageUrl, transformedUrl } = useStore();

  if (!imageUrl || !transformedUrl) {
    return null;
  }

  return (
    <div className="max-w-sm m-auto flex justify-center bg-orange-600">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={imageUrl}
            alt="Original Image"
            style={{ maxWidth: "300px", height: "auto" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={transformedUrl}
            alt="Transformed Image"
            style={{ maxWidth: "300px", height: "auto" }}
          />
        }
      />
    </div>
  );
};

export default ImageTransform;
