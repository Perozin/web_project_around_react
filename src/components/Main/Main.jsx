// src/components/Main/Main.jsx
import { useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
import PopupWithConfirmation from "./components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

import Card from "./components/Card/Card.jsx";

import avatarPlaceholder from "../../images/Avatar.png";
import avatarVector from "../../images/Avatar_vector.png";
import editButton from "../../images/Edit-Button-Vector.png";
import addButton from "../../images/Vector-add-button.png";

export function Main({
  cards,
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  onCardLike,
  onCardDelete,
  popup,
  onClosePopup,
  selectedCard,
  openImagePopup,
  isConfirmPopupOpen,
  closeConfirmPopup,
  handleConfirmDelete,
  isLoadingDelete,
  handleAddPlace,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      {/* --- PERFIL --- */}
      <section className="profile">
        <div className="profile__image">
          <img
            src={currentUser?.avatar || avatarPlaceholder}
            className="profile__elipse"
            alt="Avatar"
          />
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditAvatarClick}
          >
            <img
              src={avatarVector}
              className="profile__edit-vector"
              alt="editar avatar"
            />
          </button>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name || "Seu nome"}</h1>

          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfileClick}
          >
            <img
              src={editButton}
              alt="editar"
              className="profile__edit-button-vector"
            />
          </button>

          <h2 className="profile__profession">
            {currentUser?.about || "Sua profissão"}
          </h2>
        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlaceClick}
        >
          <img
            src={addButton}
            alt="adicionar"
            className="profile__add-button-vector"
          />
        </button>
      </section>

      {/* --- LISTA DE CARDS --- */}
      <section className="elements page__section">
        <ul className="elements__cards">
          {cards.map(
            (card) =>
              card && (
                <Card
                  key={card._id}
                  card={card}
                  currentUser={currentUser}
                  onImageClick={openImagePopup}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              )
          )}
        </ul>
      </section>

      {/* --- POPUPS --- */}

      {/* Editar Perfil */}
      {popup && popup.title === "Editar perfil" && (
        <Popup onClose={onClosePopup} title={popup.title} isOpen={true}>
          <EditProfile
            isOpen={true}
            currentUser={currentUser}
            onSubmit={popup.children.props.onSubmit}
            onClose={onClosePopup}
            isLoading={popup.children.props.isLoading}
          />
        </Popup>
      )}

      {/* Alterar Avatar */}
      {popup && popup.title === "Alterar avatar" && (
        <Popup onClose={onClosePopup} title={popup.title} isOpen={true}>
          <EditAvatar
            isOpen={true}
            onSubmit={popup.children.props.onSubmit}
            onClose={onClosePopup}
            isLoading={popup.children.props.isLoading}
          />
        </Popup>
      )}

      {/* Novo Local */}
      {popup && popup.title === "Novo local" && (
        <Popup onClose={onClosePopup} title={popup.title} isOpen={true}>
          <NewCard
            isOpen={true}
            onAddPlace={handleAddPlace}
            onClose={onClosePopup}
          />
        </Popup>
      )}

      {/* Imagem ampliada */}
      {popup && popup.title === "" && selectedCard && (
        <ImagePopup card={selectedCard} onClose={onClosePopup} />
      )}

      {/* Confirmação de Delete */}
      {isConfirmPopupOpen && (
        <PopupWithConfirmation
          isOpen={isConfirmPopupOpen}
          onClose={closeConfirmPopup}
          onConfirm={handleConfirmDelete}
          isLoading={isLoadingDelete}
        />
      )}
    </main>
  );
}

// // //  Funcionando Popup, validações e Cards com likes e deletes incluisive
// // src/components/Main/Main.jsx
// import { useContext } from "react";

// import CurrentUserContext from "../../contexts/CurrentUserContext.js";

// import Popup from "./components/Popup/Popup.jsx";
// import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
// import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import Card from "./components/Card/Card.jsx";

// import avatarPlaceholder from "../../images/Avatar.png";
// import avatarVector from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";

// export function Main({
//   cards,
//   onEditProfileClick,
//   onEditAvatarClick,
//   onAddPlaceClick,
//   onCardLike,
//   onCardDelete,
//   popup,
//   onClosePopup,
//   selectedCard,
//   openImagePopup,
//   isConfirmPopupOpen,
//   closeConfirmPopup,
//   handleConfirmDelete,
//   isLoadingDelete,
//   handleAddPlace,
// }) {
//   const currentUser = useContext(CurrentUserContext);

//   return (
//     <main className="content">
//       {/* --- PERFIL --- */}
//       <section className="profile">
//         <div className="profile__image">
//           <img
//             src={currentUser?.avatar || avatarPlaceholder}
//             className="profile__elipse"
//             alt="Avatar"
//           />
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditAvatarClick}
//           >
//             <img
//               src={avatarVector}
//               className="profile__edit-vector"
//               alt="editar avatar"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">{currentUser?.name || "Seu nome"}</h1>

