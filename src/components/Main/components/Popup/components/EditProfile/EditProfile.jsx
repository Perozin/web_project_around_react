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

// // // Funcionando abrir poppup, validações (falta o botão submit)
// // src/components/Main/components/Popup/components/EditProfile/EditProfile.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditProfile({
//   isOpen = false,
//   onUpdateUser,
//   isLoading = false,
//   currentUser = {},
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ name: "", about: "" });

//   // Preenche inputs quando o popup abre
//   React.useEffect(() => {
//     if (isOpen && currentUser) {
//       resetForm(
//         {
//           name: currentUser.name || "",
//           about: currentUser.about || "",
//         },
//         {},
//         true
//       );
//     }
//   }, [isOpen, currentUser, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return;

//     onUpdateUser({
//       name: values.name,
//       about: values.about,
//     });
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="name"
//         id="name-input"
//         minLength="2"
//         maxLength="40"
//         required
//         value={values.name}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_name ${
//           errors.name ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Nome"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error name-input-error ${
//           errors.name ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.name}
//       </span>

//       <input
//         type="text"
//         name="about"
//         id="about-input"
//         minLength="2"
//         maxLength="200"
//         required
//         value={values.about}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_activity ${
//           errors.about ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Sobre"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error about-input-error ${
//           errors.about ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.about}
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

// // ==================================validado==========================

// // ULTIMAS ATUALIZAÇÕES FICOU PERFEITO (SÓ FALTA OS LOADING)
// // src/components/Main/components/Popup/components/EditProfile/EditProfile.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditProfile({
//   isOpen = false,
//   onUpdateUser,
//   isLoading = false,
//   currentUser = {},
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ name: "", about: "" });

//   // Atualiza os campos quando o popup abre ou currentUser muda
//   React.useEffect(() => {
//     if (isOpen && currentUser) {
//       resetForm(
//         {
//           name: currentUser.name || "",
//           about: currentUser.about || "",
//         },
//         {},
//         true
//       );
//     }
//   }, [isOpen, currentUser, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return;

//     onUpdateUser({
//       name: values.name,
//       about: values.about,
//     });
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="name"
//         id="name-input"
//         minLength="2"
//         maxLength="40"
//         required
//         value={values.name}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_name ${
//           errors.name ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Nome"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error name-input-error ${
//           errors.name ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.name}
//       </span>

//       <input
//         type="text"
//         name="about"
//         id="about-input"
//         minLength="2"
//         maxLength="200"
//         required
//         value={values.about}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_activity ${
//           errors.about ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Sobre"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error about-input-error ${
//           errors.about ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.about}
//       </span>

//       <button
//         type="submit"
//         disabled={!isValid || isLoading}
//         className={`popup__button ${
//           !isValid || isLoading ? "popup__button_disabled" : ""
//         }`}
//       >
//         {/* ✅ Aqui o loading vai funcionar perfeitamente */}
//         {isLoading ? "Salvando..." : "Salvar"}
//       </button>
//     </form>
//   );
// }

// // ======================================================================================

// // src/components/Main/components/Popup/components/EditProfile/EditProfile.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditProfile({
//   isOpen = false,
//   onUpdateUser,
//   isLoading = false, // <-- recebe do App.jsx corretamente
//   currentUser = {},
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ name: "", about: "" });

//   // Atualiza os campos quando o popup abre ou currentUser muda
//   React.useEffect(() => {
//     if (isOpen && currentUser) {
//       resetForm(
//         {
//           name: currentUser.name || "",
//           about: currentUser.about || "",
//         },
//         {},
//         true
//       );
//     }
//   }, [isOpen, currentUser, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return;

//     onUpdateUser({
//       name: values.name,
//       about: values.about,
//     });
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="name"
//         id="name-input"
//         minLength="2"
//         maxLength="40"
//         required
//         value={values.name}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_name ${
//           errors.name ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Nome"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error name-input-error ${
//           errors.name ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.name}
//       </span>

