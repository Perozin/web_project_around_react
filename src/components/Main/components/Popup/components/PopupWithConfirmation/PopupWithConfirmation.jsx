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

// =============================Validadoooooo ========================================

// // ULTIMAS ATUALIZAÇÕES FICOU PERFEITO (SÓ FALTA OS LOADING)
// // src/components/Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx
// import React from "react";
// import Popup from "../../Popup";

// export default function PopupWithConfirmation({
//   isOpen = false,
//   onClose,
//   onConfirm,
//   isLoading = false,
// }) {
//   function handleSubmit(e) {
//     e.preventDefault();
//     if (isLoading) return; // proteção extra

//     onConfirm();
//   }

//   return (
//     <Popup isOpen={isOpen} onClose={onClose} title="Confirmação">
//       <form
//         className="popup__form popup__form_type_confirm"
//         onSubmit={handleSubmit}
//         noValidate
//       >
//         <button
//           type="submit"
//           className={`popup__button popup__button_confirm ${
//             isLoading ? "popup__button_disabled" : ""
//           }`}
//           disabled={isLoading}
//         >
//           {isLoading ? "Excluindo..." : "Sim"}
//         </button>
//       </form>
//     </Popup>
//   );
// }

// ==============================================final============================================

// // src/components/Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx
// import Popup from "../../Popup";

// export default function PopupWithConfirmation({
//   isOpen,
//   onClose,
//   onConfirm,
//   isLoading = false,
// }) {
//   function handleSubmit(e) {
//     e.preventDefault();
//     if (isLoading) return; // evita múltiplos envios
//     onConfirm();
//   }

//   return (
//     <Popup isOpen={isOpen} onClose={onClose} title="Confirmação">
//       <form
//         className="popup__form popup__form_type_confirm"
//         onSubmit={handleSubmit}
//         noValidate
//       >
//         <button
//           type="submit"
//           className={`popup__button popup__button_confirm ${
//             isLoading ? "popup__button_disabled" : ""
//           }`}
//           disabled={isLoading}
//         >
//           {isLoading ? "Excluindo..." : "Sim"}
//         </button>
//       </form>
//     </Popup>
//   );
// }

// // FUNCIONAVAAAAAAA   src/components/Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx
// import Popup from "../../Popup";

// export default function PopupWithConfirmation({
//   isOpen,
//   onClose,
//   onConfirm,
//   isLoading,
// }) {
//   function handleSubmit(e) {
//     e.preventDefault();
//     onConfirm();
//   }

//   return (
//     <Popup isOpen={isOpen} onClose={onClose} title="Confirmação">
//       <form
//         className="popup__form popup__form_type_confirm"
//         onSubmit={handleSubmit}
//         noValidate
//       >
//         <button
//           type="submit"
//           className={`popup__button popup__button_confirm ${
//             isLoading ? "popup__button_disabled" : ""
//           }`}
//           disabled={isLoading}
//         >
//           {isLoading ? "Excluindo..." : "Sim"}
//         </button>
//       </form>
//     </Popup>
//   );
// }

// import Popup from "../../Popup";

// export default function PopupWithConfirmation({
//   isOpen,
//   onClose,
//   onConfirm,
//   isLoading,
// }) {
//   function handleSubmit(e) {
//     e.preventDefault();
//     onConfirm();
//   }

//   return (
//     <Popup
//       name="confirm-delete"
//       title="Tem certeza?"
//       isOpen={isOpen}
//       onClose={onClose}
//     >
//       <form
//         className="popup__form popup__form_type_confirm"
//         onSubmit={handleSubmit}
//       >
//         <button type="submit" className="popup__button popup__button_confirm">
//           {isLoading ? "Excluindo..." : "Sim"}
//         </button>
//       </form>
//     </Popup>
//   );
// }

// import Popup from "../../Popup";

// export default function PopupWithConfirmation({
//   isOpen,
//   onClose,
//   onConfirm,
//   isLoading,
// }) {
//   function handleSubmit(e) {
//     e.preventDefault();
//     onConfirm(); // dispara delete
//   }

//   return (
//     <Popup
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Tem certeza?"
//       name="delete-confirm"
//     >
//       <form className="popup__form" onSubmit={handleSubmit} noValidate>
//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`popup__button ${
//             isLoading ? "popup__button_disabled" : ""
//           }`}
//         >
//           {isLoading ? "Excluindo..." : "Sim, excluir"}
//         </button>
//       </form>
//     </Popup>
//   );
// }

// import useLoadingButton from "../../../../../../hooks/useLoadingButton";

// export default function PopupWithConfirmation({ onConfirm }) {
//   const { isLoading, buttonText, startLoading, stopLoading } =
//     useLoadingButton("Sim, excluir");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       startLoading("Excluindo...");
//       await onConfirm(); // <- dispara delete no App.jsx
//     } finally {
//       stopLoading();
//     }
//   }

//   return (
//     <form className="popup__form" onSubmit={handleSubmit}>
//       <h3 className="popup__title">Tem certeza?</h3>

//       <button
//         type="submit"
//         className={`popup__submit-button ${
//           isLoading ? "popup__submit-button_disabled" : ""
//         }`}
//         disabled={isLoading}
//       >
//         {buttonText}
//       </button>
//     </form>
//   );
// }

// import Popup from "./Popup";

// export default function PopupWithConfirmation({
//   isOpen,
//   onClose,
//   onConfirm,
//   isLoading,
// }) {
//   function handleSubmit(e) {
//     e.preventDefault();
//     onConfirm();
//   }

//   return (
//     <Popup isOpen={isOpen} onClose={onClose} title="Confirmação">
//       <form className="popup__form" onSubmit={handleSubmit} noValidate>
//         <p className="popup__text">Esta ação não poderá ser desfeita.</p>

//         <button type="submit" className="popup__button">
//           {isLoading ? "Apagando..." : "Sim"}
//         </button>
//       </form>
//     </Popup>
//   );
// }
