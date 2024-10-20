import ImageTransform from "./components/ImageTransform";
import ImageUpload from "./components/ImageUpload";
import { useCloudinaryUpload } from "./hooks/useCloudinaryUpload";
import "./index.css";

export default function App() {
  const {
    imageUrl,
    transformedUrl,
    errorMessage,
    isLoading,
    handleImageUpload,
    applyTransformationReplace,
    applyTransformationRemove,
    applyTransformationRemoveBackground,
  } = useCloudinaryUpload();

  const handleApplyReplace = () => {
    if (imageUrl) {
      applyTransformationReplace("face", "Mayan mask");
    }
  };

  const handleApplyRemove = () => {
    if (imageUrl) {
      applyTransformationRemove("cap");
    }
  };

  const handleApplyRemoveBackground = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const backgroundPrompt = (
      form.elements.namedItem("backgroundPrompt") as HTMLInputElement
    ).value;

    if (imageUrl) {
      applyTransformationRemoveBackground(backgroundPrompt);
    }
  };

  return (
    <div className="w-4/5 m-auto flex flex-col gap-10">
      <h1 className="py-10 text-center text-3xl font-bold">
        Hackaton Cloudinary 2024 - Halloween
      </h1>
      <ImageUpload onUpload={handleImageUpload} />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {isLoading && <p>Cargando...</p>} {/* Loader */}
      <ImageTransform originalUrl={imageUrl} transformedUrl={transformedUrl} />
      {imageUrl && (
        <div className="flex gap-10">
          <button
            type="button"
            className="bg-gray-400 py-4 px-8 border border-white rounded-md"
            onClick={handleApplyReplace}
            disabled={isLoading} // Deshabilitar botones mientras carga
          >
            Aplicar Disfraz de Halloween
          </button>
          <button
            type="button"
            className="bg-gray-400 py-4 px-8 border border-white rounded-md"
            onClick={handleApplyRemove}
            disabled={isLoading} // Deshabilitar botones mientras carga
          >
            Eliminar Objeto (Ej: Mesa)
          </button>

          <form onSubmit={handleApplyRemoveBackground}>
            <input
              type="text"
              name="backgroundPrompt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="fondo Halloween"
              required
            />
            <button
              type="submit"
              className="bg-gray-400 py-4 px-8 border border-white rounded-md"
              disabled={isLoading} // Deshabilitar botones mientras carga
            >
              Cambiar background
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
