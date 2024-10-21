import { useState } from "react";
import useStore from "../store/store";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";

const FormGroup = () => {
  const { imageUrl, isLoading } = useStore();
  const {
    applyTransformationReplace,
    applyTransformationRemove,
    applyTransformationRemoveBackground,
  } = useCloudinaryUpload();

  // Estado para controlar cuál formulario se está mostrando
  const [activeForm, setActiveForm] = useState<string>("replace");

  // Estado para controlar el uso del select en el formulario de reemplazo
  const [useSelectReplace, setUseSelectReplace] = useState<boolean>(false);

  // Estados para los valores de los inputs
  const [replacePrompt, setReplacePrompt] = useState<string>("");
  const [insertPrompt, setInsertPrompt] = useState<string>("");

  // Manejador de cambio para el select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setUseSelectReplace(selectedValue !== "");

    // Si selecciona "disfraz de zombie", rellenar los inputs con los valores correspondientes
    if (selectedValue === "zombie") {
      setReplacePrompt("ropa");
      setInsertPrompt("disfraz zombie");
    } else if (selectedValue === "diablo") {
      setReplacePrompt("ropa");
      setInsertPrompt("disfraz diablo");
    } else if (selectedValue === "vaca") {
      setReplacePrompt("ropa");
      setInsertPrompt("disfraz vaca");
    } else {
      // Si no selecciona nada, restablecer los valores de los inputs
      setReplacePrompt("");
      setInsertPrompt("");
    }
  };

  const handleApplyReplace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Si se usa el select, enviar los valores ya seleccionados
    if (useSelectReplace) {
      if (imageUrl) {
        applyTransformationReplace(replacePrompt, insertPrompt);
      }
    } else {
      // Si no se usa el select, usar los valores manuales
      const form = e.target as HTMLFormElement;
      const manualReplacePrompt = (
        form.elements.namedItem("replacePrompt") as HTMLInputElement
      ).value;
      const manualInsertPrompt = (
        form.elements.namedItem("insertPrompt") as HTMLInputElement
      ).value;

      if (imageUrl) {
        applyTransformationReplace(manualReplacePrompt, manualInsertPrompt);
      }
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
    <div className="max-w-2xl py-8 flex flex-col gap-4">
      {/* Botones para cambiar de formulario */}
      <div className="inline-flex justify-center rounded-md shadow-sm">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 ${
            activeForm === "replace" ? "bg-gray-300" : ""
          }`}
          onClick={() => setActiveForm("replace")}
        >
          Replace
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 ${
            activeForm === "remove" ? "bg-gray-300" : ""
          }`}
          onClick={() => setActiveForm("remove")}
        >
          Remove
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 ${
            activeForm === "background" ? "bg-gray-300" : ""
          }`}
          onClick={() => setActiveForm("background")}
        >
          Background
        </button>
      </div>

      {/* Formulario de reemplazar */}
      {activeForm === "replace" && (
        <form
          className="flex flex-col gap-4 border-2 border-red-900 rounded-md p-4"
          onSubmit={handleApplyReplace}
        >
          <h2>Reemplazo generativo</h2>

          {/* Select para opciones rápidas */}
          <select
            name="replaceSelect"
            className="bg-black/70 border border-red-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={handleSelectChange}
          >
            <option value="">Elija un disfraz</option>
            <option value="zombie">disfraz de zombie</option>
            <option value="diablo">disfraz de diablo</option>
            <option value="vaca">disfraz de vaca</option>
          </select>

          {/* Inputs que se deshabilitan si se selecciona una opción en el select */}
          <input
            type="text"
            name="replacePrompt"
            className="bg-black/70 border border-red-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Artículo a Reemplazar"
            disabled={useSelectReplace} // Deshabilita si se usa el select
            value={replacePrompt} // Valor controlado por el estado
            onChange={(e) => setReplacePrompt(e.target.value)} // Permite cambiar manualmente si no se usa el select
            required={!useSelectReplace} // Solo requerido si no se usa el select
          />
          <input
            type="text"
            name="insertPrompt"
            className="bg-black/70 border border-red-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Artículo para Insertar"
            disabled={useSelectReplace} // Deshabilita si se usa el select
            value={insertPrompt} // Valor controlado por el estado
            onChange={(e) => setInsertPrompt(e.target.value)} // Permite cambiar manualmente si no se usa el select
            required={!useSelectReplace} // Solo requerido si no se usa el select
          />

          <button
            type="submit"
            className="bg-black/70 py-4 px-8 border border-gray-300 rounded-md"
            disabled={isLoading}
          >
            Reemplazar artículos
          </button>
        </form>
      )}

      {/* Formulario de eliminar */}
      {activeForm === "remove" && (
        <form>
          <button
            type="button"
            className="bg-black/70 py-4 px-8 border border-gray-300 rounded-md"
            onClick={handleApplyRemove}
            disabled={isLoading}
          >
            Eliminar Objeto (Ej: Mesa)
          </button>
        </form>
      )}

      {/* Formulario de cambiar background */}
      {activeForm === "background" && (
        <form
          className="flex flex-col gap-4 border-2 border-red-900 rounded-md p-4"
          onSubmit={handleApplyRemoveBackground}
        >
          <h2>Reemplazar fondo</h2>
          <input
            type="text"
            name="backgroundPrompt"
            className="bg-black/70 border border-red-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="fondo Halloween"
            required
          />
          <button
            type="submit"
            className="bg-black/70 py-4 px-8 border border-gray-300 rounded-md"
            disabled={isLoading}
          >
            Reemplazar background
          </button>
        </form>
      )}
    </div>
  );
};

export default FormGroup;
