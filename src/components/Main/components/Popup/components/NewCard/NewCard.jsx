// src/components/Main/components/Popup/components/NewCard/NewCard.jsx
import { useState, useEffect } from "react";

export default function NewCard({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // Estados de erro
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");

  // Estado para habilitar/desabilitar botão
  const [isFormValid, setIsFormValid] = useState(false);

  // Loading local do componente
  const [isLoading, setIsLoading] = useState(false);

  // Limpa o formulário ao abrir
  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
      setNameError("");
      setLinkError("");
      setIsFormValid(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Validação ao digitar
  function handleNameChange(e) {
    const { value, validationMessage } = e.target;
    setName(value);
    setNameError(validationMessage);
    // atualiza validade do form com base no próprio form HTML
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  function handleLinkChange(e) {
    const { value, validationMessage } = e.target;
    setLink(value);
    setLinkError(validationMessage);
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validação simples para evitar envio vazio
    if (!name.trim() || !link.trim()) return;

    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setIsFormValid(false); // prevenir reenvio enquanto salva

    try {
      await onAddPlace({ name: name.trim(), link: link.trim() });
      onClose(); // Fecha popup ao salvar com sucesso
    } catch (err) {
      console.error("Erro ao adicionar card:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="name"
        className={`popup__input popup__input_type_card-name ${
          nameError ? "popup__input_type_error" : ""
        }`}
        placeholder="Título"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleNameChange}
        disabled={isLoading}
      />
      <span
        className={`popup__input-error card-name-input-error ${
          nameError ? "popup__error_visible" : ""
        }`}
      >
        {nameError}
      </span>

      <input
        type="url"
        name="link"
        className={`popup__input popup__input_type_url ${
          linkError ? "popup__input_type_error" : ""
        }`}
        placeholder="Link da imagem"
        required
        value={link}
        onChange={handleLinkChange}
        disabled={isLoading}
      />
      <span
        className={`popup__input-error url-input-error ${
          linkError ? "popup__error_visible" : ""
        }`}
      >
        {linkError}
      </span>

      <button
        type="submit"
        className={`popup__button ${
          !isFormValid || isLoading ? "popup__button_disabled" : ""
        }`}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? "Salvando..." : "Criar"}
      </button>
    </form>
  );
}
