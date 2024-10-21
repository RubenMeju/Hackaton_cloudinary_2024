import React from "react";
import { LucideIcon } from "lucide-react";

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
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Choose a Costume</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {costumes.map((costume) => (
          <button
            key={costume.id}
            onClick={() => setSelectedCostume(costume.id)}
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
    </div>
  );
};

export default CostumeSelector;
