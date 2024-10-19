import ImageTransform from "./components/ImageTransform";
import ImageUpload from "./components/ImageUpload";
import { useCloudinaryUpload } from "./hooks/useCloudinaryUpload";
import "./index.css";

export default function App() {
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
      applyTransformationReplace("clothes", "femme fatale");
    }
  };

  const handleApplyRemove = () => {
    if (imageUrl) {
      applyTransformationRemove("headphones");
    }
  };

  return (
    <div className="w-4/5 m-auto flex flex-col gap-10">
      <h1 className="py-10 text-center text-3xl font-bold">
        Hackaton Cloudinary 2024 - Halloween
      </h1>
      <ImageUpload onUpload={handleImageUpload} />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <ImageTransform originalUrl={imageUrl} transformedUrl={transformedUrl} />
      {imageUrl && (
        <div className="flex gap-10">
          <button
            type="button"
            className="bg-gray-400 py-4 px-8 border border-white rounded-md"
            onClick={handleApplyReplace}
          >
            Aplicar Disfraz de Halloween
          </button>
          <button
            type="button"
            className="bg-gray-400 py-4 px-8 border border-white rounded-md"
            onClick={handleApplyRemove}
          >
            Eliminar Objeto (Ej: Mesa)
          </button>
        </div>
      )}
    </div>
  );
}
