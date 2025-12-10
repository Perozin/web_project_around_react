// src/components/Main/components/Popup/components/EditProfile/EditProfile.jsx
import React from "react";
import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

export default function EditProfile({
  isOpen = false,
  onSubmit, // <-- padronizado para onSubmit (App fornece onSubmit)
  isLoading = false,
  currentUser = {},
  onClose, // opcional, mantido se quiser usar internamente
}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation({ name: "", about: "" });

  // Preenche inputs quando o popup abre ou currentUser muda
  React.useEffect(() => {
    if (isOpen && currentUser) {
      resetForm(
        {
          name: currentUser.name || "",
          about: currentUser.about || "",
        },
        {},
        true
      );
    }
  }, [isOpen, currentUser, resetForm]);

  // Submit local que delega para o onSubmit recebido do App
  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isLoading) return;

    if (typeof onSubmit === "function") {
      onSubmit({
        name: values.name,
        about: values.about,
      });
    } else {
      console.warn("EditProfile: onSubmit não é função");
    }
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="name"
        id="name-input"
        minLength="2"
        maxLength="40"
        required
        value={values.name}
        onChange={handleChange}
        className={`popup__input popup__input_type_name ${
          errors.name ? "popup__input_type_error" : ""
        }`}
        placeholder="Nome"
        disabled={isLoading}
      />
      <span
        className={`popup__input-error name-input-error ${
          errors.name ? "popup__error_visible" : ""
        }`}
      >
        {errors.name}
      </span>

      <input
        type="text"
        name="about"
        id="about-input"
        minLength="2"
        maxLength="200"
        required
        value={values.about}
        onChange={handleChange}
        className={`popup__input popup__input_type_activity ${
          errors.about ? "popup__input_type_error" : ""
        }`}
        placeholder="Sobre"
        disabled={isLoading}
      />
      <span
        className={`popup__input-error about-input-error ${
          errors.about ? "popup__error_visible" : ""
        }`}
      >
        {errors.about}
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
