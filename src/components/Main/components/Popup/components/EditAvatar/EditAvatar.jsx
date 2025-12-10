// src/components/Main/components/Popup/components/EditAvatar/EditAvatar.jsx
import React from "react";
import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

export default function EditAvatar({
  onSubmit,
  isLoading = false,
  isOpen = false,
  onClose,
}) {
  // hook só para validação, não controla mais o value
  const { errors, isValid, handleChange, resetForm } = useFormWithValidation({
    avatar: "",
  });

  // ref conforme a premissa 5
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

// // Perfeita funcionando faltava umas pequenos ajustes para cumprir a 5ª premissa
// // src/components/Main/components/Popup/components/EditAvatar/EditAvatar.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditAvatar({
//   onSubmit, // <-- padronizado para onSubmit (App fornece onSubmit)
//   isLoading = false,
//   isOpen = false,
//   onClose, // opcional
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ avatar: "" });

//   // Resetar formulário quando o popup abrir
//   React.useEffect(() => {
//     if (isOpen) {
//       resetForm({ avatar: "" }, {}, false);
//     }
//   }, [isOpen, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return;

//     if (typeof onSubmit === "function") {
//       onSubmit({ avatar: values.avatar });
//     } else {
//       console.warn("EditAvatar: onSubmit não é função");
//     }

//     // limpa o formulário local (App fecha o popup)
//     resetForm({ avatar: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="url"
//         name="avatar"
//         id="avatar-input"
//         required
//         value={values.avatar}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_avatar ${
//           errors.avatar ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link do avatar"
//         disabled={isLoading}
//       />

//       <span
//         className={`popup__input-error avatar-input-error ${
//           errors.avatar ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.avatar}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Salvando..." : "Salvar"}
//       </button>
//     </form>
//   );
// }

// // // Funciona popup, validações só flatava o submit funcionar
// // src/components/Main/components/Popup/components/EditAvatar/EditAvatar.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditAvatar({
//   onUpdateAvatar,
//   isLoading = false,
//   isOpen = false, // acompanhando estado do popup
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ avatar: "" });

//   // Resetar formulário quando o popup abrir
//   React.useEffect(() => {
//     if (isOpen) {
//       resetForm({ avatar: "" }, {}, false);
//     }
//   }, [isOpen, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return;

//     onUpdateAvatar({ avatar: values.avatar });

//     // limpa o formulário após submit (App fecha o popup)
//     resetForm({ avatar: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="url"
//         name="avatar"
//         id="avatar-input"
//         required
//         value={values.avatar}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_avatar ${
//           errors.avatar ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link do avatar"
//         disabled={isLoading}
//       />

//       <span
//         className={`popup__input-error avatar-input-error ${
//           errors.avatar ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.avatar}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Salvando..." : "Salvar"}
//       </button>
//     </form>
//   );
// }

// // ===============================validadooo =========================

// // ULTIMAS ATUALIZAÇÕES FICOU PERFEITO (SÓ FALTA OS LOADING)
// // src/components/Main/components/Popup/components/EditAvatar/EditAvatar.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditAvatar({
//   onUpdateAvatar,
//   isLoading = false,
//   isOpen = false, // adicionamos isOpen para acompanhar o popup
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ avatar: "" });

//   // Resetar formulário quando o popup abrir
//   React.useEffect(() => {
//     if (isOpen) {
//       resetForm({ avatar: "" }, {}, false);
//     }
//   }, [isOpen, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return;

//     onUpdateAvatar({ avatar: values.avatar });

//     // limpa o formulário após submit (App fecha o popup)
//     resetForm({ avatar: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="url"
//         name="avatar"
//         id="avatar-input"
//         required
//         value={values.avatar}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_avatar ${
//           errors.avatar ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link do avatar"
//         disabled={isLoading}
//       />

//       <span
//         className={`popup__input-error avatar-input-error ${
//           errors.avatar ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.avatar}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Salvando..." : "Salvar"}
//       </button>
//     </form>
//   );
// }

// // ==========================================================

// // src/components/Main/components/Popup/components/EditAvatar/EditAvatar.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditAvatar({
//   onUpdateAvatar,
//   isLoading = false, // <-- loading correto chegando
//   isOpen = false,
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ avatar: "" });

//   // Resetar formulário quando o popup abrir
//   React.useEffect(() => {
//     if (isOpen) {
//       resetForm({ avatar: "" }, {}, false);
//     }
//   }, [isOpen, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return;

//     onUpdateAvatar({ avatar: values.avatar });

