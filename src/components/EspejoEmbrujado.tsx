import ImageUpload from "./ImageUpload";
import ImageTransform from "./ImageTransform";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";

export default function EspejoEmbrujado() {
  const {
    imageUrl,
    transformedUrl,
    errorMessage,
    handleImageUpload,
    applyTransformationReplace,
    applyTransformationRemove,
  } = useCloudinaryUpload();

  const handleApplyReplace = () => {
    if (imageUrl) {
      applyTransformationReplace("clothes", "hulk costume");
    }
  };

  const handleApplyRemove = () => {
    if (imageUrl) {
      applyTransformationRemove("table");
    }
  };

  return (
    <div>
      <h1>Espejo Embrujado</h1>
      <ImageUpload onUpload={handleImageUpload} />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <ImageTransform originalUrl={imageUrl} transformedUrl={transformedUrl} />
      {imageUrl && (
        <>
          <button onClick={handleApplyReplace}>
            Aplicar Disfraz de Halloween
          </button>
          <button onClick={handleApplyRemove}>
            Eliminar Objeto (Ej: Mesa)
          </button>
        </>
      )}
    </div>
  );
}
