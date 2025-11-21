import { useEffect } from "react";

export default function Popup({ onClose, title, children, isOpen }) {
  // Fechar com ESC
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  // Fechar clicando no overlay
  function handleOverlayClick(evt) {
    if (evt.target.classList.contains("popup")) {
      onClose();
    }
  }

  // Classes específicas de cada popup
  const contentClass = `
    popup__content
    ${!title ? "popup__content_image" : ""}
    ${title === "Alterar avatar" ? "popup__content_avatar" : ""}
    ${title === "Confirmação" ? "popup__content_confirm-delete" : ""}
  `;

  return (
    <div
      className={`popup ${isOpen ? "popup_is-opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className={contentClass}>
        <button
          aria-label="Close modal"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
