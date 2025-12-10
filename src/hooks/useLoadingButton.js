// src/hooks/useLoadingButton.js
import { useState } from "react";

export default function useLoadingButton(defaultText = "Salvar") {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState(defaultText);

  function startLoading(loadingText = "Salvando...") {
    setIsLoading(true);
    setButtonText(loadingText);
  }

  function stopLoading() {
    setIsLoading(false);
    setButtonText(defaultText);
  }

  return {
    isLoading,
    buttonText,
    startLoading,
    stopLoading,
  };
}
