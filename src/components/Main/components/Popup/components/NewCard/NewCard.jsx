// Funcionando após atender as premissas 2 e 3 - agora com exibição das classes de erro
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

// =====================================inicio ===============================

// // ULTIMAS ATUALIZAÇÕES FICOU PERFEITO (SÓ FALTA OS LOADING)
// // src/components/Main/components/Popup/components/NewCard/NewCard.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function NewCard({
//   onAddPlace,
//   isLoading = false,
//   isOpen = false, // adicionamos isOpen para acompanhar o popup
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ title: "", url: "" });

//   // Resetar formulário quando o popup abrir
//   React.useEffect(() => {
//     if (isOpen) {
//       resetForm({ title: "", url: "" }, {}, false);
//     }
//   }, [isOpen, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return;

//     onAddPlace({
//       name: values.title,
//       link: values.url,
//     });

//     // Apenas limpa o formulário, o App fechará o popup
//     resetForm({ title: "", url: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="title"
//         id="card-title-input"
//         minLength="2"
//         maxLength="30"
//         required
//         value={values.title}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_card-name ${
//           errors.title ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Título"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error ${
//           errors.title ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.title}
//       </span>

//       <input
//         type="url"
//         name="url"
//         id="url-input"
//         required
//         value={values.url}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_url ${
//           errors.url ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link da imagem"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error ${
//           errors.url ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.url}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Criando..." : "Criar"}
//       </button>
//     </form>
//   );
// }

// =================================final =============================================

// // src/components/Main/components/Popup/components/NewCard/NewCard.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function NewCard({
//   onAddPlace,
//   isLoading = false, // <-- loading vindo corretamente
//   isOpen = false,
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ title: "", url: "" });

//   // Resetar formulário quando o popup abrir
//   React.useEffect(() => {
//     if (isOpen) {
//       resetForm({ title: "", url: "" }, {}, false);
//     }
//   }, [isOpen, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return;

//     onAddPlace({
//       name: values.title,
//       link: values.url,
//     });

//     resetForm({ title: "", url: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="title"
//         id="card-title-input"
//         minLength="2"
//         maxLength="30"
//         required
//         value={values.title}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_card-name ${
//           errors.title ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Título"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error ${
//           errors.title ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.title}
//       </span>

//       <input
//         type="url"
//         name="url"
//         id="url-input"
//         required
//         value={values.url}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_url ${
//           errors.url ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link da imagem"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error ${
//           errors.url ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.url}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Criando..." : "Criar"}
//       </button>
//     </form>
//   );
// }

// // FUNCIONANDOOOOOOO rc/components/Main/components/Popup/components/NewCard/NewCard.jsx
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function NewCard({ onAddPlace, isLoading = false }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ title: "", url: "" });

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return; // proteção extra

//     onAddPlace({
//       name: values.title,
//       link: values.url,
//     });

//     // O App vai fechar o popup — aqui apenas limpamos o form
//     resetForm({ title: "", url: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="title"
//         id="card-title-input"
//         minLength="2"
//         maxLength="30"
//         required
//         value={values.title}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_card-name ${
//           errors.title ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Título"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error ${
//           errors.title ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.title}
//       </span>

//       <input
//         type="url"
//         name="url"
//         id="url-input"
//         required
//         value={values.url}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_url ${
//           errors.url ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link da imagem"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error ${
//           errors.url ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.url}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Criando..." : "Criar"}
//       </button>
//     </form>
//   );
// }

// // src/components/Main/components/Popup/components/NewCard/NewCard.jsx
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function NewCard({ onAddPlace, isLoading = false }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ title: "", url: "" });

//   function handleSubmit(e) {
//     e.preventDefault();
//     // proteção extra
//     if (!isValid) return;

//     onAddPlace({
//       name: values.title,
//       link: values.url,
//     });

