import ImageUpload from "./ImageUpload";
import ImageTransform from "./ImageTransform";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";

export default function EspejoEmbrujado() {
  const {
    imageUrl,
    transformedUrl,
    errorMessage,
    handleImageUpload,
    applyTransformation,
  } = useCloudinaryUpload();

  const handleApplyTransformation = () => {
    if (imageUrl) {
      const publicId = imageUrl.split("/").pop()?.split(".")[0] || ""; // Extrae el public_id
      applyTransformation(publicId, "clothes", "hulk costume");
    }
  };

  return (
    <div>
      <h1>Espejo Embrujado</h1>
      <ImageUpload onUpload={handleImageUpload} />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <ImageTransform originalUrl={imageUrl} transformedUrl={transformedUrl} />
      {imageUrl && (
        <button onClick={handleApplyTransformation}>
          Aplicar Disfraz de Halloween
        </button>
      )}
    </div>
  );
}