//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditProfileClick}
//           >
//             <img
//               src={editButton}
//               alt="editar"
//               className="profile__edit-button-vector"
//             />
//           </button>

//           <h2 className="profile__profession">
//             {currentUser?.about || "Sua profissão"}
//           </h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={onAddPlaceClick}
//         >
//           <img
//             src={addButton}
//             alt="adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       {/* --- LISTA DE CARDS --- */}
//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {cards.map(
//             (card) =>
//               card && (
//                 <Card
//                   key={card._id}
//                   card={card}
//                   currentUser={currentUser}
//                   onImageClick={openImagePopup}
//                   onCardLike={onCardLike}
//                   onCardDelete={onCardDelete}
//                 />
//               )
//           )}
//         </ul>
//       </section>

//       {/* --- POPUPS --- */}

//       {/* Editar Perfil */}
//       {popup && popup.title === "Editar perfil" && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={true}>
//           <EditProfile
//             isOpen={true}
//             currentUser={currentUser}
//             onSubmit={popup.children.props.onSubmit}
//             onClose={onClosePopup}
//             isLoading={popup.children.props.isLoading}
//           />
//         </Popup>
//       )}

//       {/* Alterar Avatar */}
//       {popup && popup.title === "Alterar avatar" && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={true}>
//           <EditAvatar
//             isOpen={true}
//             onSubmit={popup.children.props.onSubmit}
//             onClose={onClosePopup}
//             isLoading={popup.children.props.isLoading}
//           />
//         </Popup>
//       )}

//       {/* Novo Local */}
//       {popup && popup.title === "Novo local" && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={true}>
//           <NewCard
//             isOpen={true}
//             onAddPlace={handleAddPlace}
//             onClose={onClosePopup}
//           />
//         </Popup>
//       )}

//       {/* Imagem ampliada */}
//       {popup && popup.title === "" && selectedCard && (
//         <ImagePopup card={selectedCard} onClose={onClosePopup} />
//       )}

//       {/* Confirmação de Delete */}
//       {isConfirmPopupOpen && (
//         <PopupWithConfirmation
//           isOpen={isConfirmPopupOpen}
//           onClose={closeConfirmPopup}
//           onConfirm={handleConfirmDelete}
//           isLoading={isLoadingDelete}
//         />
//       )}
//     </main>
//   );
// }

// // =========================================================

// // segundo 2ª premissa
// // src/components/Main/Main.jsx
// import { useContext, useState, useEffect } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext.js";
// import api from "../../utils/api";

// import Popup from "./components/Popup/Popup.jsx";
// import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
// import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import Card from "./components/Card/Card.jsx";

// import avatarPlaceholder from "../../images/Avatar.png";
// import avatarVector from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";

// export function Main({
//   onEditProfileClick,
//   onEditAvatarClick,
//   onAddPlaceClick,
//   popup,
//   onClosePopup,
//   selectedCard,
//   openImagePopup,
// }) {
//   const currentUser = useContext(CurrentUserContext);

//   // --- Estado interno dos cards ---
//   const [cards, setCards] = useState([]);
//   const [cardToDelete, setCardToDelete] = useState(null);
//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

//   const [isLoadingDelete, setIsLoadingDelete] = useState(false);

//   // --- Buscar cards ao montar ---
//   useEffect(() => {
//     api
//       .getInitialCards()
//       .then((data) => setCards(data))
//       .catch(console.error);
//   }, []);

//   // --- Função de like ---
//   // function handleCardLike(card) {
//   //   const isLiked = card.likes?.some((like) => {
//   //     const likeId = typeof like === "string" ? like : like?._id;
//   //     return likeId === currentUser._id;
//   //   });

//   //   api
//   //     .changeLikeCardStatus(card._id, !isLiked)
//   //     .then((updatedCard) => {
//   //       setCards((state) =>
//   //         state.map((c) => (c._id === card._id ? updatedCard : c))
//   //       );
//   //     })
//   //     .catch(console.error);
//   // }

//   async function handleCardLike(card) {
//     try {
//       const isLiked = card.likes.some(
//         (like) =>
//           (typeof like === "string" ? like : like?._id) === currentUser._id
//       );

//       const newCard = await api.changeLikeCardStatus(card._id, !isLiked);

//       setCards((state) =>
//         state.map((currentCard) =>
//           currentCard._id === card._id ? newCard : currentCard
//         )
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // --- Funções de delete ---
//   function handleCardDelete(card) {
//     setCardToDelete(card);
//     setIsConfirmPopupOpen(true);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsLoadingDelete(true);

