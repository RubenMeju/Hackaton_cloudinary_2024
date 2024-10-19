import { useEffect, useState } from "react";

// Define the type for uwConfig and setPublicId
interface CloudinaryUploadWidgetProps {
  uwConfig: Record<string, any>;
  setPublicId: (publicId: string) => void;
}

function CloudinaryUploadWidget({
  uwConfig,
  setPublicId,
}: CloudinaryUploadWidgetProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id);
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <button
      id="upload_widget"
      className="cloudinary-button"
      onClick={initializeCloudinaryWidget}
    >
      Upload
    </button>
  );
}

export default CloudinaryUploadWidget;
