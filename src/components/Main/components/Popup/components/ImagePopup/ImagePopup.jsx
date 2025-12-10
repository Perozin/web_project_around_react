// src/components/Main/components/Popup/components/ImagePopup/ImagePopup.jsx
import { useEffect } from "react";

export default function ImagePopup({ card, onClose }) {
  // Fechar com ESC
  useEffect(() => {
    if (!card) return; // só ativa quando houver imagem aberta

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [card, onClose]);

  return (
    <div
      className={`popup popup_type_image ${card ? "popup_is-opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__content popup__content_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="popup__close-button"
          aria-label="Fechar"
          onClick={onClose}
        />

        {card && (
          <>
            <img src={card.link} alt={card.name} className="popup__image" />
            <p className="popup__caption">{card.name}</p>
          </>
        )}
      </div>
    </div>
  );
}