//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prev) => prev.filter((c) => c._id !== cardToDelete._id));
//         closeConfirmPopup();
//       })
//       .catch(console.error)
//       .finally(() => setIsLoadingDelete(false));
//   }

//   function closeConfirmPopup() {
//     setCardToDelete(null);
//     setIsConfirmPopupOpen(false);
//   }

//   // --- Função de adicionar card ---
//   function handleAddPlace(data) {
//     api
//       .addCard(data)
//       .then((newCard) => setCards((prev) => [newCard, ...prev]))
//       .catch(console.error);
//   }

//   return (
//     <main className="content">
//       {/* --- PERFIL --- */}
//       <section className="profile">
//         <div className="profile__image">
//           <img
//             src={currentUser?.avatar || avatarPlaceholder}
//             className="profile__elipse"
//             alt="Avatar"
//           />
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditAvatarClick}
//           >
//             <img
//               src={avatarVector}
//               className="profile__edit-vector"
//               alt="editar avatar"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">{currentUser?.name || "Seu nome"}</h1>

//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditProfileClick}
//           >
//             <img
//               src={editButton}
//               alt="editar"
//               className="profile__edit-button-vector"
//             />
//           </button>

//           <h2 className="profile__profession">
//             {currentUser?.about || "Sua profissão"}
//           </h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={onAddPlaceClick}
//         >
//           <img
//             src={addButton}
//             alt="adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       {/* --- LISTA DE CARDS --- */}
//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {cards.map(
//             (card) =>
//               card && (
//                 <Card
//                   key={card._id}
//                   card={card}
//                   onImageClick={openImagePopup}
//                   onCardLike={handleCardLike}
//                   onCardDelete={handleCardDelete}
//                   currentUser={currentUser}
//                 />
//               )
//           )}
//         </ul>
//       </section>

//       {/* --- POPUPS --- */}
//       {popup && popup.title === "Editar perfil" && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={true}>
//           <EditProfile
//             isOpen={true}
//             currentUser={currentUser}
//             onUpdateUser={popup.children}
//             onClose={onClosePopup}
//           />
//         </Popup>
//       )}

//       {popup && popup.title === "Alterar avatar" && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={true}>
//           <EditAvatar
//             isOpen={true}
//             onUpdateAvatar={popup.children}
//             onClose={onClosePopup}
//           />
//         </Popup>
//       )}

//       {popup && popup.title === "Novo local" && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={true}>
//           <NewCard
//             isOpen={true}
//             onAddPlace={handleAddPlace}
//             onClose={onClosePopup}
//           />
//         </Popup>
//       )}

//       {popup && popup.title === "" && selectedCard && (
//         <ImagePopup card={selectedCard} onClose={onClosePopup} />
//       )}

//       {isConfirmPopupOpen && (
//         <PopupWithConfirmation
//           isOpen={isConfirmPopupOpen}
//           onClose={closeConfirmPopup}
//           onConfirm={handleConfirmDelete}
//           isLoading={isLoadingDelete}
//         />
//       )}
//     </main>
//   );
// }

// ----------------------------------inico==================================================

// // ULTIMAS ATUALIZAÇÕES FICOU PERFEITO (SÓ FALTA OS LOADING)
// // src/components/Main/Main.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext.js";
// import Popup from "./components/Popup/Popup.jsx";
// import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
// import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import Card from "./components/Card/Card.jsx";

// import avatarPlaceholder from "../../images/Avatar.png";
// import avatarVector from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";

// export function Main({
//   cards,
//   onCardLike,
//   onCardDelete,
//   onClosePopup,
//   popup,
//   selectedCard,
//   openImagePopup,
//   onAddPlace,
//   onEditProfileClick,
//   onEditAvatarClick,
//   onAddPlaceClick,
// }) {
//   const currentUser = useContext(CurrentUserContext);

//   return (
//     <main className="content">
//       <section className="profile">
//         <div className="profile__image">
//           <img
//             src={currentUser?.avatar || avatarPlaceholder}
//             className="profile__elipse"
//             alt="Avatar"
//           />
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditAvatarClick}
//           >
//             <img
//               src={avatarVector}
//               className="profile__edit-vector"
//               alt="editar avatar"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">{currentUser?.name || "Seu nome"}</h1>

//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditProfileClick}
//           >
//             <img
//               src={editButton}
//               alt="editar"
//               className="profile__edit-button-vector"
//             />
//           </button>

//           <h2 className="profile__profession">
//             {currentUser?.about || "Sua profissão"}
//           </h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={onAddPlaceClick}
//         >
//           <img
//             src={addButton}
//             alt="adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {Array.isArray(cards) &&
//             cards.map(
//               (card) =>
//                 card && (
//                   <Card
//                     key={card._id}
//                     card={card}
//                     onImageClick={openImagePopup}
//                     onCardLike={onCardLike}
//                     onCardDelete={onCardDelete}
//                     currentUser={currentUser}
//                   />
//                 )
//             )}
//         </ul>
//       </section>

