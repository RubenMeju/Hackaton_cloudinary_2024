import { useEffect, useState } from "react";

export const useLightningEffect = (interval: number) => {
  const [showLightning, setShowLightning] = useState(false);

  useEffect(() => {
    const lightningInterval = setInterval(() => {
      setShowLightning(true);
      setTimeout(() => setShowLightning(false), 200);
    }, interval + Math.random() * 10000);

    return () => clearInterval(lightningInterval);
  }, [interval]);

  return showLightning;
};
