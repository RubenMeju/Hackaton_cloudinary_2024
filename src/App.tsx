import { useEffect, useState } from "react";
import ImageTransform from "./components/ImageTransform";
import ImageUpload from "./components/ImageUpload";
import { useCloudinaryUpload } from "./hooks/useCloudinaryUpload";
import "./index.css";
import Bat from "./components/Bat";
import Spider from "./components/Spider";
import Fog from "./components/Fog";
import Loading from "./components/Loading";

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

  const [showLightning, setShowLightning] = useState(false);

  useEffect(() => {
    const lightningInterval = setInterval(() => {
      setShowLightning(true);
      setTimeout(() => setShowLightning(false), 200);
    }, 5000 + Math.random() * 10000);

    return () => clearInterval(lightningInterval);
  }, []);

  const handleApplyReplace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const replacePrompt = (
      form.elements.namedItem("replacePrompt") as HTMLInputElement
    ).value;

    const insertPrompt = (
      form.elements.namedItem("insertPrompt") as HTMLInputElement
    ).value;

    if (imageUrl) {
      applyTransformationReplace(replacePrompt, insertPrompt);
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
    <div className="min-h-screen bg-black text-gray-300 flex flex-col items-center justify-center relative overflow-hidden">
      <div
        className={`absolute inset-0 bg-purple-900 opacity-5 ${
          showLightning ? "animate-flash" : ""
        }`}
      ></div>
      <Fog />
      <div className="z-10 text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-600 animate-pulse">
          Hackaton Cloudinary
        </h1>
        <p className="text-2xl mb-8">
          Convierte tus imágenes en aterradoras creaciones
        </p>
        <div className="flex justify-center space-x-4">
          <ImageUpload onUpload={handleImageUpload} />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {isLoading && <Loading />} {/* Loader */}
          <ImageTransform
            originalUrl={imageUrl}
            transformedUrl={transformedUrl}
          />
          {imageUrl && (
            <div className="flex gap-10">
              <form
                className="border-2 rounded-md p-4"
                onSubmit={handleApplyReplace}
              >
                <input
                  type="text"
                  name="replacePrompt"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Artículo a Reemplazar"
                  required
                />

                <input
                  type="text"
                  name="insertPrompt"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Artículo para Insertar"
                  required
                />
                <button
                  type="submit"
                  className="bg-gray-400 py-4 px-8 border border-white rounded-md"
                  disabled={isLoading} // Deshabilitar botones mientras carga
                >
                  Aplicar Disfraz de Halloween
                </button>
              </form>

              <button
                type="button"
                className="bg-gray-400 py-4 px-8 border border-white rounded-md"
                onClick={handleApplyRemove}
                disabled={isLoading} // Deshabilitar botones mientras carga
              >
                Eliminar Objeto (Ej: Mesa)
              </button>

              <form
                className="border-2 rounded-md p-4"
                onSubmit={handleApplyRemoveBackground}
              >
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
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <Bat key={`bat-${i}`} />
        ))}
        {[...Array(3)].map((_, i) => (
          <Spider key={`spider-${i}`} />
        ))}
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
    </div>
  );
}