//       {popup && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={!!popup}>
//           {popup.title === "" ? (
//             <ImagePopup card={selectedCard} />
//           ) : typeof popup.children === "function" ? (
//             popup.children()
//           ) : (
//             popup.children
//           )}
//         </Popup>
//       )}
//     </main>
//   );
// }

// ==================================FIM===============================================

// // src/components/Main/Main.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext.js";

// import Popup from "./components/Popup/Popup.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";

// import Card from "./components/Card/Card.jsx";

// import avatarPlaceholder from "../../images/Avatar.png";
// import avatarVector from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";

// export function Main({
//   cards,
//   onCardLike,
//   onCardDelete,
//   onClosePopup,
//   popup,
//   selectedCard,
//   openImagePopup,
//   onAddPlace,
//   onEditProfileClick,
//   onEditAvatarClick,
//   onAddPlaceClick,

//   // ⬇️ LOADINGS VINDO DO APP.JSX
//   isLoadingProfile,
//   isLoadingAvatar,
//   isLoadingAddPlace,
// }) {
//   const currentUser = useContext(CurrentUserContext);

//   return (
//     <main className="content">
//       <section className="profile">
//         <div className="profile__image">
//           <img
//             src={currentUser?.avatar || avatarPlaceholder}
//             className="profile__elipse"
//             alt="Avatar"
//           />
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditAvatarClick}
//           >
//             <img
//               src={avatarVector}
//               className="profile__edit-vector"
//               alt="editar avatar"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">{currentUser?.name || "Seu nome"}</h1>

//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditProfileClick}
//           >
//             <img
//               src={editButton}
//               alt="editar"
//               className="profile__edit-button-vector"
//             />
//           </button>

//           <h2 className="profile__profession">
//             {currentUser?.about || "Sua profissão"}
//           </h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={onAddPlaceClick}
//         >
//           <img
//             src={addButton}
//             alt="adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {Array.isArray(cards) &&
//             cards.map(
//               (card) =>
//                 card && (
//                   <Card
//                     key={card._id}
//                     card={card}
//                     onImageClick={openImagePopup}
//                     onCardLike={onCardLike}
//                     onCardDelete={onCardDelete}
//                     currentUser={currentUser}
//                   />
//                 )
//             )}
//         </ul>
//       </section>

//       {popup && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={!!popup}>
//           {popup.title === "" ? (
//             <ImagePopup card={selectedCard} />
//           ) : typeof popup.children === "function" ? (
//             popup.children({
//               // ⬇️ PASSA AS FLAGS DE LOADING PARA OS POPUPS DINÂMICOS
//               isLoadingProfile,
//               isLoadingAvatar,
//               isLoadingAddPlace,
//             })
//           ) : (
//             popup.children
//           )}
//         </Popup>
//       )}
//     </main>
//   );
// }

// // src/components/Main/Main.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext.js";
// import Popup from "./components/Popup/Popup.jsx";
// import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
// import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import Card from "./components/Card/Card.jsx";

// import avatarPlaceholder from "../../images/Avatar.png";
// import avatarVector from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";

// export function Main({
//   cards,
//   onCardLike,
//   onCardDelete,
//   onClosePopup,
//   popup,
//   selectedCard,
//   openImagePopup,
//   onAddPlace,
//   onEditProfileClick,
//   onEditAvatarClick,
//   onAddPlaceClick,

//   // ⬇️ ADICIONE ISTO (3 loading-indicators)
//   isLoadingProfile,
//   isLoadingAvatar,
//   isLoadingAddPlace,
// }) {
//   const currentUser = useContext(CurrentUserContext);

//   return (
//     <main className="content">
//       <section className="profile">
//         <div className="profile__image">
//           <img
//             src={currentUser?.avatar || avatarPlaceholder}
//             className="profile__elipse"
//             alt="Avatar"
//           />
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditAvatarClick}
//           >
//             <img
//               src={avatarVector}
//               className="profile__edit-vector"
//               alt="editar avatar"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">{currentUser?.name || "Seu nome"}</h1>

//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditProfileClick}
//           >
//             <img
//               src={editButton}
//               alt="editar"
//               className="profile__edit-button-vector"
//             />
//           </button>

