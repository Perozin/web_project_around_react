// Funcionando plenamente tudo, inclusive o like
// src/components/Main/components/Card/Card.jsx
import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Segurança caso dados ainda não estejam carregados
  if (!card || !currentUser) return null;

  // Normaliza owner que pode vir como string ou objeto
  const ownerId = card?.owner?._id || card?.owner;
  const userId = currentUser?._id;

  const isOwn = ownerId === userId;

  // // 🔥 Normaliza o array de likes (pode vir undefined da API!)
  // const likesArray = Array.isArray(card.likes) ? card.likes : [];

  // --- 🔥 NOVA LÓGICA UNIVERSAL PARA LIKE ---
  // Suporta API antiga (likes:[]) e nova (isLiked: true)
  let isLiked = false;

  if (Array.isArray(card.likes)) {
    // Verifica se o usuário atual já deu like
    isLiked = card.likes.some((like) => {
      const likeId = typeof like === "string" ? like : like?._id;
      return likeId === userId;
    });
  } else if (typeof card.isLiked === "boolean") {
    // API
    isLiked = card.isLiked;
  }

  // Classe CSS do botão de like
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card); // envia o card completo para App.jsx
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={() => onImageClick(card)}
      />

      {isOwn && (
        <button
          type="button"
          aria-label="Delete card"
          className="element__delete-button"
          onClick={handleDeleteClick}
        />
      )}

      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>

        <button
          type="button"
          aria-label="Like card"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

// // só não estava funcionando o botão like
// // src/components/Main/components/Card/Card.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../../../contexts/CurrentUserContext";

// export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
//   const currentUser = useContext(CurrentUserContext);

//   // Proteção contra dados ainda não carregados
//   if (!card || !currentUser) return null;

//   // Owner pode ser string ou objeto dependendo da API → normalização
//   const ownerId = card?.owner?._id || card?.owner;
//   const userId = currentUser?._id;

//   const isOwn = ownerId === userId;

//   // Normalização de likes (a API envia string OU objeto)
//   const likesArray = Array.isArray(card.likes) ? card.likes : [];

//   const isLiked = likesArray.some(
//     (like) => (typeof like === "string" ? like : like?._id) === userId
//   );

//   const cardLikeButtonClassName = `element__like-button ${
//     isLiked ? "element__like-button_is-active" : ""
//   }`;

//   function handleLikeClick() {
//     onCardLike(card);
//   }

//   function handleDeleteClick() {
//     onCardDelete(card);
//   }

//   return (
//     <li className="element">
//       <img
//         src={card.link}
//         alt={card.name}
//         className="element__image"
//         onClick={() => onImageClick(card)}
//       />

//       {isOwn && (
//         <button
//           type="button"
//           aria-label="Delete card"
//           className="element__delete-button"
//           onClick={handleDeleteClick}
//         />
//       )}

//       <div className="element__description">
//         <h2 className="element__title">{card.name}</h2>

//         <button
//           type="button"
//           aria-label="Like card"
//           className={cardLikeButtonClassName}
//           onClick={handleLikeClick}
//         />
//       </div>
//     </li>
//   );
// }

// ==============================vamos verrrrrr===================================

// // src/components/Main/components/Card/Card.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../../../contexts/CurrentUserContext";

// export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
//   const currentUser = useContext(CurrentUserContext);

//   if (!card || !currentUser) return null;

//   const ownerId = card?.owner?._id || card?.owner;
//   const userId = currentUser?._id;

//   const isOwn = ownerId === userId;

//   // Agora usando SEMPRE a lista `likes` do servidor
//   const likesArray = Array.isArray(card.likes) ? card.likes : [];

//   const isLiked = likesArray.some((like) => {
//     return (typeof like === "string" ? like : like?._id) === userId;
//   });

//   const cardLikeButtonClassName = `element__like-button ${
//     isLiked ? "element__like-button_is-active" : ""
//   }`;

//   function handleLikeClick() {
//     onCardLike(card);
//   }

//   function handleDeleteClick() {
//     onCardDelete(card);
//   }

//   return (
//     <li className="element">
//       <img
//         src={card.link}
//         alt={card.name}
//         className="element__image"
//         onClick={() => onImageClick(card)}
//       />

//       {isOwn && (
//         <button
//           type="button"
//           aria-label="Delete card"
//           className="element__delete-button"
//           onClick={handleDeleteClick}
//         />
//       )}

//       <div className="element__description">
//         <h2 className="element__title">{card.name}</h2>

//         <button
//           type="button"
//           aria-label="Like card"
//           className={cardLikeButtonClassName}
//           onClick={handleLikeClick}
//         />
//       </div>
//     </li>
//   );
// }

// // src/components/Main/components/Card/Card.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../../../contexts/CurrentUserContext";

// export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
//   const currentUser = useContext(CurrentUserContext);

//   // Caso ainda não tenha carregado os dados
//   if (!card || !currentUser) return null;

