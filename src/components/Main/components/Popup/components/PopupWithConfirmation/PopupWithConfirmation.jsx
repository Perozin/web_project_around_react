// src/components/Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx
import React from "react";
import Popup from "../../Popup";

export default function PopupWithConfirmation({
  isOpen = false,
  onClose,
  onConfirm,
  isLoading = false,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    if (isLoading) return; // prevenção de cliques duplos
    if (typeof onConfirm === "function") {
      onConfirm();
    }
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Confirmação">
      <form
        className="popup__form popup__form_type_confirm"
        onSubmit={handleSubmit}
        noValidate
      >
        <button
          type="submit"
          className={`popup__button popup__button_confirm ${
            isLoading ? "popup__button_disabled" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Excluindo..." : "Sim"}
        </button>
      </form>
    </Popup>
  );
}