//     // limpa o formulário (opcional: o App fecha o popup)
//     resetForm({ title: "", url: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="title"
//         id="card-title-input"
//         minLength="2"
//         maxLength="30"
//         required
//         value={values.title}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_card-name ${
//           errors.title ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Título"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error ${
//           errors.title ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.title}
//       </span>

//       <input
//         type="url"
//         name="url"
//         id="url-input"
//         required
//         value={values.url}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_url ${
//           errors.url ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link da imagem"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error ${
//           errors.url ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.url}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Criando..." : "Criar"}
//       </button>
//     </form>
//   );
// }

//
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function NewCard({ onAddPlace, isLoading }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ title: "", url: "" });

//   function handleSubmit(e) {
//     e.preventDefault();
//     onAddPlace({
//       name: values.title,
//       link: values.url,
//     });
//     resetForm({ title: "", url: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="title"
//         id="card-title-input"
//         minLength="2"
//         maxLength="30"
//         required
//         value={values.title}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_card-name ${
//           errors.title ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Título"
//       />
//       <span
//         className={`popup__input-error ${
//           errors.title ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.title}
//       </span>

//       <input
//         type="url"
//         name="url"
//         id="url-input"
//         required
//         value={values.url}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_url ${
//           errors.url ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link da imagem"
//       />
//       <span
//         className={`popup__input-error ${
//           errors.url ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.url}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Criando..." : "Criar"}
//       </button>
//     </form>
//   );
// }

// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function NewCard({ onAddPlace, isLoading }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ title: "", url: "" });

//   function handleSubmit(e) {
//     e.preventDefault();
//     onAddPlace({
//       name: values.title,
//       link: values.url,
//     });
//     resetForm({ title: "", url: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         className="popup__input"
//         id="title"
//         name="title"
//         placeholder="Título"
//         minLength="2"
//         maxLength="30"
//         required
//         value={values.title}
//         onChange={handleChange}
//       />
//       <span className="popup__input-error">{errors.title}</span>

//       <input
//         type="url"
//         className="popup__input"
//         id="url"
//         name="url"
//         placeholder="Link de imagem"
//         required
//         value={values.url}
//         onChange={handleChange}
//       />
//       <span className="popup__input-error">{errors.url}</span>

//       <button
//         type="submit"
//         className={`popup__button ${!isValid ? "popup__button_disabled" : ""}`}
//         disabled={!isValid || isLoading}
//       >
//         {isLoading ? "Criando..." : "Criar"}
//       </button>
//     </form>
//   );
// }

// import { useState } from "react";

// export default function NewCard({ onAddPlace }) {
//   const [name, setName] = useState("");
//   const [link, setLink] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (onAddPlace) {
//       onAddPlace({ name, link });
//     }
//   }

//   return (
//     <form className="popup__form" id="new-card-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         className="popup__input popup__input_type_card-name"
//         id="title"
//         name="title"
//         placeholder="Título"
//         minLength="2"
//         maxLength="30"
//         required
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <span className="popup__input-error" id="title-error"></span>
//       <input
//         type="url"
//         className="popup__input popup__input_type_url"
//         id="url"
//         name="url"
//         placeholder="Link de imagem"
//         required
//         value={link}
//         onChange={(e) => setLink(e.target.value)}
//       />
//       <span className="popup__input-error" id="url-error"></span>
//       <button type="submit" className="popup__button">
//         Criar
//       </button>
//     </form>
//   );
// }

// export default function NewCard() {
//   return (
//     <form className="popup__form" id="new-card-form">
//       <input
//         type="text"
//         className="popup__input popup__input_type_card-name"
//         id="title"
//         name="title"
//         placeholder="Título"
//         minLength="2"
//         maxLength="30"
//         required
//       />
//       <span className="popup__input-error" id="title-error"></span>
//       <input
//         type="url"
//         className="popup__input popup__input_type_url"
//         id="url"
//         name="url"
//         placeholder="Link de imagem"
//         required
//       />
//       <span className="popup__input-error" id="url-error"></span>
//       <button type="submit" className="popup__button">
//         Criar
//       </button>
//     </form>
//   );
// }