//           <h2 className="profile__profession">
//             {currentUser?.about || "Sua profissão"}
//           </h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={onAddPlaceClick}
//         >
//           <img
//             src={addButton}
//             alt="adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {Array.isArray(cards) &&
//             cards.map(
//               (card) =>
//                 card && (
//                   <Card
//                     key={card._id}
//                     card={card}
//                     onImageClick={openImagePopup}
//                     onCardLike={onCardLike}
//                     onCardDelete={onCardDelete}
//                     currentUser={currentUser}
//                   />
//                 )
//             )}
//         </ul>
//       </section>

//       {popup && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={!!popup}>
//           {popup.title === "" ? (
//             <ImagePopup card={selectedCard} />
//           ) : typeof popup.children === "function" ? (
//             popup.children({
//               // ⬇️ PASSANDO OS LOADINGS AQUI
//               isLoadingProfile,
//               isLoadingAvatar,
//               isLoadingAddPlace,
//             })
//           ) : (
//             popup.children
//           )}
//         </Popup>
//       )}
//     </main>
//   );
// }

// // src/components/Main/Main.jsx
// // 1. VERSÃO FUNCIONANDOOOOOOO Parcilamente:
// // Delete card => loading-disable do submit-button do popupWithConfirmantion => OK
// // Like button do card => ao ser clicado, atualiza apenas o servidor
// // Botões de abertura de todos Popup => ok
// // Validações de inputs => Ok
// // Atualizações de DOM e Servidor =>
// // 2. Ainda não funcionando:
// // Like button do card => não add classe .element__like-button_is-active
// // Like button do card => não atualiza o DOM
// // Loading-disable dos submit-Buttons dos demais Popup => não mostrando "loading..."
// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext.js";
// import Popup from "./components/Popup/Popup.jsx";
// import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
// import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import Card from "./components/Card/Card.jsx";

// import avatarPlaceholder from "../../images/Avatar.png";
// import avatarVector from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";

// export function Main({
//   cards,
//   onCardLike,
//   onCardDelete,
//   onClosePopup,
//   popup,
//   selectedCard,
//   openImagePopup,
//   onAddPlace,
//   onEditProfileClick,
//   onEditAvatarClick,
//   onAddPlaceClick,
// }) {
//   const currentUser = useContext(CurrentUserContext);

//   return (
//     <main className="content">
//       <section className="profile">
//         <div className="profile__image">
//           <img
//             src={currentUser?.avatar || avatarPlaceholder}
//             className="profile__elipse"
//             alt="Avatar"
//           />
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditAvatarClick}
//           >
//             <img
//               src={avatarVector}
//               className="profile__edit-vector"
//               alt="editar avatar"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">{currentUser?.name || "Seu nome"}</h1>

//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditProfileClick}
//           >
//             <img
//               src={editButton}
//               alt="editar"
//               className="profile__edit-button-vector"
//             />
//           </button>

//           <h2 className="profile__profession">
//             {currentUser?.about || "Sua profissão"}
//           </h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={onAddPlaceClick}
//         >
//           <img
//             src={addButton}
//             alt="adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {Array.isArray(cards) &&
//             cards.map(
//               (card) =>
//                 card && (
//                   <Card
//                     key={card._id}
//                     card={card}
//                     onImageClick={openImagePopup}
//                     onCardLike={onCardLike}
//                     onCardDelete={onCardDelete}
//                   />
//                 )
//             )}
//         </ul>
//       </section>

//       {popup && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={!!popup}>
//           {popup.title === "" ? (
//             <ImagePopup card={selectedCard} />
//           ) : typeof popup.children === "function" ? (
//             popup.children()
//           ) : (
//             popup.children
//           )}
//         </Popup>
//       )}
//     </main>
//   );
// }

// // NÃO ABRE OS POPUPS APENAS MAIS FINCIONA O LOADING DELETE CARD src/components/Main/Main.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext.js";
// import Popup from "./components/Popup/Popup.jsx";
// import Card from "./components/Card/Card.jsx";

// import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import avatarPlaceholder from "../../images/Avatar.png";
// import avatarVector from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";

// export function Main({
//   cards,
//   onCardLike,
//   onCardDelete,
//   onClosePopup,
//   popup,
//   selectedCard,
//   openImagePopup,
//   onEditProfileClick,
//   onEditAvatarClick,
//   onAddPlaceClick,
//   onUpdateUser,
//   onUpdateAvatar,
//   onAddPlace,
//   onConfirmDelete,
//   isLoading,
// }) {
//   const currentUser = useContext(CurrentUserContext);

//   return (
//     <main className="content">
//       <section className="profile">
//         <div className="profile__image">
//           <img
//             src={currentUser?.avatar || avatarPlaceholder}
//             className="profile__elipse"
//             alt="Avatar"
//           />
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditAvatarClick}
//           >
//             <img
//               src={avatarVector}
//               className="profile__edit-vector"
//               alt="editar avatar"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">{currentUser?.name || "Seu nome"}</h1>

