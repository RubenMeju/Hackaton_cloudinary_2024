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
    <div className="max-w-2xl m-auto py-8 flex flex-col gap-10">
      <form
        className="flex flex-col gap-4 border-2 border-red-900 rounded-md p-4"
        onSubmit={onApplyReplace}
      >
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

      <button
        type="button"
        className="bg-black/70 py-4 px-8 border border-gray-300 rounded-md"
        onClick={onApplyRemove}
        disabled={isLoading}
      >
        Eliminar Objeto (Ej: Mesa)
      </button>

      <form
        className="flex flex-col gap-4 border-2 border-red-900 rounded-md p-4"
        onSubmit={onApplyRemoveBackground}
      >
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
    </div>
  );
};

export default FormGroup;
