// src/components/Main/components/Popup/components/Popup.jsx
import { useEffect } from "react";

export default function Popup({ onClose, title, children, isOpen = false }) {
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

  // Classes do conteúdo (mantida 100% a estrutura original)
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
      aria-hidden={!isOpen}
      role="dialog"
    >
      <div className={contentClass}>
        <button
          aria-label="Close modal"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />

        {title && <h3 className="popup__title">{title}</h3>}

        {/* Renderização correta dos filhos */}
        {children}
      </div>
    </div>
  );
}

// ===========================vamos verrrr ===========================

// // src/components/Main/components/Popup/components/Popup.jsx
// import { useEffect } from "react";

// export default function Popup({ onClose, title, children, isOpen = false }) {
//   // Fechar com ESC
//   useEffect(() => {
//     if (!isOpen) return;

//     function handleEscClose(evt) {
//       if (evt.key === "Escape") {
//         onClose();
//       }
//     }

//     document.addEventListener("keydown", handleEscClose);

//     return () => {
//       document.removeEventListener("keydown", handleEscClose);
//     };
//   }, [isOpen, onClose]);

//   // Fechar clicando no overlay
//   function handleOverlayClick(evt) {
//     if (evt.target.classList.contains("popup")) {
//       onClose();
//     }
//   }

//   const contentClass = `
//     popup__content
//     ${!title ? "popup__content_image" : ""}
//     ${title === "Alterar avatar" ? "popup__content_avatar" : ""}
//     ${title === "Confirmação" ? "popup__content_confirm-delete" : ""}
//   `;

//   return (
//     <div
//       className={`popup ${isOpen ? "popup_is-opened" : ""}`}
//       onMouseDown={handleOverlayClick}
//       aria-hidden={!isOpen}
//       role="dialog"
//     >
//       <div className={contentClass}>
//         <button
//           aria-label="Close modal"
//           className="popup__close-button"
//           type="button"
//           onClick={onClose}
//         />

//         {title && <h3 className="popup__title">{title}</h3>}

//         {/* Agora funciona: renderização normal do React */}
//         {children}
//       </div>
//     </div>
//   );
// }

// ========================================inicio =================================

// // ULTIMAS ATUALIZAÇÕES FICOU PERFEITO (SÓ FALTA OS LOADING)
// // src/components/Main/components/Popup/components/Popup.jsx
// import { useEffect } from "react";

// export default function Popup({ onClose, title, children, isOpen = false }) {
//   // Fechar com ESC
//   useEffect(() => {
//     if (!isOpen) return;

//     function handleEscClose(evt) {
//       if (evt.key === "Escape") {
//         onClose();
//       }
//     }

//     document.addEventListener("keydown", handleEscClose);

//     return () => {
//       document.removeEventListener("keydown", handleEscClose);
//     };
//   }, [isOpen, onClose]);

//   // Fechar clicando no overlay
//   function handleOverlayClick(evt) {
//     if (evt.target.classList.contains("popup")) {
//       onClose();
//     }
//   }

//   const contentClass = `
//     popup__content
//     ${!title ? "popup__content_image" : ""}
//     ${title === "Alterar avatar" ? "popup__content_avatar" : ""}
//     ${title === "Confirmação" ? "popup__content_confirm-delete" : ""}
//   `;

//   return (
//     <div
//       className={`popup ${isOpen ? "popup_is-opened" : ""}`}
//       onMouseDown={handleOverlayClick}
//       aria-hidden={!isOpen}
//       role="dialog"
//     >
//       <div className={contentClass}>
//         <button
//           aria-label="Close modal"
//           className="popup__close-button"
//           type="button"
//           onClick={onClose}
//         />

//         {title && <h3 className="popup__title">{title}</h3>}

//         {/* AQUI ESTÁ A MAGIA */}
//         {typeof children === "function" ? children() : children}
//       </div>
//     </div>
//   );
// }

// =================================final ==========================================

// // src/components/Popup/Popup.jsx
// import { useEffect } from "react";

// export default function Popup({ onClose, title, children, isOpen = false }) {
//   // Fechar com ESC
//   useEffect(() => {
//     if (!isOpen) return;

//     function handleEscClose(evt) {
//       if (evt.key === "Escape") {
//         onClose();
//       }
//     }

//     document.addEventListener("keydown", handleEscClose);

//     return () => {
//       document.removeEventListener("keydown", handleEscClose);
//     };
//   }, [isOpen, onClose]);

//   // Fechar clicando no overlay
//   function handleOverlayClick(evt) {
//     if (evt.target.classList.contains("popup")) {
//       onClose();
//     }
//   }

//   const contentClass = `
//     popup__content
//     ${!title ? "popup__content_image" : ""}
//     ${title === "Alterar avatar" ? "popup__content_avatar" : ""}
//     ${title === "Confirmação" ? "popup__content_confirm-delete" : ""}
//   `;

