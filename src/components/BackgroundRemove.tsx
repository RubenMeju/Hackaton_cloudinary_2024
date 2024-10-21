import { WandSparkles } from "lucide-react";
import { ChangeEvent, useState } from "react";
import useStore from "../store/store";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";

const BackgroundRemove = () => {
  const { imageUrl, isLoading } = useStore();
  const { applyTransformationRemoveBackground } = useCloudinaryUpload();

  // Opciones de fondos de Halloween
  const backgrounds = [
    "Bosque Encantado de Halloween",
    "Cementerio Abandonado",
    "Casa Embrujada",
    "Noche de Calabazas",
    "Fiesta de Fantasmas",
    "Cielo Nocturno de Halloween",
    "Puente Roto",
    "Sendero de Hojas Caídas",
    "Noche de Halloween en el Pueblo",
    "Cueva de Brujas",
    "Caminos de Niebla",
    "Torre del Reloj Embrujada",
    "Día de Muertos",
    "Mar de Niebla",
    "Templo Antiguo",
  ];

  // Estado para el fondo seleccionado
  const [selectedBackground, setSelectedBackground] = useState("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBackground(event.target.value);
  };

  const handleApplyRemoveBackground = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Usar el valor de selectedBackground directamente
    if (imageUrl && selectedBackground) {
      console.log("selectedBackground: ", selectedBackground);
      applyTransformationRemoveBackground(selectedBackground);
    } else {
      console.error("No hay imagen o fondo seleccionado");
    }
  };

  return (
    <form className="max-w-xl" onSubmit={handleApplyRemoveBackground}>
      <h2 className="text-2xl font-bold mb-4">Escoge un fondo</h2>
      <select
        value={selectedBackground}
        onChange={handleChange}
        className="bg-black border text-white rounded-lg p-2 mb-4 w-full"
      >
        <option value="" disabled>
          Elige un fondo
        </option>
        {backgrounds.map((background, index) => (
          <option key={index} value={background}>
            {background}
          </option>
        ))}
      </select>

      {/* Botón para aplicar la transformación */}
      <button
        type="submit"
        className="w-full bg-black/70 py-4 px-8 text-xl flex justify-center items-center gap-4 border rounded-md border-purple-800"
        disabled={isLoading || !selectedBackground} // Deshabilitar si no hay fondo seleccionado
      >
        <WandSparkles /> Aplicar
      </button>
    </form>
  );
};

export default BackgroundRemove;
