import React, { useState } from "react";

interface FormGroupProps {
  onApplyReplace: (e: React.FormEvent<HTMLFormElement>) => void;
  onApplyRemove: () => void;
  onApplyRemoveBackground: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const FormGroup: React.FC<FormGroupProps> = ({
  onApplyReplace,
  onApplyRemove,
  onApplyRemoveBackground,
  isLoading,
}) => {
  // Estado para controlar cuál formulario se está mostrando
  const [activeForm, setActiveForm] = useState<string>("replace");

  return (
    <div className="max-w-2xl m-auto h-56 py-8 flex flex-col gap-4 ">
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
          onSubmit={onApplyReplace}
        >
          <h2>Reemplazo generativo</h2>
          <input
            type="text"
            name="replacePrompt"
            className="bg-black/70 border border-red-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Artículo a Reemplazar"
            required
          />
          <input
            type="text"
            name="insertPrompt"
            className="bg-black/70 border border-red-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Artículo para Insertar"
            required
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
            onClick={onApplyRemove}
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
          onSubmit={onApplyRemoveBackground}
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