//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditProfileClick}
//           >
//             <img
//               src={editButton}
//               alt="editar"
//               className="profile__edit-button-vector"
//             />
//           </button>

//           <h2 className="profile__profession">
//             {currentUser?.about || "Sua profissão"}
//           </h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={onAddPlaceClick}
//         >
//           <img
//             src={addButton}
//             alt="adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {Array.isArray(cards) &&
//             cards.map(
//               (card) =>
//                 card && (
//                   <Card
//                     key={card._id}
//                     card={card}
//                     onImageClick={openImagePopup}
//                     onCardLike={onCardLike}
//                     onCardDelete={onCardDelete}
//                   />
//                 )
//             )}
//         </ul>
//       </section>

//       {/* --- POPUPS --- */}
//       <EditProfile
//         isOpen={popup?.title === "Editar perfil"}
//         isLoading={isLoading}
//         currentUser={currentUser}
//         onUpdateUser={onUpdateUser}
//         onClose={onClosePopup}
//       />

//       <EditAvatar
//         isOpen={popup?.title === "Alterar avatar"}
//         isLoading={isLoading}
//         onUpdateAvatar={onUpdateAvatar}
//         onClose={onClosePopup}
//       />

//       <NewCard
//         isOpen={popup?.title === "Novo local"}
//         isLoading={isLoading}
//         onAddPlace={onAddPlace}
//         onClose={onClosePopup}
//       />

//       <ImagePopup
//         card={selectedCard}
//         isOpen={popup?.title === ""}
//         onClose={onClosePopup}
//       />

//       <PopupWithConfirmation
//         isOpen={popup?.title === "Confirmação"}
//         onConfirm={onConfirmDelete}
//         isLoading={isLoading}
//         onClose={onClosePopup}
//       />
//     </main>
//   );
// }

// // VERSÃO FUNCIONANDOOOOOOO src/components/Main/Main.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext.js";
// import Popup from "./components/Popup/Popup.jsx";
// import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
// import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import Card from "./components/Card/Card.jsx";

// import avatarPlaceholder from "../../images/Avatar.png";
// import avatarVector from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";

// export function Main({
//   cards,
//   onCardLike,
//   onCardDelete,
//   onOpenPopup,
//   onClosePopup,
//   popup,
//   selectedCard,
//   openImagePopup,
//   onAddPlace,
//   onEditProfileClick,
//   onEditAvatarClick,
//   onAddPlaceClick,
// }) {
//   const currentUser = useContext(CurrentUserContext);

//   return (
//     <main className="content">
//       <section className="profile">
//         <div className="profile__image">
//           <img
//             src={currentUser?.avatar || avatarPlaceholder}
//             className="profile__elipse"
//             alt="Avatar"
//           />
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditAvatarClick}
//           >
//             <img
//               src={avatarVector}
//               className="profile__edit-vector"
//               alt="editar avatar"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">{currentUser?.name || "Seu nome"}</h1>

//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditProfileClick}
//           >
//             <img
//               src={editButton}
//               alt="editar"
//               className="profile__edit-button-vector"
//             />
//           </button>

//           <h2 className="profile__profession">
//             {currentUser?.about || "Sua profissão"}
//           </h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={onAddPlaceClick}
//         >
//           <img
//             src={addButton}
//             alt="adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {/* {cards.map((card) => (
//             <Card
//               key={card._id}
//               card={card}
//               onImageClick={openImagePopup}
//               onCardLike={onCardLike}
//               onCardDelete={onCardDelete}
//             />
//           ))} */}

//           {Array.isArray(cards) &&
//             cards.map(
//               (card) =>
//                 card && (
//                   <Card
//                     key={card._id}
//                     card={card}
//                     onImageClick={openImagePopup}
//                     onCardLike={onCardLike}
//                     onCardDelete={onCardDelete}
//                   />
//                 )
//             )}
//         </ul>
//       </section>

//       {popup && (
//         // usamos o mesmo wrapper Popup que você já tem
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={!!popup}>
//           {/* Preserve o caso da ImagePopup (quando title === "") */}
//           {popup.title === "" ? (
//             <ImagePopup card={selectedCard} />
//           ) : // se popup.children for função, chamamos ela agora para renderizar o componente
//           typeof popup.children === "function" ? (
//             popup.children()
//           ) : (
//             popup.children
//           )}
//         </Popup>
//       )}
//     </main>
//   );
// }

// // src/components/Main/Main.jsx
// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext.js";
// import Popup from "./components/Popup/Popup.jsx";
// import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
// import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import Card from "./components/Card/Card.jsx";

// import avatarPlaceholder from "../../images/Avatar.png";
// import avatarVector from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";

