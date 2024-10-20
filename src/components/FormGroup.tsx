// FormGroup.tsx
import React from "react";

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
  return (
    <div className="flex gap-10">
      <form className="border-2 rounded-md p-4" onSubmit={onApplyReplace}>
        <input
          type="text"
          name="replacePrompt"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Artículo a Reemplazar"
          required
        />

        <input
          type="text"
          name="insertPrompt"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Artículo para Insertar"
          required
        />
        <button
          type="submit"
          className="bg-gray-400 py-4 px-8 border border-white rounded-md"
          disabled={isLoading}
        >
          Aplicar Disfraz de Halloween
        </button>
      </form>

      <button
        type="button"
        className="bg-gray-400 py-4 px-8 border border-white rounded-md"
        onClick={onApplyRemove}
        disabled={isLoading}
      >
        Eliminar Objeto (Ej: Mesa)
      </button>

      <form
        className="border-2 rounded-md p-4"
        onSubmit={onApplyRemoveBackground}
      >
        <input
          type="text"
          name="backgroundPrompt"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="fondo Halloween"
          required
        />
        <button
          type="submit"
          className="bg-gray-400 py-4 px-8 border border-white rounded-md"
          disabled={isLoading}
        >
          Cambiar background
        </button>
      </form>
    </div>
  );
};

export default FormGroup;