//   return (
//     <div
//       className={`popup ${isOpen ? "popup_is-opened" : ""}`}
//       onMouseDown={handleOverlayClick}
//       aria-hidden={!isOpen}
//       role="dialog"
//     >
//       <div className={contentClass}>
//         <button
//           aria-label="Close modal"
//           className="popup__close-button"
//           type="button"
//           onClick={onClose}
//         />

//         {title && <h3 className="popup__title">{title}</h3>}

//         {children}
//       </div>
//     </div>
//   );
// }

// // src/components/Popup/Popup.jsx
// import { useEffect } from "react";

// export default function Popup({ onClose, title, children, isOpen = false }) {
//   // Fechar com ESC
//   useEffect(() => {
//     if (!isOpen) return;

//     function handleEscClose(evt) {
//       if (evt.key === "Escape") {
//         onClose();
//       }
//     }

//     document.addEventListener("keydown", handleEscClose);

//     return () => {
//       document.removeEventListener("keydown", handleEscClose);
//     };
//   }, [isOpen, onClose]);

//   // Fechar clicando no overlay
//   function handleOverlayClick(evt) {
//     if (evt.target.classList.contains("popup")) {
//       onClose();
//     }
//   }

//   // Classes específicas de cada popup
//   const contentClass = `
//     popup__content
//     ${!title ? "popup__content_image" : ""}
//     ${title === "Alterar avatar" ? "popup__content_avatar" : ""}
//     ${title === "Confirmação" ? "popup__content_confirm-delete" : ""}
//   `;

//   return (
//     <div
//       className={`popup ${isOpen ? "popup_opened" : ""}`}
//       onMouseDown={handleOverlayClick}
//       aria-hidden={!isOpen}
//       role="dialog"
//     >
//       <div className={contentClass}>
//         <button
//           aria-label="Close modal"
//           className="popup__close-button"
//           type="button"
//           onClick={onClose}
//         />
//         {title && <h3 className="popup__title">{title}</h3>}
//         {children}
//       </div>
//     </div>
//   );
// }

// // src/components/Popup/Popup.jsx
// import { useEffect } from "react";

// export default function Popup({ onClose, title, children, isOpen = false }) {
//   // Fechar com ESC
//   useEffect(() => {
//     if (!isOpen) return;

//     function handleEscClose(evt) {
//       if (evt.key === "Escape") {
//         onClose();
//       }
//     }

//     document.addEventListener("keydown", handleEscClose);

//     return () => {
//       document.removeEventListener("keydown", handleEscClose);
//     };
//   }, [isOpen, onClose]);

//   // Fechar clicando no overlay
//   function handleOverlayClick(evt) {
//     if (evt.target.classList.contains("popup")) {
//       onClose();
//     }
//   }

//   // Classes específicas de cada popup
//   const contentClass = `
//     popup__content
//     ${!title ? "popup__content_image" : ""}
//     ${title === "Alterar avatar" ? "popup__content_avatar" : ""}
//     ${title === "Confirmação" ? "popup__content_confirm-delete" : ""}
//   `;

//   return (
//     <div
//       className={`popup ${isOpen ? "popup_is-opened" : ""}`}
//       onMouseDown={handleOverlayClick}
//       aria-hidden={!isOpen}
//       role="dialog"
//     >
//       <div className={contentClass}>
//         <button
//           aria-label="Close modal"
//           className="popup__close-button"
//           type="button"
//           onClick={onClose}
//         />
//         {title && <h3 className="popup__title">{title}</h3>}
//         {children}
//       </div>
//     </div>
//   );
// }

// import { useEffect } from "react";

// export default function Popup({ onClose, title, children, isOpen }) {
//   // Fechar com ESC
//   useEffect(() => {
//     if (!isOpen) return;

//     function handleEscClose(evt) {
//       if (evt.key === "Escape") {
//         onClose();
//       }
//     }

//     document.addEventListener("keydown", handleEscClose);

//     return () => {
//       document.removeEventListener("keydown", handleEscClose);
//     };
//   }, [isOpen, onClose]);

//   // Fechar clicando no overlay
//   function handleOverlayClick(evt) {
//     if (evt.target.classList.contains("popup")) {
//       onClose();
//     }
//   }

//   // Classes específicas de cada popup
//   const contentClass = `
//     popup__content
//     ${!title ? "popup__content_image" : ""}
//     ${title === "Alterar avatar" ? "popup__content_avatar" : ""}
//     ${title === "Confirmação" ? "popup__content_confirm-delete" : ""}
//   `;

//   return (
//     <div
//       className={`popup ${isOpen ? "popup_is-opened" : ""}`}
//       onMouseDown={handleOverlayClick}
//     >
//       <div className={contentClass}>
//         <button
//           aria-label="Close modal"
//           className="popup__close-button"
//           type="button"
//           onClick={onClose}
//         />
//         {title && <h3 className="popup__title">{title}</h3>}
//         {children}
//       </div>
//     </div>
//   );
// }