//       <input
//         type="text"
//         name="about"
//         id="about-input"
//         minLength="2"
//         maxLength="200"
//         required
//         value={values.about}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_activity ${
//           errors.about ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Sobre"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error about-input-error ${
//           errors.about ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.about}
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

// // FUNCIONANDOOOOOOOOOOOOO src/components/Main/components/Popup/components/EditProfile/EditProfile.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditProfile({
//   isOpen = false,
//   onUpdateUser,
//   isLoading = false,
//   currentUser = {},
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ name: "", about: "" });

//   React.useEffect(() => {
//     if (isOpen && currentUser) {
//       resetForm(
//         {
//           name: currentUser.name || "",
//           about: currentUser.about || "",
//         },
//         {},
//         true
//       );
//     }
//   }, [isOpen, currentUser, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return;

//     onUpdateUser({
//       name: values.name,
//       about: values.about,
//     });
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="name"
//         id="name-input"
//         minLength="2"
//         maxLength="40"
//         required
//         value={values.name}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_name ${
//           errors.name ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Nome"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error name-input-error ${
//           errors.name ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.name}
//       </span>

//       <input
//         type="text"
//         name="about"
//         id="about-input"
//         minLength="2"
//         maxLength="200"
//         required
//         value={values.about}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_activity ${
//           errors.about ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Sobre"
//         disabled={isLoading}
//       />
//       <span
//         className={`popup__input-error about-input-error ${
//           errors.about ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.about}
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

// // src/components/Main/components/Popup/components/EditProfile/EditProfile.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditProfile({
//   isOpen,
//   onUpdateUser,
//   isLoading = false,
//   currentUser,
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ name: "", about: "" });

//   React.useEffect(() => {
//     if (isOpen) {
//       resetForm(
//         {
//           name: currentUser.name || "",
//           about: currentUser.about || "",
//         },
//         {},
//         true // já marca como válido ao abrir
//       );
//     }
//   }, [isOpen, currentUser, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid || isLoading) return; // proteção extra

//     onUpdateUser({
//       name: values.name,
//       about: values.about,
//     });
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="name"
//         id="name-input"
//         minLength="2"
//         maxLength="40"
//         required
//         value={values.name}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_name ${
//           errors.name ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Nome"
//         disabled={isLoading}
//       />

//       <span
//         className={`popup__input-error name-input-error ${
//           errors.name ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.name}
//       </span>

//       <input
//         type="text"
//         name="about"
//         id="about-input"
//         minLength="2"
//         maxLength="200"
//         required
//         value={values.about}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_activity ${
//           errors.about ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Sobre"
//         disabled={isLoading}
//       />

//       <span
//         className={`popup__input-error about-input-error ${
//           errors.about ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.about}
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

// // src/components/Main/components/Popup/components/EditProfile/EditProfile.jsx
// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditProfile({
//   isOpen,
//   onUpdateUser,
//   isLoading = false,
//   currentUser,
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ name: "", about: "" });

//   React.useEffect(() => {
//     if (isOpen) {
//       // ao abrir, preenche com currentUser e marca como válido
//       resetForm(
//         {
//           name: currentUser.name || "",
//           about: currentUser.about || "",
//         },
//         {},
//         true
//       );
//     }
//   }, [isOpen, currentUser, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!isValid) return;

//     onUpdateUser({
//       name: values.name,
//       about: values.about,
//     });
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="name"
//         id="name-input"
//         minLength="2"
//         maxLength="40"
//         required
//         value={values.name}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_name ${
//           errors.name ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Nome"
//         disabled={isLoading}
//       />

//       <span
//         className={`popup__input-error name-input-error ${
//           errors.name ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.name}
//       </span>

//       <input
//         type="text"
//         name="about"
//         id="about-input"
//         minLength="2"
//         maxLength="200"
//         required
//         value={values.about}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_activity ${
//           errors.about ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Sobre"
//         disabled={isLoading}
//       />

