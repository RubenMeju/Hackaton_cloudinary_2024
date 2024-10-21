import React, { useState } from "react";
import { LucideIcon } from "lucide-react";
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

  // Manejador para seleccionar un disfraz
  const handleCostumeSelection = (costume: Costume) => {
    setSelectedCostume(costume.id); // Actualiza el disfraz seleccionado
    // Rellena automáticamente los valores de replacePrompt e insertPrompt
    if (costume.id === "zombie") {
      setReplacePrompt("ropa");
      setInsertPrompt("disfraz zombie");
    } else if (costume.name === "diablo") {
      setReplacePrompt("ropa");
      setInsertPrompt("disfraz diablo");
    } else if (costume.name === "vaca") {
      setReplacePrompt("ropa");
      setInsertPrompt("disfraz vaca");
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Choose a Costume</h2>
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
        {/* Inputs para los prompts */}
        <input
          type="text"
          name="replacePrompt"
          className="bg-black/70 border border-red-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
          placeholder="Artículo a Reemplazar"
          value={replacePrompt}
          onChange={(e) => setReplacePrompt(e.target.value)} // Permite cambiar manualmente si se desea
          required
        />
        <input
          type="text"
          name="insertPrompt"
          className="bg-black/70 border border-red-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
          placeholder="Artículo para Insertar"
          value={insertPrompt}
          onChange={(e) => setInsertPrompt(e.target.value)} // Permite cambiar manualmente si se desea
          required
        />

        {/* Botón para aplicar la transformación */}
        <button
          type="submit"
          className="bg-black/70 py-4 px-8 border border-gray-300 rounded-md"
          disabled={isLoading}
        >
          Reemplazar artículos
        </button>
      </form>
    </div>
  );
};

export default CostumeSelector;
