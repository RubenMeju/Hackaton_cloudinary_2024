import ImageTransform from "./components/ImageTransform";
import ImageUpload from "./components/ImageUpload";
import { useCloudinaryUpload } from "./hooks/useCloudinaryUpload";
import "./index.css";
import Bat from "./components/Bat";
import Spider from "./components/Spider";
import Fog from "./components/Fog";
import Loading from "./components/Loading";
import FormGroup from "./components/FormGroup";
import { useLightningEffect } from "./hooks/useLightningEffect";
import ImageExampleGallery from "./components/ImageExampleGallery";
import Header from "./components/Header";
import useStore from "./store/store";

export default function App() {
  const { imageUrl, errorMessage, isLoading } = useStore();
  const { handleImageUpload } = useCloudinaryUpload();

  const showLightning = useLightningEffect(5000);

  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col items-center relative overflow-hidden">
      <div
        className={`absolute inset-0 bg-purple-900 opacity-5 ${
          showLightning ? "animate-flash" : ""
        }`}
      ></div>
      <Fog />
      <div className="w-[90%] z-10">
        <Header />
        <div className="max-w-md flex justify-center">
          <ImageExampleGallery />
          <ImageUpload onUpload={handleImageUpload} />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {isLoading && <Loading />}
        <ImageTransform />
        {imageUrl && <FormGroup />}
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
