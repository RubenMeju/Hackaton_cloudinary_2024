import { Ghost, Skull, Flame, Shield } from "lucide-react";
import { useState } from "react";
import { useLightningEffect } from "./hooks/useLightningEffect";
import { useCloudinaryUpload } from "./hooks/useCloudinaryUpload";
import useStore from "./store/store";
import Header from "./components/Header";
import ImageTransform from "./components/ImageTransform";
import ImageUpload from "./components/ImageUpload";
import Bat from "./components/Bat";
import Spider from "./components/Spider";
import Loading from "./components/Loading";
import ImageExampleGallery from "./components/ImageExampleGallery";
import CostumeSelector from "./components/CustomeSelector";
import BackgroundRemove from "./components/BackgroundRemove";
import "./index.css";
import GenerativeRemove from "./components/GenerativeRemove";

const costumes = [
  { id: "zombie", name: "Zombie", icon: Skull },
  { id: "ghost", name: "Fantasma", icon: Ghost },
  { id: "devil", name: "Diablo", icon: Flame },
  { id: "police", name: "Policia", icon: Shield },
];

export default function App() {
  const { errorMessage, isLoading } = useStore();
  const { handleImageUpload } = useCloudinaryUpload();

  const showLightning = useLightningEffect(5000);

  const [selectedCostume, setSelectedCostume] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col items-center relative overflow-hidden">
      <div
        className={`absolute inset-0 bg-purple-900 opacity-5 ${
          showLightning ? "animate-flash" : ""
        }`}
      ></div>

      <section className="w-[90%] z-10 flex flex-col gap-10">
        <Header />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {isLoading && <Loading />}
        <div className="max-w-md flex justify-center">
          <ImageExampleGallery />
          <ImageUpload onUpload={handleImageUpload} />
        </div>
        <ImageTransform />
        <CostumeSelector
          costumes={costumes}
          selectedCostume={selectedCostume}
          setSelectedCostume={setSelectedCostume}
        />
        <BackgroundRemove />
        <GenerativeRemove />
      </section>

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
