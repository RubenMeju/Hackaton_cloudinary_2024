import { create } from "zustand";

interface AppState {
  imageUrl: string | null;
  transformedUrl: string | null;
  errorMessage: string | null;
  currentPublicId: string | null;
  isLoading: boolean;
  setImageUrl: (url: string | null) => void;
  setTransformedUrl: (url: string | null) => void;
  setErrorMessage: (message: string | null) => void;
  setCurrentPublicId: (publicId: string | null) => void;
  setIsLoading: (loading: boolean) => void;
}

const useStore = create<AppState>((set) => ({
  imageUrl:
    "https://res.cloudinary.com/meju/image/upload/v1729496628/fa7dds8gna7dfwhqebil",
  transformedUrl:
    "https://res.cloudinary.com/meju/image/upload/v1729496628/fa7dds8gna7dfwhqebil",
  errorMessage: null,
  currentPublicId: "fa7dds8gna7dfwhqebil",
  isLoading: false,

  setImageUrl: (url) => {
    if (typeof url === "string" && url.startsWith("http")) {
      set({ imageUrl: url });
    } else {
      console.error("Invalid URL");
    }
  },
  setTransformedUrl: (url) => set({ transformedUrl: url }),
  setErrorMessage: (message) => {
    if (message) {
      set({ errorMessage: message });
    } else {
      console.warn("Error message cannot be empty");
    }
  },
  setCurrentPublicId: (publicId) => set({ currentPublicId: publicId }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useStore;