//       <span
//         className={`popup__input-error about-input-error ${
//           errors.about ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.about}
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

// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditProfile({
//   isOpen,
//   onUpdateUser,
//   isLoading,
//   currentUser,
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ name: "", about: "" });

//   React.useEffect(() => {
//     if (isOpen) {
//       resetForm(
//         {
//           name: currentUser.name || "",
//           about: currentUser.about || "",
//         },
//         {},
//         true
//       );
//     }
//   }, [isOpen, currentUser, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     onUpdateUser({
//       name: values.name,
//       about: values.about,
//     });
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit} noValidate>
//       <input
//         type="text"
//         name="name"
//         id="name-input"
//         minLength="2"
//         maxLength="40"
//         required
//         value={values.name}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_name ${
//           errors.name ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Nome"
//       />

//       <span
//         className={`popup__input-error name-input-error ${
//           errors.name ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.name}
//       </span>

//       <input
//         type="text"
//         name="about"
//         id="about-input"
//         minLength="2"
//         maxLength="200"
//         required
//         value={values.about}
//         onChange={handleChange}
//         className={`popup__input popup__input_type_activity ${
//           errors.about ? "popup__input_type_error" : ""
//         }`}
//         placeholder="Sobre"
//       />

//       <span
//         className={`popup__input-error about-input-error ${
//           errors.about ? "popup__error_visible" : ""
//         }`}
//       >
//         {errors.about}
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

// import React from "react";
// import useFormWithValidation from "../../../../../../hooks/useFormWithValidation.js";

// export default function EditProfile({
//   isOpen,
//   onClose,
//   onUpdateUser,
//   isLoading,
//   currentUser,
// }) {
//   const { values, errors, isValid, handleChange, resetForm } =
//     useFormWithValidation({ name: "", about: "" });

//   // Quando abrir o popup, preencher os campos com o currentUser
//   React.useEffect(() => {
//     if (isOpen) {
//       resetForm(
//         {
//           name: currentUser.name || "",
//           about: currentUser.about || "",
//         },
//         {},
//         true // formulário válido ao abrir
//       );
//     }
//   }, [isOpen, currentUser, resetForm]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     onUpdateUser({
//       name: values.name,
//       about: values.about,
//     });
//   }

//   return (
//     <form
//       className="popup__form"
//       name="edit-profile-form"
//       onSubmit={handleSubmit}
//       noValidate
//     >
//       <input
//         type="text"
//         className="popup__input popup__input_type_name"
//         id="name"
//         name="name"
//         required
//         minLength="2"
//         maxLength="40"
//         placeholder="Nome"
//         value={values.name}
//         onChange={handleChange}
//       />
//       <span className="popup__input-error">{errors.name}</span>

//       <input
//         type="text"
//         className="popup__input popup__input_type_activity"
//         id="activity"
//         name="about"
//         required
//         minLength="2"
//         maxLength="200"
//         placeholder="Sobre"
//         value={values.about}
//         onChange={handleChange}
//       />
//       <span className="popup__input-error">{errors.about}</span>

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

// export default function EditProfile() {
//   return (
//     <form className="popup__form" name="edit-profile-form" noValidate>
//       <input
//         type="text"
//         className="popup__input popup__input_type_name"
//         id="name"
//         name="name"
//         placeholder="Nome"
//         minLength="2"
//         maxLength="40"
//         required
//       />
//       <span className="popup__input-error" id="name-error"></span>

//       <input
//         type="text"
//         className="popup__input popup__input_type_activity"
//         id="activity"
//         name="activity"
//         placeholder="Sobre"
//         minLength="2"
//         maxLength="200"
//         required
//       />
//       <span className="popup__input-error" id="activity-error"></span>

//       <button type="submit" className="popup__button">
//         Salvar
//       </button>
//     </form>
//   );
// }