//   // -------------------------------
//   // 🔹 DONO DO CARD
//   // O backend ora manda owner como string, ora como objeto => tratamos ambos
//   // -------------------------------
//   const ownerId = card?.owner?._id || card?.owner;
//   const userId = currentUser?._id;

//   const isOwn = ownerId === userId;

//   // -------------------------------
//   // 🔹 LIKE DO CARD
//   // Backend pode enviar:
//   //   1) likes: []  (array)
//   //   2) isLiked: Boolean (TREINER)
//   //
//   // Aqui cobrimos ambos, dando prioridade ao isLiked (Sprint atual)
//   // -------------------------------
//   let isLiked = false;

//   if (typeof card.isLiked === "boolean") {
//     // ✔ Servidor já envia pronto
//     isLiked = card.isLiked;
//   } else {
//     // ✔ Segurança caso precise usar array
//     const likesArray = Array.isArray(card.likes) ? card.likes : [];

//     isLiked = likesArray.some((like) => {
//       const likeId = typeof like === "string" ? like : like?._id;
//       return likeId === userId;
//     });
//   }

//   // -------------------------------
//   // 🔹 Classe CSS do botão Like
//   // -------------------------------
//   const cardLikeButtonClassName = `element__like-button ${
//     isLiked ? "element__like-button_is-active" : ""
//   }`;

//   // -------------------------------
//   // 🔹 RENDER
//   // -------------------------------
//   return (
//     <li className="element">
//       <img
//         src={card.link}
//         alt={card.name}
//         className="element__image"
//         onClick={() => onImageClick(card)}
//       />

//       {isOwn && (
//         <button
//           type="button"
//           aria-label="Delete card"
//           className="element__delete-button"
//           onClick={() => onCardDelete(card)}
//         />
//       )}

//       <div className="element__description">
//         <h2 className="element__title">{card.name}</h2>

//         <button
//           type="button"
//           aria-label="Like card"
//           className={cardLikeButtonClassName}
//           onClick={() => onCardLike(card)}
//         />
//       </div>
//     </li>
//   );
// }

// ==========================================incio=========================================

// // ULTIMAS ATUALIZAÇÕES FICOU PERFEITO (SÓ FALTA OS LOADING)

// // Versão antiga funcionando plenemente
// // src/components/Main/components/Card/Card.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../../../contexts/CurrentUserContext";

// export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
//   const currentUser = useContext(CurrentUserContext);

//   if (!card || !currentUser) return null;

//   const ownerId = card?.owner?._id || card?.owner;
//   const userId = currentUser?._id;

//   const isOwn = ownerId === userId;

//   const likesArray = Array.isArray(card.likes) ? card.likes : [];

//   const isLiked = likesArray.some((like) => {
//     const likeId = typeof like === "string" ? like : like?._id;
//     return likeId === userId;
//   });

//   // 🔥 Correção: classe CSS correta
//   const cardLikeButtonClassName = `element__like-button ${
//     isLiked ? "element__like-button_is-active" : ""
//   }`;

//   return (
//     <li className="element">
//       <img
//         src={card.link}
//         alt={card.name}
//         className="element__image"
//         onClick={() => onImageClick(card)}
//       />

//       {isOwn && (
//         <button
//           type="button"
//           aria-label="Delete card"
//           className="element__delete-button"
//           onClick={() => onCardDelete(card)}
//         />
//       )}

//       <div className="element__description">
//         <h2 className="element__title">{card.name}</h2>
//         <button
//           type="button"
//           aria-label="Like card"
//           className={cardLikeButtonClassName}
//           onClick={() => onCardLike(card)}
//         />
//       </div>
//     </li>
//   );
// }

// ====================================final =============================================

// // src/components/Main/components/Card/Card.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../../../contexts/CurrentUserContext";

// export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
//   const currentUser = useContext(CurrentUserContext);

//   if (!card || !currentUser) return null;

//   const ownerId = card?.owner?._id || card?.owner;
//   const userId = currentUser?._id;

//   const isOwn = ownerId === userId;

//   const likesArray = Array.isArray(card.likes) ? card.likes : [];

//   const isLiked = likesArray.some((like) => {
//     const likeId = typeof like === "string" ? like : like?._id;
//     return likeId === userId;
//   });

//   const cardLikeButtonClassName = `element__like-button ${
//     isLiked ? "element__like-button_active" : ""
//   }`;

//   return (
//     <li className="element">
//       <img
//         src={card.link}
//         alt={card.name}
//         className="element__image"
//         onClick={() => onImageClick(card)}
//       />

//       {isOwn && (
//         <button
//           type="button"
//           aria-label="Delete card"
//           className="element__delete-button"
//           onClick={() => onCardDelete(card)}
//         />
//       )}

//       <div className="element__description">
//         <h2 className="element__title">{card.name}</h2>
//         <button
//           type="button"
//           aria-label="Like card"
//           className={cardLikeButtonClassName}
//           onClick={() => onCardLike(card)}
//         />
//       </div>
//     </li>
//   );
// }