// export function Main({
//   cards,
//   onCardLike,
//   onCardDelete,
//   onOpenPopup,
//   onClosePopup,
//   popup,
//   selectedCard,
//   openImagePopup,
//   onAddPlace,
//   onEditProfileClick,
//   onEditAvatarClick,
//   onAddPlaceClick,
// }) {
//   const { currentUser } = useContext(CurrentUserContext);

//   return (
//     <main className="content">
//       <section className="profile">
//         <div className="profile__image">
//           <img
//             src={currentUser.avatar || avatarPlaceholder}
//             className="profile__elipse"
//             alt="Avatar"
//           />
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditAvatarClick}
//           >
//             <img
//               src={avatarVector}
//               className="profile__edit-vector"
//               alt="editar avatar"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">{currentUser.name || "Seu nome"}</h1>

//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={onEditProfileClick}
//           >
//             <img
//               src={editButton}
//               alt="editar"
//               className="profile__edit-button-vector"
//             />
//           </button>

//           <h2 className="profile__profession">
//             {currentUser.about || "Sua profissão"}
//           </h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={onAddPlaceClick}
//         >
//           <img
//             src={addButton}
//             alt="adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {cards.map((card) => (
//             <Card
//               key={card._id}
//               card={card}
//               onImageClick={openImagePopup}
//               onCardLike={onCardLike}
//               onCardDelete={onCardDelete}
//             />
//           ))}
//         </ul>
//       </section>

//       {popup && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={!!popup}>
//           {/* Quando for ImagePopup, o selectedCard é passado */}
//           {popup.title === "" ? (
//             <ImagePopup card={selectedCard} />
//           ) : (
//             popup.children
//           )}
//         </Popup>
//       )}
//     </main>
//   );
// }

// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext";
// import Popup from "./components/Popup/Popup.jsx";
// import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
// import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
// import Card from "./components/Card/Card.jsx";

// import avatarPlaceholder from "../../images/Avatar.png";
// import avatarVector from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";

// export function Main({
//   cards,
//   onCardLike,
//   onCardDelete,
//   onOpenPopup,
//   onClosePopup,
//   popup,
//   selectedCard,
//   openImagePopup,
//   onAddPlace,
// }) {
//   const { currentUser } = useContext(CurrentUserContext);

//   const editProfilePopup = {
//     title: "Editar perfil",
//     children: <EditProfile />,
//   };

//   const editAvatarPopup = {
//     title: "Alterar avatar",
//     children: <EditAvatar />,
//   };

//   const newCardPopup = {
//     title: "Novo Local",
//     children: <NewCard onAddPlace={onAddPlace} />,
//   };

//   return (
//     <main className="content">
//       <section className="profile">
//         <div className="profile__image">
//           <img
//             src={currentUser.avatar || avatarPlaceholder}
//             className="profile__elipse"
//             alt="Avatar"
//           />
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={() => onOpenPopup(editAvatarPopup)}
//           >
//             <img
//               src={avatarVector}
//               className="profile__edit-vector"
//               alt="editar avatar"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">{currentUser.name || "Seu nome"}</h1>

//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={() => onOpenPopup(editProfilePopup)}
//           >
//             <img
//               src={editButton}
//               alt="editar"
//               className="profile__edit-button-vector"
//             />
//           </button>

//           <h2 className="profile__profession">
//             {currentUser.about || "Sua profissão"}
//           </h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={() => onOpenPopup(newCardPopup)}
//         >
//           <img
//             src={addButton}
//             alt="adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {cards.map((card) => (
//             <Card
//               key={card._id}
//               card={card}
//               onImageClick={openImagePopup}
//               onCardLike={onCardLike}
//               onCardDelete={onCardDelete}
//             />
//           ))}
//         </ul>
//       </section>

//       {popup && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={!!popup}>
//           {popup.title === "" ? (
//             <ImagePopup card={selectedCard} />
//           ) : (
//             popup.children
//           )}
//         </Popup>
//       )}
//     </main>
//   );
// }

// ================================================= // =========================================

// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext";
// import Popup from "./components/Popup/Popup.jsx";
// import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
// import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
// import Card from "./components/Card/Card.jsx";

// import avatarPlaceholder from "../../images/Avatar.png";
// import avatarVector from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";

// export function Main({
//   cards,
//   onCardLike,
//   onCardDelete,
//   onOpenPopup,
//   onClosePopup,
//   popup,
//   selectedCard,
//   openImagePopup,
//   onAddPlace,
// }) {
//   const { currentUser } = useContext(CurrentUserContext);

//   const editProfilePopup = {
//     title: "Editar perfil",
//     children: <EditProfile />,
//   };

//   const editAvatarPopup = {
//     title: "Alterar avatar",
//     children: <EditAvatar />,
//   };

