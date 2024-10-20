import ImageTransform from "./components/ImageTransform";
import ImageUpload from "./components/ImageUpload";
import { useCloudinaryUpload } from "./hooks/useCloudinaryUpload";
import "./index.css";
import Bat from "./components/Bat";
import Spider from "./components/Spider";
import Fog from "./components/Fog";
import Loading from "./components/Loading";
import FormGroup from "./components/FormGroup"; // Importar el nuevo componente
import { useLightningEffect } from "./hooks/useLightningEffect"; // Importar el hook

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

  const showLightning = useLightningEffect(5000); // Usar el nuevo hook

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
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {isLoading && <Loading />} {/* Loader */}
          <ImageTransform
            originalUrl={imageUrl}
            transformedUrl={transformedUrl}
          />
          {imageUrl && (
            <FormGroup
              onApplyReplace={handleApplyReplace}
              onApplyRemove={handleApplyRemove}
              onApplyRemoveBackground={handleApplyRemoveBackground}
              isLoading={isLoading}
            />
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