// // Like não mudava o caração => servidor só pegava o like = true
// // src/components/Main/components/Card/Card.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../../../contexts/CurrentUserContext";

// export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
//   // Aqui o currentUser é o objeto inteiro
//   const currentUser = useContext(CurrentUserContext);

//   // Segurança absoluta
//   if (!card || !currentUser) return null;

//   const ownerId = card?.owner?._id || card?.owner; // Owner pode vir como string OU objeto
//   const userId = currentUser?._id;

//   const isOwn = ownerId === userId;

//   const likesArray = Array.isArray(card.likes) ? card.likes : [];

//   const isLiked = likesArray.some((like) => {
//     const likeId = typeof like === "string" ? like : like?._id;
//     return likeId === userId;
//   });

//   const cardLikeButtonClassName = `element__like-button ${
//     isLiked ? "element__like-button_is-active" : ""
//   }`;

//   return (
//     <li className="element">
//       <img
//         src={card.link}
//         alt={card.name}
//         className="element__image"
//         onClick={() => onImageClick(card)}
//       />

//       {isOwn && (
//         <button
//           type="button"
//           aria-label="Delete card"
//           className="element__delete-button"
//           onClick={() => onCardDelete(card)}
//         />
//       )}

//       <div className="element__description">
//         <h2 className="element__title">{card.name}</h2>
//         <button
//           type="button"
//           aria-label="Like card"
//           className={cardLikeButtonClassName}
//           onClick={() => onCardLike(card)}
//         />
//       </div>
//     </li>
//   );
// }

// // src/components/Main/components/Card/Card.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../../../contexts/CurrentUserContext";

// export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
//   const { currentUser } = useContext(CurrentUserContext);

//   if (!card) return null;

//   const isOwn = card.owner === currentUser._id;

//   // Como likes provavelmente também vêm como array de IDs (strings)
//   const isLiked =
//     card.likes &&
//     card.likes.some((like) =>
//       typeof like === "string"
//         ? like === currentUser._id
//         : like._id === currentUser._id
//     );

//   const cardLikeButtonClassName = `element__like-button ${
//     isLiked ? "element__like-button_is-active" : ""
//   }`;

//   return (
//     <li className="element">
//       <img
//         src={card.link}
//         alt={card.name}
//         className="element__image"
//         onClick={() => onImageClick(card)}
//       />

//       {isOwn && (
//         <button
//           type="button"
//           aria-label="Delete card"
//           className="element__delete-button"
//           onClick={() => onCardDelete(card)}
//         />
//       )}

//       <div className="element__description">
//         <h2 className="element__title">{card.name}</h2>
//         <button
//           type="button"
//           aria-label="Like card"
//           className={cardLikeButtonClassName}
//           onClick={() => onCardLike(card)}
//         />
//       </div>
//     </li>
//   );
// }

// import { useContext } from "react";
// import CurrentUserContext from "../../../../contexts/CurrentUserContext";

// export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
//   const { currentUser } = useContext(CurrentUserContext);

//   if (!card) return null;

//   // const isOwn = card.owner && card.owner._id === currentUser._id;
//   // const isOwn = card.owner._id === currentUser._id;
//   const isOwn = card.owner === currentUser._id;

//   const isLiked =
//     card.likes && card.likes.some((u) => u._id === currentUser._id);

//   const cardLikeButtonClassName = `element__like-button ${
//     isLiked ? "element__like-button_is-active" : ""
//   }`;

//   return (
//     <li className="element">
//       <img
//         src={card.link}
//         alt={card.name}
//         className="element__image"
//         onClick={() => onImageClick(card)}
//       />

//       {isOwn && (
//         <button
//           type="button"
//           aria-label="Delete card"
//           className="element__delete-button"
//           onClick={() => onCardDelete(card)}
//         />
//       )}

//       <div className="element__description">
//         <h2 className="element__title">{card.name}</h2>
//         <button
//           type="button"
//           aria-label="Like card"
//           className={cardLikeButtonClassName}
//           onClick={() => onCardLike(card)}
//         >
//           {/* opcional: mostrar contador de likes */}
//           {/* <span className="element__like-count">
//             {card.likes ? card.likes.length : 0}
//           </span> */}
//         </button>
//       </div>
//     </li>
//   );
// }

// export default function Card({ card, onImageClick }) {
//   return (
//     <li className="element">
//       <img
//         src={card.link}
//         alt={card.name}
//         className="element__image"
//         onClick={() => onImageClick(card)}
//       />

//       <button
//         type="button"
//         aria-label="Delete card"
//         className="element__delete-button"
//       />

//       <div className="element__description">
//         <h2 className="element__title">{card.name}</h2>
//         <button
//           type="button"
//           aria-label="Like card"
//           className="element__like-button"
//         />
//       </div>
//     </li>
//   );
// }