//     resetForm({ avatar: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="url"
//         name="avatar"
//         id="avatar-input"
//         required
//         value={values.avatar}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_avatar ${
//           errors.avatar ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link do avatar"
//         disabled={isLoading}
//       />

//       <span
//         className={`popup__input-error avatar-input-error ${
//           errors.avatar ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.avatar}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Salvando..." : "Salvar"}
//       </button>
//     </form>
//   );
// }

// // FUNCIONANDOOOOOO src/components/Main/components/Popup/components/EditAvatar/EditAvatar.jsx
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditAvatar({ onUpdateAvatar, isLoading = false }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ avatar: "" });

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return; // proteção extra

//     onUpdateAvatar({ avatar: values.avatar });

//     // limpa o formulário após submit (App fecha o popup)
//     resetForm({ avatar: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="url"
//         name="avatar"
//         id="avatar-input"
//         required
//         value={values.avatar}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_avatar ${
//           errors.avatar ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link do avatar"
//         disabled={isLoading}
//       />

//       <span
//         className={`popup__input-error avatar-input-error ${
//           errors.avatar ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.avatar}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Salvando..." : "Salvar"}
//       </button>
//     </form>
//   );
// }

// // src/components/Main/components/Popup/components/EditAvatar/EditAvatar.jsx
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditAvatar({ onUpdateAvatar, isLoading = false }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ avatar: "" });

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid) return;

//     onUpdateAvatar({ avatar: values.avatar });

//     // opcional: limpa campo local
//     resetForm({ avatar: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="url"
//         name="avatar"
//         id="avatar-input"
//         required
//         value={values.avatar}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_avatar ${
//           errors.avatar ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link do avatar"
//         disabled={isLoading}
//       />

//       <span
//         className={`popup__input-error avatar-input-error ${
//           errors.avatar ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.avatar}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Salvando..." : "Salvar"}
//       </button>
//     </form>
//   );
// }

// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditAvatar({ onUpdateAvatar, isLoading }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ avatar: "" });

//   function handleSubmit(e) {
//     e.preventDefault();
//     onUpdateAvatar({ avatar: values.avatar });
//     resetForm({ avatar: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="url"
//         name="avatar"
//         id="avatar-input"
//         required
//         value={values.avatar}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_avatar ${
//           errors.avatar ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Link do avatar"
//       />

//       <span
//         className={`popup__input-error avatar-input-error ${
//           errors.avatar ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.avatar}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {isLoading ? "Salvando..." : "Salvar"}
//       </button>
//     </form>
//   );
// }

// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditAvatar({ onUpdateAvatar, isLoading }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ avatar: "" });

//   function handleSubmit(e) {
//     e.preventDefault();
//     onUpdateAvatar({ avatar: values.avatar });
//     resetForm({ avatar: "" }, {}, false);
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="url"
//         id="avatar"
//         className="popup__input"
//         name="avatar"
//         placeholder="Link da imagem do avatar"
//         required
//         value={values.avatar}
//         onChange={handleChange}
//       />
//       <span className="popup__input-error">{errors.avatar}</span>

//       <button
//         type="submit"
//         className={`popup__button ${!isValid ? "popup__button_disabled" : ""}`}
//         disabled={!isValid || isLoading}
//       >
//         {isLoading ? "Salvando..." : "Salvar"}
//       </button>
//     </form>
//   );
// }

// import { useRef, useContext } from "react";
// import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

// export default function EditAvatar() {
//   const { handleUpdateAvatar } = useContext(CurrentUserContext);
//   const avatarRef = useRef();

//   function handleSubmit(e) {
//     e.preventDefault();
//     handleUpdateAvatar({ avatar: avatarRef.current.value });
//   }

//   return (
//     <form
//       className="popup__form"
//       name="form-avatar"
//       noValidate
//       onSubmit={handleSubmit}
//     >
//       <input
//         ref={avatarRef}
//         type="url"
//         id="avatar"
//         className="popup__input popup__input_type_avatar"
//         name="avatar"
//         placeholder="Link da imagem do avatar"
//         required
//       />
//       <span className="popup__input-error" id="avatar-error"></span>

//       <button type="submit" className="popup__button">
//         Salvar
//       </button>
//     </form>
//   );
// }

// export default function EditAvatar() {
//   return (
//     <form className="popup__form" name="form-avatar" noValidate>
//       <input
//         type="url"
//         id="avatar"
//         className="popup__input popup__input_type_avatar"
//         name="avatar"
//         placeholder="Link da imagem do avatar"
//         required
//       />
//       <span className="popup__input-error" id="avatar-error"></span>

//       <button type="submit" className="popup__button">
//         Salvar
//       </button>
//     </form>
//   );
// }
