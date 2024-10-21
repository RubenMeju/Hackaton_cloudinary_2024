import { useState } from "react";
import useStore from "../store/store";
import { WandSparkles } from "lucide-react";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";

export default function GenerativeRemove() {
  const { imageUrl, isLoading } = useStore();
  const { applyTransformationRemove } = useCloudinaryUpload();
  const [inputPrompt, setInputPrompt] = useState<string>("");

  const handleApplyReplace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageUrl) {
      applyTransformationRemove(inputPrompt);
    }
  };
  return (
    <form
      className="max-w-xl flex flex-col gap-4 mb-10"
      onSubmit={handleApplyReplace}
    >
      <h2 className="text-2xl font-bold">Elimina un objecto</h2>
      <input
        type="text"
        name="replacePrompt"
        className="bg-black/70 border border-red-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
        placeholder="gorra, collar, etc..."
        value={inputPrompt}
        onChange={(e) => setInputPrompt(e.target.value)}
        required
      />

      {/* Botón para aplicar la transformación */}
      <button
        type="submit"
        className="w-full bg-black/70 py-4 px-8 text-xl flex justify-center items-center gap-4 border rounded-md border-purple-800"
        disabled={isLoading}
      >
        <WandSparkles /> Aplicar
      </button>
    </form>
  );
}