//   const newCardPopup = {
//     title: "Novo Local",
//     children: <NewCard onAddPlace={onAddPlace} />,
//   };

//   // const newCardPopup = {
//   //   title: "Novo Local",
//   //   children: <NewCard />,
//   // };

//   return (
//     <main className="content">
//       <section className="profile">
//         <div className="profile__image">
//           <img
//             src={currentUser.avatar || avatarPlaceholder}
//             className="profile__elipse"
//             alt="Avatar"
//           />
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={() => onOpenPopup(editAvatarPopup)}
//           >
//             <img
//               src={avatarVector}
//               className="profile__edit-vector"
//               alt="editar avatar"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">{currentUser.name || "Seu nome"}</h1>
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={() => onOpenPopup(editProfilePopup)}
//           >
//             <img
//               src={editButton}
//               alt="editar"
//               className="profile__edit-button-vector"
//             />
//           </button>
//           <h2 className="profile__profession">
//             {currentUser.about || "Sua profissão"}
//           </h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={() => onOpenPopup(newCardPopup)}
//         >
//           <img
//             src={addButton}
//             alt="adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {cards.map((card) => (
//             <Card
//               key={card._id}
//               card={card}
//               onImageClick={(c) => {
//                 openImagePopup(c);
//               }}
//               onCardLike={onCardLike}
//               onCardDelete={onCardDelete}
//             />
//           ))}
//         </ul>
//       </section>

//       {popup && (
//         <Popup onClose={onClosePopup} title={popup.title} isOpen={!!popup}>
//           {/* Quando for ImagePopup, o selectedCard é passado */}
//           {popup.title === "" ? (
//             <ImagePopup card={selectedCard} />
//           ) : (
//             popup.children
//           )}
//         </Popup>
//       )}
//     </main>
//   );
// }

// import { useState } from "react";
// import { useEffect } from "react";

// import avatar from "../../images/Avatar.png";
// import avatarVetor from "../../images/Avatar_vector.png";
// import editButton from "../../images/Edit-Button-Vector.png";
// import addButton from "../../images/Vector-add-button.png";
// import Popup from "./components/Popup/Popup.jsx";
// import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
// import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
// import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
// import Card from "./components/Card/Card.jsx";

// // new
// import api from "../../utils/api.js";
// //

// export function Main() {
//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   // new
//   const [cards, setCards] = useState([]);
//   const [cardData, setCardData] = useEffect();
//   //

//   function handleOpenPopup(popupObject) {
//     setPopup(popupObject);
//   }

//   function handleClosePopup() {
//     setPopup(null);
//     setSelectedCard(null);
//   }

//   const editProfilePopup = {
//     title: "Editar perfil",
//     children: <EditProfile />,
//   };

//   const editAvatarPopup = {
//     title: "Alterar avatar",
//     children: <EditAvatar />,
//   };

//   const newCardPopup = {
//     title: "Novo Local",
//     children: <NewCard />,
//   };

//   function handleCardClick(card) {
//     setSelectedCard(card);
//     handleOpenPopup({
//       title: "", // sem título para aplicar popup de imagem
//       // children: <ImagePopup card={card} />,
//       children: <ImagePopup card={card} />,
//     });
//   }

//   return (
//     <main className="content">
//       <section className="profile">
//         <div className="profile__image">
//           <img src={avatar} className="profile__elipse" alt="Avatar" />

//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={() => handleOpenPopup(editAvatarPopup)}
//           >
//             <img
//               src={avatarVetor}
//               className="profile__edit-vector"
//               alt="ícone em formato de lápis"
//             />
//           </button>
//         </div>

//         <div className="profile__info">
//           <h1 className="profile__name">Jack Costeau</h1>
//           <button
//             type="button"
//             className="profile__edit-button"
//             onClick={() => handleOpenPopup(editProfilePopup)}
//           >
//             <img
//               src={editButton}
//               alt="barra inclinada, funcionando como um botão vetorizado"
//               className="profile__edit-button-vector"
//             />
//           </button>
//           <h2 className="profile__profession">Explorador</h2>
//         </div>

//         <button
//           type="button"
//           className="profile__add-button"
//           onClick={() => handleOpenPopup(newCardPopup)}
//         >
//           <img
//             src={addButton}
//             alt="sinal de adição, representando o botão adicionar"
//             className="profile__add-button-vector"
//           />
//         </button>
//       </section>

//       <section className="elements page__section">
//         <ul className="elements__cards">
//           {cards.map((card) => (
//             <Card key={card._id} card={card} onImageClick={handleCardClick} />
//           ))}
//         </ul>
//       </section>

//       {popup && (
//         <Popup onClose={handleClosePopup} title={popup.title} isOpen={!!popup}>
//           {popup.children}
//         </Popup>
//       )}
//     </main>
//   );
// }
