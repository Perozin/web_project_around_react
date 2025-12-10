// src/components/Main/components/Popup/components/EditAvatar/EditAvatar.jsx
import React from "react";
import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

export default function EditAvatar({
  onSubmit,
  isLoading = false,
  isOpen = false,
  onClose,
}) {
  // hook só para validação
  const { errors, isValid, handleChange, resetForm } = useFormWithValidation({
    avatar: "",
  });

  // ref
  const avatarRef = React.useRef("");

  // limpa erros ao abrir
  React.useEffect(() => {
    if (isOpen) {
      resetForm({ avatar: "" }, {}, false);

      // limpa também o campo manualmente
      if (avatarRef.current) {
        avatarRef.current.value = "";
      }
    }
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isLoading) return;

    const avatarValue = avatarRef.current.value;

    if (typeof onSubmit === "function") {
      onSubmit({ avatar: avatarValue });
    } else {
      console.warn("EditAvatar: onSubmit não é função");
    }

    // limpa erros e campo após submit
    resetForm({ avatar: "" }, {}, false);
    if (avatarRef.current) {
      avatarRef.current.value = "";
    }
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <input
        type="url"
        name="avatar"
        id="avatar-input"
        required
        ref={avatarRef}
        onChange={handleChange} // ainda valida
        className={`popup__input popup__input_type_avatar ${
          errors.avatar ? "popup__input_type_error" : ""
        }`}
        placeholder="Link do avatar"
        disabled={isLoading}
      />

      <span
        className={`popup__input-error avatar-input-error ${
          errors.avatar ? "popup__error_visible" : ""
        }`}
      >
        {errors.avatar}
      </span>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={`popup__button ${
          !isValid || isLoading ? "popup__button_disabled" : ""
        }`}
      >
        {isLoading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
