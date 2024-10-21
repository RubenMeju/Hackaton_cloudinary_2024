import React, { useState } from "react";
import { LucideIcon, WandSparkles } from "lucide-react";
import useStore from "../store/store";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";

interface Costume {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface CostumeSelectorProps {
  costumes: Costume[];
  selectedCostume: string | null;
  setSelectedCostume: (costume: string) => void;
}

const CostumeSelector: React.FC<CostumeSelectorProps> = ({
  costumes,
  selectedCostume,
  setSelectedCostume,
}) => {
  const { imageUrl, isLoading } = useStore();
  const { applyTransformationReplace } = useCloudinaryUpload();

  // Estados para los valores de los inputs
  const [replacePrompt, setReplacePrompt] = useState<string>("");
  const [insertPrompt, setInsertPrompt] = useState<string>("");

  // Estado para controlar si se muestran o no los inputs
  const [showManualInputs, setShowManualInputs] = useState<boolean>(false);

  // Función para manejar el clic en el span
  const toggleManualInputs = () => {
    setShowManualInputs(!showManualInputs); // Cambia el estado para mostrar/ocultar el div
  };

  // Manejador para seleccionar un disfraz
  const handleCostumeSelection = (costume: Costume) => {
    setSelectedCostume(costume.id); // Actualiza el estado selectedCostume

    if (costume.id === "zombie") {
      console.log("elegiste disfraz zombie");
      setReplacePrompt("clothes");
      setInsertPrompt("disfraz zombie");
    } else if (costume.id === "devil") {
      console.log("elegiste disfraz diablo");
      setReplacePrompt("clothes");
      setInsertPrompt("disfraz diablo");
    } else if (costume.id === "ghost") {
      console.log("elegiste disfraz ghost");
      setReplacePrompt("clothes");
      setInsertPrompt("custome ghost");
    } else if (costume.id === "police") {
      console.log("elegiste disfraz police");
      setReplacePrompt("clothes");
      setInsertPrompt("disfraz policia");
    } else {
      setReplacePrompt("");
      setInsertPrompt("");
    }
  };

  const handleApplyReplace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageUrl) {
      applyTransformationReplace(replacePrompt, insertPrompt);
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Escoge un disfraz</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {costumes.map((costume) => (
          <button
            key={costume.id}
            type="button"
            onClick={() => {
              handleCostumeSelection(costume);
              console.log("costume: ", costume);
            }}
            className={`p-4 rounded-lg flex flex-col items-center justify-center border transition-colors ${
              selectedCostume === costume.id
                ? "bg-red-800 text-white"
                : " hover:bg-red-800"
            }`}
          >
            <costume.icon size={48} className="mb-2" />
            <span className="font-medium">{costume.name}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleApplyReplace}>
        <div className="py-2 mb-2">
          {/* Span que controla la visibilidad de los inputs */}
          <button
            className="cursor-pointer flex items-center gap-2"
            onClick={toggleManualInputs}
          >
            Introducir manualmente
            <span>
              {showManualInputs ? "▲" : "▼"}{" "}
              {/* Cambia el icono según el estado */}
            </span>
          </button>

          {/* Inputs para los prompts (se muestran si el estado es true) */}
          {showManualInputs && (
            <div className="mt-4">
              <input
                type="text"
                name="replacePrompt"
                className="bg-black/70 border border-red-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
                placeholder="Artículo a Reemplazar"
                value={replacePrompt}
                onChange={(e) => setReplacePrompt(e.target.value)}
                required
              />
              <input
                type="text"
                name="insertPrompt"
                className="bg-black/70 border border-red-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
                placeholder="Artículo para Insertar"
                value={insertPrompt}
                onChange={(e) => setInsertPrompt(e.target.value)}
                required
              />
            </div>
          )}
        </div>

        {/* Botón para aplicar la transformación */}
        <button
          type="submit"
          className="bg-black/70 py-4 px-8 flex gap-4 border rounded-md border-purple-800"
          disabled={isLoading}
        >
          <WandSparkles /> Aplicar
        </button>
      </form>
    </div>
  );
};

export default CostumeSelector;
