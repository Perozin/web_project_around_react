// // Esse tava top, atendendendo de 1 a 4 premissas. Mas atendia somente 70% da 5ª.

// src/components/App.jsx
import React, { useEffect, useState } from "react";

import { Header } from "./Header/Header.jsx";
import { Footer } from "./Footer/Footer.jsx";
import { Main } from "./Main/Main.jsx";

import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";

import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingCard, setIsLoadingCard] = useState(false);

  // --- Load user ---
  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch(console.error);
  }, []);

  // --- Load cards ---
  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => setCards(data))
      .catch(console.error);
  }, []);

  // --- Close Popups ---
  function closeAllPopups() {
    setPopup(null);
    setSelectedCard(null);
  }

  // --- OPEN POPUPS ---
  function onEditProfileClick() {
    setPopup({
      title: "Editar perfil",
      children: (
        <EditProfile
          onSubmit={handleUpdateUser}
          onClose={closeAllPopups}
          isLoading={isLoadingProfile}
        />
      ),
    });
  }

  function onEditAvatarClick() {
    setPopup({
      title: "Alterar avatar",
      children: (
        <EditAvatar
          onSubmit={handleUpdateAvatar}
          onClose={closeAllPopups}
          isLoading={isLoadingAvatar}
        />
      ),
    });
  }

  function onAddPlaceClick() {
    setPopup({
      title: "Novo local",
      children: (
        <NewCard
          onSubmit={handleAddPlaceSubmit}
          onClose={closeAllPopups}
          isLoading={isLoadingCard}
        />
      ),
    });
  }

  function openImagePopup(card) {
    setSelectedCard(card);
    setPopup({ title: "", children: null });
  }

  // --- API: Update Profile ---
  function handleUpdateUser(data) {
    setIsLoadingProfile(true);
    api
      .setUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoadingProfile(false));
  }

  // --- API: Update Avatar ---
  function handleUpdateAvatar(data) {
    setIsLoadingAvatar(true);
    api
      .setUserAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoadingAvatar(false));
  }

  // --- API: Add New Card ---
  function handleAddPlaceSubmit(data) {
    setIsLoadingCard(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards((prev) => [newCard, ...prev]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoadingCard(false));
  }

  // --- Like Card (corrigido e universal) ---
  async function handleCardLike(card) {
    try {
      // --- Normalização Universal do Like ---
      const isLiked = Array.isArray(card.likes)
        ? card.likes.some(
            (like) =>
              (typeof like === "string" ? like : like?._id) === currentUser._id
          )
        : card.isLiked === true;

      // --- Chama API ---
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);

      // --- Atualiza estado local ---
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error(error);
    }
  }

  // --- Delete Card ---
  function handleDeleteRequest(card) {
    setCardToDelete(card);
    setIsConfirmPopupOpen(true);
  }

  function handleConfirmDelete() {
    if (!cardToDelete) return;

    setIsLoadingDelete(true);

    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((prev) => prev.filter((c) => c._id !== cardToDelete._id));
        closeConfirmPopup();
      })
      .catch(console.error)
      .finally(() => setIsLoadingDelete(false));
  }

  function closeConfirmPopup() {
    setIsConfirmPopupOpen(false);
    setCardToDelete(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          cards={cards}
          onEditProfileClick={onEditProfileClick}
          onEditAvatarClick={onEditAvatarClick}
          onAddPlaceClick={onAddPlaceClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteRequest}
          popup={popup}
          onClosePopup={closeAllPopups}
          openImagePopup={openImagePopup}
          selectedCard={selectedCard}
          isConfirmPopupOpen={isConfirmPopupOpen}
          closeConfirmPopup={closeConfirmPopup}
          handleConfirmDelete={handleConfirmDelete}
          isLoadingDelete={isLoadingDelete}
          handleAddPlace={handleAddPlaceSubmit}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

// // Totalmente funcional, exceto os submits de EditProfile e EditAvatar
// // src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
//   const [cardToDelete, setCardToDelete] = useState(null);
//   const [isLoadingDelete, setIsLoadingDelete] = useState(false);

//   const [isLoadingProfile, setIsLoadingProfile] = useState(false);
//   const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
//   const [isLoadingCard, setIsLoadingCard] = useState(false);

//   // --- Load user ---
//   useEffect(() => {
//     api
//       .getUserInfo()
//       .then((user) => setCurrentUser(user))
//       .catch(console.error);
//   }, []);

//   // --- Load cards ---
//   useEffect(() => {
//     api
//       .getInitialCards()
//       .then((data) => setCards(data))
//       .catch(console.error);
//   }, []);

//   // --- Close Popups ---
//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//   }

//   // --- OPEN POPUPS ---
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: (
//         <EditProfile
//           onSubmit={handleUpdateUser}
//           onClose={closeAllPopups}
//           isLoading={isLoadingProfile}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: (
//         <EditAvatar
//           onSubmit={handleUpdateAvatar}
//           onClose={closeAllPopups}
//           isLoading={isLoadingAvatar}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: (
//         <NewCard
//           onSubmit={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//           isLoading={isLoadingCard}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({ title: "", children: null });
//   }

//   // --- API: Update Profile ---
//   function handleUpdateUser(data) {
//     setIsLoadingProfile(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoadingProfile(false));
//   }

//   // --- API: Update Avatar ---
//   function handleUpdateAvatar(data) {
//     setIsLoadingAvatar(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoadingAvatar(false));
//   }

//   // --- API: Add New Card ---
//   function handleAddPlaceSubmit(data) {
//     setIsLoadingCard(true);
//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoadingCard(false));
//   }

//   // --- Like Card (corrigido e universal) ---
//   async function handleCardLike(card) {
//     try {
//       // --- Normalização Universal do Like ---
//       const isLiked = Array.isArray(card.likes)
//         ? card.likes.some(
//             (like) =>
//               (typeof like === "string" ? like : like?._id) === currentUser._id
//           )
//         : card.isLiked === true;

//       // --- Chama API ---
//       const newCard = await api.changeLikeCardStatus(card._id, !isLiked);

//       // --- Atualiza estado local ---
//       setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));

//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // --- Delete Card ---
//   function handleDeleteRequest(card) {
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
//       .finally(() => setIsLoadingDelete(false));
//   }

//   function closeConfirmPopup() {
//     setIsConfirmPopupOpen(false);
//     setCardToDelete(null);
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//           onCardLike={handleCardLike}
//           onCardDelete={handleDeleteRequest}
//           popup={popup}
//           onClosePopup={closeAllPopups}
//           openImagePopup={openImagePopup}
//           selectedCard={selectedCard}
//           isConfirmPopupOpen={isConfirmPopupOpen}
//           closeConfirmPopup={closeConfirmPopup}
//           handleConfirmDelete={handleConfirmDelete}
//           isLoadingDelete={isLoadingDelete}
//           handleAddPlace={handleAddPlaceSubmit}
//         />

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// / Funciona bem (so o like estava un tanto errado. Muda a cor apenas)

// // src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
//   const [cardToDelete, setCardToDelete] = useState(null);
//   const [isLoadingDelete, setIsLoadingDelete] = useState(false);

//   const [isLoadingProfile, setIsLoadingProfile] = useState(false);
//   const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
//   const [isLoadingCard, setIsLoadingCard] = useState(false);

//   // --- Load user ---
//   useEffect(() => {
//     api
//       .getUserInfo()
//       .then((user) => setCurrentUser(user))
//       .catch(console.error);
//   }, []);

//   // --- Load cards ---
//   useEffect(() => {
//     api
//       .getInitialCards()
//       .then((data) => setCards(data))
//       .catch(console.error);
//   }, []);

//   // --- Close Popups ---
//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//   }

//   // --- OPEN POPUPS ---
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: (
//         <EditProfile
//           onSubmit={handleUpdateUser}
//           onClose={closeAllPopups}
//           isLoading={isLoadingProfile}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: (
//         <EditAvatar
//           onSubmit={handleUpdateAvatar}
//           onClose={closeAllPopups}
//           isLoading={isLoadingAvatar}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: (
//         <NewCard
//           onSubmit={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//           isLoading={isLoadingCard}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({ title: "", children: null });
//   }

//   // --- API: Update Profile ---
//   function handleUpdateUser(data) {
//     setIsLoadingProfile(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoadingProfile(false));
//   }

//   // --- API: Update Avatar ---
//   function handleUpdateAvatar(data) {
//     setIsLoadingAvatar(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoadingAvatar(false));
//   }

//   // --- API: Add New Card ---
//   function handleAddPlaceSubmit(data) {
//     setIsLoadingCard(true);
//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoadingCard(false));
//   }

//   // --- Like Card ---
//   // async function handleCardLike(card) {
//   //   try {
//   //     // 🔥 Normalização segura dos likes
//   //     const likesArray = Array.isArray(card.likes) ? card.likes : [];

//   //     const isLiked = likesArray.some(
//   //       (like) =>
//   //         (typeof like === "string" ? like : like?._id) === currentUser._id
//   //     );

//   //     const newCard = await api.changeLikeCardStatus(card._id, !isLiked);

//   //     setCards((state) =>
//   //       state.map((currentCard) =>
//   //         currentCard._id === card._id ? newCard : currentCard
//   //       )
//   //     );
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // }

//   async function handleCardLike(card) {
//     try {
//       const isLiked = card.likes.some(
//         (like) =>
//           (typeof like === "string" ? like : like?._id) === currentUser._id
//       );

//       const newCard = await api.changeLikeCardStatus(card._id, !isLiked);

//       setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));

//       // 🔵 renova o card após a mudança (garante dados mais atualizados)
//       renewCard(card._id);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // --- Atualiza um card específico depois de uma alteração ---
//   async function renewCard(cardId) {
//     try {
//       const updatedCard = await api.getCardById(cardId);

//       setCards((state) =>
//         state.map((card) => (card._id === cardId ? updatedCard : card))
//       );
//     } catch (err) {
//       console.error("Erro ao renovar o card:", err);
//     }
//   }

//   // --- Delete Card ---
//   function handleDeleteRequest(card) {
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
//       .finally(() => setIsLoadingDelete(false));
//   }

//   function closeConfirmPopup() {
//     setIsConfirmPopupOpen(false);
//     setCardToDelete(null);
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//           onCardLike={handleCardLike}
//           onCardDelete={handleDeleteRequest}
//           popup={popup}
//           onClosePopup={closeAllPopups}
//           openImagePopup={openImagePopup}
//           selectedCard={selectedCard}
//           isConfirmPopupOpen={isConfirmPopupOpen}
//           closeConfirmPopup={closeConfirmPopup}
//           handleConfirmDelete={handleConfirmDelete}
//           isLoadingDelete={isLoadingDelete}
//           handleAddPlace={handleAddPlaceSubmit}
//         />

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// =================================================

// // Novo formato conforme 2º premissa
// // src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   // --- LOADINGS ---
//   const [isLoadingProfile, setIsLoadingProfile] = useState(false);
//   const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);

//   // ----- LOAD USER DATA -----
//   useEffect(() => {
//     api
//       .getUserInfo()
//       .then((data) => setCurrentUser(data))
//       .catch(console.error);
//   }, []);

//   // ----- CLOSE ALL POPUPS -----
//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//   }

//   // ----- OPEN POPUPS -----
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: (data) => handleUpdateUser(data),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: (data) => handleUpdateAvatar(data),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: null,
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({ title: "" });
//   }

//   // ----- API ACTIONS -----
//   function handleUpdateUser(data) {
//     setIsLoadingProfile(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoadingProfile(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoadingAvatar(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoadingAvatar(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// =====================================================================================

// // ULTIMAS ATUALIZAÇÕES — LOADINGS SEPARADOS (tudo funcionando, só não os loadings)
// // src/components/App.jsx

// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const [cardToDelete, setCardToDelete] = useState(null);
//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

//   // --- LOADINGS SEPARADOS ---
//   const [isLoadingProfile, setIsLoadingProfile] = useState(false);
//   const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
//   const [isLoadingAddPlace, setIsLoadingAddPlace] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // ----- LOAD INITIAL DATA -----
//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // ----- CLOSE ALL POPUPS -----
//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//     setIsConfirmPopupOpen(false);
//   }

//   // ----- OPEN POPUPS -----
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: () => (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoadingProfile}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: () => (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoadingAvatar}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: () => (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoadingAddPlace}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: () => <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setIsConfirmPopupOpen(true);
//   }

//   // ----- API ACTIONS -----

//   function handleUpdateUser(data) {
//     setIsLoadingProfile(true);

//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoadingProfile(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoadingAvatar(true);

//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoadingAvatar(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoadingAddPlace(true);

//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);

//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoadingAddPlace(false));
//   }

//   // ----- LIKE -----
//   function onCardLike(card) {
//     const isCurrentlyLiked = card.likes?.some((like) => {
//       const likeId = typeof like === "string" ? like : like?._id;
//       return likeId === currentUser._id;
//     });

//     api
//       .changeLikeCardStatus(card._id, !isCurrentlyLiked)
//       .then((serverResp) => {
//         const updatedCard = {
//           ...card,
//           isLiked: serverResp.isLiked,
//           likes: serverResp.isLiked ? [currentUser._id] : [],
//         };

//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? updatedCard : c))
//         );
//       })
//       .catch(console.error);
//   }

//   // ----- DELETE -----
//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsDeleting(true);

//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );
//         closeAllPopups();
//       })
//       .catch(console.error)
//       .finally(() => setIsDeleting(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={() => {}}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlace={handleAddPlaceSubmit}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         {/* CONFIRM DELETE POPUP */}
//         {isConfirmPopupOpen && (
//           <PopupWithConfirmation
//             isOpen={isConfirmPopupOpen}
//             onClose={closeAllPopups}
//             onConfirm={handleConfirmDelete}
//             isLoading={isDeleting}
//           />
//         )}

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// ============================================================================================

// // ULTIMAS ATUALIZAÇÕES — LOADINGS SEPARADOS (tudo funcionando)
// // src/components/App.jsx

// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const [cardToDelete, setCardToDelete] = useState(null);
//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

//   // --- LOADINGS SEPARADOS ---
//   const [isLoadingProfile, setIsLoadingProfile] = useState(false);
//   const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
//   const [isLoadingAddPlace, setIsLoadingAddPlace] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // ----- LOAD INITIAL DATA -----
//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // ----- CLOSE ALL POPUPS -----
//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//     setIsConfirmPopupOpen(false);
//   }

//   // ----- OPEN POPUPS -----
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoadingProfile}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoadingAvatar}
//           onUpdateAvatar={handleUpdateAvatar}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoadingAddPlace}
//           onAddPlace={handleAddPlaceSubmit}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: <ImagePopup card={card} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setIsConfirmPopupOpen(true);
//   }

//   // ----- API ACTIONS -----

//   function handleUpdateUser(data) {
//     setIsLoadingProfile(true);

//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoadingProfile(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoadingAvatar(true);

//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoadingAvatar(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoadingAddPlace(true);

//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);
//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoadingAddPlace(false));
//   }

//   // ----- LIKE -----
//   function onCardLike(card) {
//     const isCurrentlyLiked = card.likes?.some((like) => {
//       const idLike = typeof like === "string" ? like : like?._id;
//       return idLike === currentUser._id;
//     });

//     api
//       .changeLikeCardStatus(card._id, !isCurrentlyLiked)
//       .then((serverResp) => {
//         const updatedCard = {
//           ...card,
//           isLiked: serverResp.isLiked,
//           likes: serverResp.isLiked ? [currentUser._id] : [],
//         };

//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? updatedCard : c))
//         );
//       })
//       .catch(console.error);
//   }

//   // ----- DELETE -----
//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsDeleting(true);

//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prev) => prev.filter((c) => c._id !== cardToDelete._id));
//         closeAllPopups();
//       })
//       .catch(console.error)
//       .finally(() => setIsDeleting(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlaceClick={onAddPlaceClick}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//         />

//         {/* CONFIRM DELETE POPUP */}
//         {isConfirmPopupOpen && (
//           <PopupWithConfirmation
//             isOpen={isConfirmPopupOpen}
//             onClose={closeAllPopups}
//             onConfirm={handleConfirmDelete}
//             isLoading={isDeleting}
//           />
//         )}

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// // ULTIMAS ATUALIZAÇÕES — LOADINGS SEPARADOS (tudo funcionando, só não os loadings)
// // src/components/App.jsx

// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const [cardToDelete, setCardToDelete] = useState(null);
//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

//   // --- LOADINGS SEPARADOS ---
//   const [isLoadingProfile, setIsLoadingProfile] = useState(false);
//   const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
//   const [isLoadingAddPlace, setIsLoadingAddPlace] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // ----- LOAD INITIAL DATA -----
//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // ----- CLOSE ALL POPUPS -----
//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//     setIsConfirmPopupOpen(false);
//   }

//   // ----- OPEN POPUPS -----
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoadingProfile}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoadingAvatar}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoadingAddPlace}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setIsConfirmPopupOpen(true);
//   }

//   // ----- API ACTIONS -----

//   function handleUpdateUser(data) {
//     setIsLoadingProfile(true);

//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoadingProfile(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoadingAvatar(true);

//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoadingAvatar(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoadingAddPlace(true);

//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);

//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoadingAddPlace(false));
//   }

//   // ----- LIKE -----
//   function onCardLike(card) {
//     const isCurrentlyLiked = card.likes?.some((like) => {
//       const likeId = typeof like === "string" ? like : like?._id;
//       return likeId === currentUser._id;
//     });

//     api
//       .changeLikeCardStatus(card._id, !isCurrentlyLiked)
//       .then((serverResp) => {
//         const updatedCard = {
//           ...card,
//           isLiked: serverResp.isLiked,
//           likes: serverResp.isLiked ? [currentUser._id] : [],
//         };

//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? updatedCard : c))
//         );
//       })
//       .catch(console.error);
//   }

//   // ----- DELETE -----
//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsDeleting(true);

//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );
//         closeAllPopups();
//       })
//       .catch(console.error)
//       .finally(() => setIsDeleting(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={() => {}}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlace={handleAddPlaceSubmit}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         {/* CONFIRM DELETE POPUP */}
//         {isConfirmPopupOpen && (
//           <PopupWithConfirmation
//             isOpen={isConfirmPopupOpen}
//             onClose={closeAllPopups}
//             onConfirm={handleConfirmDelete}
//             isLoading={isDeleting}
//           />
//         )}

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// // ULTIMAS ATUALIZAÇÕES (AGORA COM LOADING FUNCIONANDO)
// // src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const [cardToDelete, setCardToDelete] = useState(null);
//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

//   // Loadings
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // ----- LOAD INITIAL DATA -----
//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // ----- CLOSE ALL POPUPS -----
//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//     setIsConfirmPopupOpen(false);
//   }

//   // ----- OPEN POPUPS -----
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: () => (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoading}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: () => (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoading}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: () => (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoading}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: () => <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setIsConfirmPopupOpen(true);
//   }

//   // ----- API ACTIONS -----

//   function handleUpdateUser(data) {
//     setIsLoading(true);

//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         // Permite loading aparecer antes de fechar
//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);

//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         // Permite loading aparecer antes de fechar
//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);

//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);

//         // Permite loading aparecer antes de fechar
//         setTimeout(() => {
//           closeAllPopups();
//         }, 100);
//       })
//       .finally(() => setIsLoading(false));
//   }

//   // ----- LIKE -----
//   function onCardLike(card) {
//     const isCurrentlyLiked = card.likes?.some((like) => {
//       const likeId = typeof like === "string" ? like : like?._id;
//       return likeId === currentUser._id;
//     });

//     api
//       .changeLikeCardStatus(card._id, !isCurrentlyLiked)
//       .then((serverResp) => {
//         const updatedCard = {
//           ...card,
//           isLiked: serverResp.isLiked,
//           likes: serverResp.isLiked ? [currentUser._id] : [],
//         };

//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? updatedCard : c))
//         );
//       })
//       .catch(console.error);
//   }

//   // ----- DELETE -----
//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsDeleting(true);

//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );
//         closeAllPopups();
//       })
//       .catch(console.error)
//       .finally(() => setIsDeleting(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={() => {}}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlace={handleAddPlaceSubmit}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         {/* CONFIRM POPUP */}
//         {isConfirmPopupOpen && (
//           <PopupWithConfirmation
//             isOpen={isConfirmPopupOpen}
//             onClose={closeAllPopups}
//             onConfirm={handleConfirmDelete}
//             isLoading={isDeleting}
//           />
//         )}

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// // ULTIMAS ATUALIZAÇÕES FICOU PERFEITO (SÓ FALTA OS LOADING)
// // src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const [cardToDelete, setCardToDelete] = useState(null);
//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

//   // Loadings separados
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // ----- LOAD INITIAL DATA -----
//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // ----- CLOSE ALL POPUPS -----
//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//     setIsConfirmPopupOpen(false);
//   }

//   // ----- OPEN POPUPS -----
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: () => (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoading}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: () => (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoading}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: () => (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoading}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: () => <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setIsConfirmPopupOpen(true);
//   }

//   // ----- API ACTIONS -----
//   function handleUpdateUser(data) {
//     setIsLoading(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);
//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   // ----- LIKE -----
//   function onCardLike(card) {
//     const isCurrentlyLiked = card.likes?.some((like) => {
//       const likeId = typeof like === "string" ? like : like?._id;
//       return likeId === currentUser._id;
//     });

//     api
//       .changeLikeCardStatus(card._id, !isCurrentlyLiked)
//       .then((serverResp) => {
//         // Normalizamos SEM deixar serverResp sobrescrever
//         const updatedCard = {
//           ...card, // mantém campos existentes
//           isLiked: serverResp.isLiked,
//           likes: serverResp.isLiked
//             ? [currentUser._id] // curtido
//             : [], // descurtido
//         };

//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? updatedCard : c))
//         );
//       })
//       .catch(console.error);
//   }

//   // ----- DELETE -----
//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsDeleting(true);

//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );
//         closeAllPopups();
//       })
//       .catch(console.error)
//       .finally(() => setIsDeleting(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={() => {}}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlace={handleAddPlaceSubmit}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         {/* CONFIRM POPUP */}
//         {isConfirmPopupOpen && (
//           <PopupWithConfirmation
//             isOpen={isConfirmPopupOpen}
//             onClose={closeAllPopups}
//             onConfirm={handleConfirmDelete}
//             isLoading={isDeleting}
//           />
//         )}

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// // src/components/App.jsx
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
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const [cardToDelete, setCardToDelete] = useState(null);
//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

//   // Loadings separados
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // ----- LOAD INITIAL DATA -----
//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // ----- CLOSE ALL POPUPS -----
//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//     setIsConfirmPopupOpen(false);
//   }

//   // ----- OPEN POPUPS -----
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: () => (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoading}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: () => (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoading}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: () => (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoading}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: () => <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setIsConfirmPopupOpen(true);
//   }

//   // ----- API ACTIONS -----
//   function handleUpdateUser(data) {
//     setIsLoading(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);
//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   // ----- LIKE -----

//   // function onCardLike(card) {
//   //   const isLiked = card.likes.some((id) => id === currentUser._id);

//   //   api
//   //     .changeLikeCardStatus(card._id, !isLiked)
//   //     .then((newCard) => {
//   //       setCards((state) =>
//   //         state.map((c) => (c._id === card._id ? newCard : c))
//   //       );
//   //     })
//   //     .catch((err) => console.log(err));
//   // }
//   function onCardLike(card) {
//     if (!card || !Array.isArray(card.likes)) {
//       console.warn("Card sem likes array:", card);
//       return;
//     }

//     const isLiked = card.likes.includes(currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((updatedCard) => {
//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? updatedCard : c))
//         );
//       })
//       .catch((err) => console.error(err));
//   }

//   // ----- DELETE -----
//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsDeleting(true);

//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );
//         closeAllPopups();
//       })
//       .catch(console.error)
//       .finally(() => setIsDeleting(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={() => {}}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlace={handleAddPlaceSubmit}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         {/* CONFIRM POPUP */}
//         {isConfirmPopupOpen && (
//           <PopupWithConfirmation
//             isOpen={isConfirmPopupOpen}
//             onClose={closeAllPopups}
//             onConfirm={handleConfirmDelete}
//             isLoading={isDeleting}
//           />
//         )}

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// // NÃO ABRE POPUP/ LOADING DELETE CARD OK src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//   }

//   // --- OPEN POPUPS ---
//   function onEditProfileClick() {
//     setPopup({ title: "Editar perfil" });
//   }

//   function onEditAvatarClick() {
//     setPopup({ title: "Alterar avatar" });
//   }

//   function onAddPlaceClick() {
//     setPopup({ title: "Novo local" });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({ title: "" });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setPopup({ title: "Confirmação" });
//   }

//   // --- API ACTIONS ---
//   function handleUpdateUser(data) {
//     setIsLoading(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);
//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);
//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;
//     setIsLoading(true);
//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prev) => prev.filter((c) => c._id !== cardToDelete._id));
//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function onCardLike(card) {
//     const isLiked = card.likes.some((i) => i === currentUser._id);
//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((newCardData) => {
//         setCards((prevCards) =>
//           prevCards.map((c) => (c._id === card._id ? newCardData : c))
//         );
//       })
//       .catch(console.error);
//   }

//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />
//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//           onUpdateUser={handleUpdateUser}
//           onUpdateAvatar={handleUpdateAvatar}
//           onAddPlace={handleAddPlaceSubmit}
//           onConfirmDelete={handleConfirmDelete}
//           isLoading={isLoading}
//         />
//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// // VERSÃO FUNCIONANDOOOOOO  src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//   }

//   // --- OPEN POPUPS ---
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: () => (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoading}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: () => (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoading}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: () => (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoading}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: () => <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setPopup({
//       title: "Confirmação",
//       children: () => (
//         <PopupWithConfirmation
//           isOpen={true}
//           onClose={closeAllPopups}
//           onConfirm={handleConfirmDelete}
//           isLoading={isLoading}
//         />
//       ),
//     });
//   }

//   // --- API ACTIONS ---
//   function handleUpdateUser(data) {
//     setIsLoading(true);

//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);

//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);

//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function onCardLike(card) {
//     const isLiked = card.likes.some((i) => i === currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((newCardData) => {
//         setCards((prevCards) =>
//           prevCards.map((c) => (c._id === card._id ? newCardData : c))
//         );
//       })
//       .catch(console.error);
//   }

//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsLoading(true);

//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={() => {}}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlace={handleAddPlaceSubmit}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// // FUNCIONANDOOOOOOOO src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//   }

//   // --- OPEN POPUPS ---
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: () => (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoading}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: () => (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoading}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: () => (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoading}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: () => <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setPopup({
//       title: "Confirmação",
//       children: () => (
//         <PopupWithConfirmation
//           isOpen={true}
//           onClose={closeAllPopups}
//           onConfirm={handleConfirmDelete}
//           isLoading={isLoading}
//         />
//       ),
//     });
//   }

//   // --- API ACTIONS ---
//   function handleUpdateUser(data) {
//     setIsLoading(true);

//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);

//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);

//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function onCardLike(card) {
//     const isLiked = card.likes.some((i) => i === currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((newCardData) => {
//         setCards((prevCards) =>
//           prevCards.map((c) => (c._id === card._id ? newCardData : c))
//         );
//       })
//       .catch(console.error);
//   }

//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsLoading(true);

//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={() => {}}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlace={handleAddPlaceSubmit}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// // src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//   }

//   // --- OPEN POPUPS ---
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoading}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoading}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoading}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setPopup({
//       title: "Confirmação",
//       children: (
//         <PopupWithConfirmation
//           isOpen={true}
//           onClose={closeAllPopups}
//           onConfirm={handleConfirmDelete}
//           isLoading={isLoading}
//         />
//       ),
//     });
//   }

//   // --- API ACTIONS ---
//   function handleUpdateUser(data) {
//     setIsLoading(true);

//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);

//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);

//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   function onCardLike(card) {
//     const isLiked = card.likes.some((i) => i === currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((newCardData) => {
//         setCards((prevCards) =>
//           prevCards.map((c) => (c._id === card._id ? newCardData : c))
//         );
//       })
//       .catch(console.error);
//   }

//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsLoading(true);

//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );

//         setTimeout(() => {
//           closeAllPopups();
//           setIsLoading(false);
//         }, 800);
//       })
//       .catch(() => setIsLoading(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={() => {}}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlace={handleAddPlaceSubmit}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// // src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//   }

//   // --- OPEN POPUPS ---
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: () => (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoading}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: () => (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoading}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: () => (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoading}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: () => <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setPopup({
//       title: "Confirmação",
//       children: () => (
//         <PopupWithConfirmation
//           isOpen={true}
//           onClose={closeAllPopups}
//           onConfirm={handleConfirmDelete}
//           isLoading={isLoading}
//         />
//       ),
//     });
//   }

//   // --- API ACTIONS (com delay de 500ms) ---
//   function handleUpdateUser(data) {
//     setIsLoading(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//         }, 500);
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);

//         setTimeout(() => {
//           closeAllPopups();
//         }, 500);
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);
//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);

//         setTimeout(() => {
//           closeAllPopups();
//         }, 500);
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function onCardLike(card) {
//     const isLiked = card.likes.some((i) => i === currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((newCardData) => {
//         setCards((prevCards) =>
//           prevCards.map((c) => (c._id === card._id ? newCardData : c))
//         );
//       })
//       .catch(console.error);
//   }

//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsLoading(true);
//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );

//         setTimeout(() => {
//           closeAllPopups();
//         }, 500);
//       })
//       .finally(() => setIsLoading(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={() => {}}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlace={handleAddPlaceSubmit}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// // src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//   }

//   // --- OPEN POPUPS ---
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: () => (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoading}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: () => (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoading}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: () => (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoading}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: () => <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setPopup({
//       title: "Confirmação",
//       children: () => (
//         <PopupWithConfirmation
//           isOpen={true}
//           onClose={closeAllPopups}
//           onConfirm={handleConfirmDelete}
//           isLoading={isLoading}
//         />
//       ),
//     });
//   }

//   // --- API ACTIONS ---
//   function handleUpdateUser(data) {
//     setIsLoading(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);
//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function onCardLike(card) {
//     const isLiked = card.likes.some((i) => i === currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((newCardData) => {
//         setCards((prevCards) =>
//           prevCards.map((c) => (c._id === card._id ? newCardData : c))
//         );
//       })
//       .catch(console.error);
//   }

//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsLoading(true);
//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={() => {}}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlace={handleAddPlaceSubmit}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// // src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   // POPUP UNIFICADO
//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   // Load user + cards
//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // Close popup
//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//   }

//   // OPEN POPUPS
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: () => (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoading}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: () => (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoading}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: () => (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoading}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: () => <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setPopup({
//       title: "Confirmação",
//       children: () => (
//         <PopupWithConfirmation
//           isOpen={true}
//           onClose={closeAllPopups}
//           onConfirm={handleConfirmDelete}
//           isLoading={isLoading}
//         />
//       ),
//     });
//   }

//   // --- API ACTIONS ---
//   function handleUpdateUser(data) {
//     setIsLoading(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);
//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function onCardLike(card) {
//     const isLiked = card.likes.some((i) => i === currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((newCardData) => {
//         setCards((prevCards) =>
//           prevCards.map((c) => (c._id === card._id ? newCardData : c))
//         );
//       })
//       .catch(console.error);
//   }

//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsLoading(true);
//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       {/* --- AQUI ESTÁ A CORREÇÃO --- */}
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={onCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={() => {}}
//           onClosePopup={closeAllPopups}
//           popup={popup}
//           selectedCard={selectedCard}
//           openImagePopup={openImagePopup}
//           onAddPlace={handleAddPlaceSubmit}
//           onEditProfileClick={onEditProfileClick}
//           onEditAvatarClick={onEditAvatarClick}
//           onAddPlaceClick={onAddPlaceClick}
//         />

//         <Footer />
//       </div>
//       {/* --- FIM DA CORREÇÃO --- */}
//     </CurrentUserContext.Provider>
//   );
// }

// // src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   // POPUP UNIFICADO
//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   // Load user + cards
//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // Close popup
//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setCardToDelete(null);
//   }

//   // OPEN POPUPS
//   function onEditProfileClick() {
//     setPopup({
//       title: "Editar perfil",
//       children: () => (
//         <EditProfile
//           isOpen={true}
//           isLoading={isLoading}
//           currentUser={currentUser}
//           onUpdateUser={handleUpdateUser}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onEditAvatarClick() {
//     setPopup({
//       title: "Alterar avatar",
//       children: () => (
//         <EditAvatar
//           isOpen={true}
//           isLoading={isLoading}
//           onUpdateAvatar={handleUpdateAvatar}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function onAddPlaceClick() {
//     setPopup({
//       title: "Novo local",
//       children: () => (
//         <NewCard
//           isOpen={true}
//           isLoading={isLoading}
//           onAddPlace={handleAddPlaceSubmit}
//           onClose={closeAllPopups}
//         />
//       ),
//     });
//   }

//   function openImagePopup(card) {
//     setSelectedCard(card);
//     setPopup({
//       title: "",
//       children: () => <ImagePopup card={card} onClose={closeAllPopups} />,
//     });
//   }

//   function openConfirmPopup(card) {
//     setCardToDelete(card);
//     setPopup({
//       title: "Confirmação",
//       children: () => (
//         <PopupWithConfirmation
//           isOpen={true}
//           onClose={closeAllPopups}
//           onConfirm={handleConfirmDelete}
//           isLoading={isLoading}
//         />
//       ),
//     });
//   }

//   // --- API ACTIONS ---
//   function handleUpdateUser(data) {
//     setIsLoading(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);
//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards((prev) => [newCard, ...prev]);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function onCardLike(card) {
//     const isLiked = card.likes.some((i) => i === currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((newCardData) => {
//         setCards((prevCards) =>
//           prevCards.map((c) => (c._id === card._id ? newCardData : c))
//         );
//       })
//       .catch(console.error);
//   }

//   function handleCardDelete(card) {
//     openConfirmPopup(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsLoading(true);
//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <Header />

//       <Main
//         cards={cards}
//         onCardLike={onCardLike}
//         onCardDelete={handleCardDelete}
//         onOpenPopup={() => {}}
//         onClosePopup={closeAllPopups}
//         popup={popup}
//         selectedCard={selectedCard}
//         openImagePopup={openImagePopup}
//         onAddPlace={handleAddPlaceSubmit}
//         onEditProfileClick={onEditProfileClick}
//         onEditAvatarClick={onEditAvatarClick}
//         onAddPlaceClick={onAddPlaceClick}
//       />

//       <Footer />
//     </CurrentUserContext.Provider>
//   );
// }

// // src/components/App.jsx
// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
//   const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
//   const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   // Load user + cards
//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // Close all popups
//   function closeAllPopups() {
//     setIsEditProfileOpen(false);
//     setIsEditAvatarOpen(false);
//     setIsAddPlaceOpen(false);
//     setIsConfirmPopupOpen(false);
//     setSelectedCard(null);
//   }

//   // Update user
//   function handleUpdateUser(data) {
//     setIsLoading(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   // Update avatar
//   function handleUpdateAvatar(data) {
//     setIsLoading(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   // Add new card
//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);
//     api
//       .addCard(data)
//       .then((newCard) => {
//         // SAFE STATE UPDATE
//         setCards((prevCards) => [newCard, ...prevCards]);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   // Open delete confirmation popup
//   function handleCardDelete(card) {
//     setIsConfirmPopupOpen(true);
//     setCardToDelete(card);
//   }

//   // Confirm card deletion
//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsLoading(true);
//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         // SAFE STATE UPDATE
//         setCards((prevCards) =>
//           prevCards.filter((c) => c._id !== cardToDelete._id)
//         );
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <Header />

//       <Main
//         cards={cards}
//         onEditProfile={() => setIsEditProfileOpen(true)}
//         onEditAvatar={() => setIsEditAvatarOpen(true)}
//         onAddPlace={() => setIsAddPlaceOpen(true)}
//         onCardClick={setSelectedCard}
//         onCardDelete={handleCardDelete}
//       />

//       <Footer />

//       {/* Edit Profile */}
//       <EditProfile
//         isOpen={isEditProfileOpen}
//         onUpdateUser={handleUpdateUser}
//         isLoading={isLoading}
//         currentUser={currentUser}
//         onClose={closeAllPopups}
//       />

//       {/* Edit Avatar */}
//       <EditAvatar
//         isOpen={isEditAvatarOpen}
//         onUpdateAvatar={handleUpdateAvatar}
//         isLoading={isLoading}
//         onClose={closeAllPopups}
//       />

//       {/* New Card */}
//       <NewCard
//         isOpen={isAddPlaceOpen}
//         onAddPlace={handleAddPlaceSubmit}
//         isLoading={isLoading}
//         onClose={closeAllPopups}
//       />

//       {/* Image Popup */}
//       <ImagePopup card={selectedCard} onClose={closeAllPopups} />

//       {/* Delete Confirmation */}
//       <PopupWithConfirmation
//         isOpen={isConfirmPopupOpen}
//         onClose={closeAllPopups}
//         onConfirm={handleConfirmDelete}
//         isLoading={isLoading}
//       />
//     </CurrentUserContext.Provider>
//   );
// }

// import React, { useEffect, useState } from "react";

// import { Header } from "./Header/Header.jsx";
// import { Footer } from "./Footer/Footer.jsx";
// import { Main } from "./Main/Main.jsx";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation.jsx";

// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// export default function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
//   const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
//   const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   // Load user + cards
//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, initialCards]) => {
//         setCurrentUser(userData);
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // Close all popups
//   function closeAllPopups() {
//     setIsEditProfileOpen(false);
//     setIsEditAvatarOpen(false);
//     setIsAddPlaceOpen(false);
//     setIsConfirmPopupOpen(false);
//     setSelectedCard(null);
//   }

//   // Handlers
//   function handleUpdateUser(data) {
//     setIsLoading(true);
//     api
//       .setUserInfo(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(data) {
//     setIsLoading(true);
//     api
//       .setUserAvatar(data)
//       .then((userData) => {
//         setCurrentUser(userData);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(data) {
//     setIsLoading(true);
//     api
//       .addCard(data)
//       .then((newCard) => {
//         setCards([newCard, ...cards]);
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   function handleCardDelete(card) {
//     setIsConfirmPopupOpen(true);
//     setCardToDelete(card);
//   }

//   function handleConfirmDelete() {
//     if (!cardToDelete) return;

//     setIsLoading(true);
//     api
//       .deleteCard(cardToDelete._id)
//       .then(() => {
//         setCards(cards.filter((c) => c._id !== cardToDelete._id));
//         closeAllPopups();
//       })
//       .finally(() => setIsLoading(false));
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <Header />

//       <Main
//         cards={cards}
//         onEditProfile={() => setIsEditProfileOpen(true)}
//         onEditAvatar={() => setIsEditAvatarOpen(true)}
//         onAddPlace={() => setIsAddPlaceOpen(true)}
//         onCardClick={setSelectedCard}
//         onCardDelete={handleCardDelete}
//       />

//       <Footer />

//       {/* Edit Profile */}
//       <EditProfile
//         isOpen={isEditProfileOpen}
//         onUpdateUser={handleUpdateUser}
//         isLoading={isLoading}
//         currentUser={currentUser}
//         onClose={closeAllPopups}
//       />

//       {/* Edit Avatar */}
//       <EditAvatar
//         isOpen={isEditAvatarOpen}
//         onUpdateAvatar={handleUpdateAvatar}
//         isLoading={isLoading}
//         onClose={closeAllPopups}
//       />

//       {/* New Card */}
//       <NewCard
//         isOpen={isAddPlaceOpen}
//         onAddPlace={handleAddPlaceSubmit}
//         isLoading={isLoading}
//         onClose={closeAllPopups}
//       />

//       {/* Image Popup */}
//       <ImagePopup card={selectedCard} onClose={closeAllPopups} />

//       {/* Delete Confirmation */}
//       <PopupWithConfirmation
//         isOpen={isConfirmPopupOpen}
//         onClose={closeAllPopups}
//         onConfirm={handleConfirmDelete}
//         isLoading={isLoading}
//       />
//     </CurrentUserContext.Provider>
//   );
// }

// import React, { useState, useEffect } from "react";
// import Header from "./components/Header/Header.jsx";
// import Footer from "./components/Footer/Footer.jsx";
// import Main from "./components/Main/Main.jsx";

// import PopupWithForm from "./components/PopupWithForm/PopupWithForm.jsx";
// import PopupWithImage from "./components/PopupWithImage/PopupWithImage.jsx";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation";

// import api from "./utils/api";

// function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);

//   // -------------------------
//   // POPUPS (Estados)
//   // -------------------------
//   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
//   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
//   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
//   const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
//   const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

//   const [selectedCard, setSelectedCard] = useState(null);

//   // -------------------------
//   // LOAD DATA ON MOUNT
//   // -------------------------
//   useEffect(() => {
//     api
//       .getInitialData()
//       .then(([userData, cardsData]) => {
//         setCurrentUser(userData);
//         setCards(cardsData);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // -------------------------
//   // HANDLERS POPUPS
//   // -------------------------
//   function handleEditProfileClick() {
//     setIsEditProfilePopupOpen(true);
//   }

//   function handleAddPlaceClick() {
//     setIsAddPlacePopupOpen(true);
//   }

//   function handleEditAvatarClick() {
//     setIsEditAvatarPopupOpen(true);
//   }

//   function closeAllPopups() {
//     setIsEditProfilePopupOpen(false);
//     setIsAddPlacePopupOpen(false);
//     setIsEditAvatarPopupOpen(false);
//     setIsImagePopupOpen(false);
//     setIsDeletePopupOpen(false);
//     setSelectedCard(null);
//   }

//   function handleCardClick(card) {
//     setSelectedCard(card);
//     setIsImagePopupOpen(true);
//   }

//   // -------------------------
//   // LIKE CARD
//   // -------------------------
//   function handleCardLike(card) {
//     const isLiked = card.likes.some((i) => i._id === currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((newCard) => {
//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? newCard : c))
//         );
//       })
//       .catch((err) => console.error(err));
//   }

//   // -------------------------
//   // DELETE CARD CLICK
//   // -------------------------
//   function handleDeleteClick(card) {
//     setSelectedCard(card);
//     setIsDeletePopupOpen(true);
//   }

//   // -------------------------
//   // CONFIRM DELETE
//   // -------------------------
//   function handleDeleteCard() {
//     api
//       .deleteCard(selectedCard._id)
//       .then(() => {
//         setCards((state) => state.filter((c) => c._id !== selectedCard._id));
//         closeAllPopups();
//       })
//       .catch((err) => console.error(err));
//   }

//   return (
//     <>
//       <Header />

//       <Main
//         cards={cards}
//         onEditProfile={handleEditProfileClick}
//         onAddPlace={handleAddPlaceClick}
//         onEditAvatar={handleEditAvatarClick}
//         onCardClick={handleCardClick}
//         onCardLike={handleCardLike}
//         onCardDelete={handleDeleteClick}
//       />

//       <Footer />

//       {/* ----------------------------- */}
//       {/* EDIT PROFILE POPUP */}
//       {/* ----------------------------- */}
//       <PopupWithForm
//         name="edit-profile"
//         title="Editar Perfil"
//         isOpen={isEditProfilePopupOpen}
//         onClose={closeAllPopups}
//         submitButtonText="Salvar"
//         children={() => (
//           <>
//             <input
//               type="text"
//               name="name"
//               className="popup__input"
//               placeholder="Nome"
//               required
//             />
//             <input
//               type="text"
//               name="about"
//               className="popup__input"
//               placeholder="Sobre você"
//               required
//             />
//           </>
//         )}
//       />

//       {/* ----------------------------- */}
//       {/* ADD PLACE POPUP */}
//       {/* ----------------------------- */}
//       <PopupWithForm
//         name="add-place"
//         title="Novo Local"
//         isOpen={isAddPlacePopupOpen}
//         onClose={closeAllPopups}
//         submitButtonText="Criar"
//         children={() => (
//           <>
//             <input
//               type="text"
//               name="name"
//               className="popup__input"
//               placeholder="Título"
//               required
//             />

//             <input
//               type="url"
//               name="link"
//               className="popup__input"
//               placeholder="URL da imagem"
//               required
//             />
//           </>
//         )}
//       />

//       {/* ----------------------------- */}
//       {/* EDIT AVATAR */}
//       {/* ----------------------------- */}
//       <PopupWithForm
//         name="edit-avatar"
//         title="Alterar avatar"
//         isOpen={isEditAvatarPopupOpen}
//         onClose={closeAllPopups}
//         submitButtonText="Salvar"
//         children={() => (
//           <>
//             <input
//               type="url"
//               name="avatar"
//               className="popup__input"
//               placeholder="URL do avatar"
//               required
//             />
//           </>
//         )}
//       />

//       {/* ----------------------------- */}
//       {/* IMAGE POPUP */}
//       {/* ----------------------------- */}
//       <PopupWithImage
//         card={selectedCard}
//         isOpen={isImagePopupOpen}
//         onClose={closeAllPopups}
//       />

//       {/* ----------------------------- */}
//       {/* CONFIRMATION POPUP */}
//       {/* ----------------------------- */}
//       <PopupWithConfirmation
//         title="Tem certeza?"
//         isOpen={isDeletePopupOpen}
//         onClose={closeAllPopups}
//         onConfirm={handleDeleteCard}
//       />
//     </>
//   );
// }

// export default App;

// import { useEffect, useState } from "react";
// import { Header } from "./Header/Header";
// import { Main } from "./Main/Main";
// import { Footer } from "./Footer/Footer";
// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation";

// function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);
//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   // confirmação
//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   // loading states
//   const [isSavingProfile, setIsSavingProfile] = useState(false);
//   const [isSavingAvatar, setIsSavingAvatar] = useState(false);
//   const [isAddingCard, setIsAddingCard] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // inicialização
//   useEffect(() => {
//     (async () => {
//       try {
//         const [userData, cardsData] = await Promise.all([
//           api.getUserInfo(),
//           api.getCardList(),
//         ]);
//         setCurrentUser(userData);
//         setCards(cardsData);
//       } catch (err) {
//         console.error("Erro ao buscar dados iniciais:", err);
//       }
//     })();
//   }, []);

//   // helper
//   function handleOpenPopup(popupObject) {
//     setPopup(popupObject);
//   }

//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setIsConfirmPopupOpen(false);
//   }

//   // ABRIR POPUPS – agora usando "render()", para re-renderizar com loading atualizado
//   function handleEditProfileClick() {
//     handleOpenPopup({
//       title: "Editar perfil",
//       render: () => (
//         <EditProfile
//           isOpen={true}
//           onClose={closeAllPopups}
//           onUpdateUser={handleUpdateUser}
//           isLoading={isSavingProfile}
//           currentUser={currentUser}
//         />
//       ),
//     });
//   }

//   function handleEditAvatarClick() {
//     handleOpenPopup({
//       title: "Alterar avatar",
//       render: () => (
//         <EditAvatar
//           isOpen={true}
//           onClose={closeAllPopups}
//           onUpdateAvatar={handleUpdateAvatar}
//           isLoading={isSavingAvatar}
//         />
//       ),
//     });
//   }

//   function handleAddPlaceClick() {
//     handleOpenPopup({
//       title: "Novo Local",
//       render: () => (
//         <NewCard
//           isOpen={true}
//           onAddPlace={handleAddPlaceSubmit}
//           isLoading={isAddingCard}
//         />
//       ),
//     });
//   }

//   function handleImageOpen(card) {
//     setSelectedCard(card);
//     handleOpenPopup({ title: "", render: () => null });
//   }

//   // UPDATE PROFILE
//   async function handleUpdateUser(data) {
//     try {
//       setIsSavingProfile(true);
//       const updated = await api.setUserInfo(data);
//       setCurrentUser(updated);
//       closeAllPopups();
//     } catch (err) {
//       console.error("Erro update user:", err);
//     } finally {
//       setIsSavingProfile(false);
//     }
//   }

//   // UPDATE AVATAR
//   async function handleUpdateAvatar({ avatar }) {
//     try {
//       setIsSavingAvatar(true);
//       const updated = await api.setUserAvatar({ avatar });
//       setCurrentUser(updated);
//       closeAllPopups();
//     } catch (err) {
//       console.error("Erro update avatar:", err);
//     } finally {
//       setIsSavingAvatar(false);
//     }
//   }

//   // ADD CARD
//   async function handleAddPlaceSubmit({ name, link }) {
//     try {
//       setIsAddingCard(true);
//       const newCard = await api.addCard({ name, link });
//       setCards((prev) => [newCard, ...prev]);
//       closeAllPopups();
//     } catch (err) {
//       console.error("Erro add card:", err);
//     } finally {
//       setIsAddingCard(false);
//     }
//   }

//   // LIKE
//   function handleCardLike(card) {
//     const isLiked = card.likes?.includes(currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((updated) => {
//         const normalized = {
//           ...card,
//           likes:
//             updated.likes ??
//             (updated.isLiked
//               ? [...new Set([...(card.likes || []), currentUser._id])]
//               : (card.likes || []).filter((id) => id !== currentUser._id)),
//         };

//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? normalized : c))
//         );
//       })
//       .catch((err) => console.error("Erro ao alterar like:", err));
//   }

//   // DELETE
//   async function handleCardDelete(card) {
//     try {
//       setIsLoading(true);
//       await api.deleteCard(card._id);

//       setCards((state) => state.filter((c) => c._id !== card._id));

//       if (selectedCard?._id === card._id) setSelectedCard(null);

//       closeAllPopups();
//     } catch (err) {
//       console.error("Erro ao deletar card:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   function handleDeleteClick(card) {
//     setCardToDelete(card);
//     setIsConfirmPopupOpen(true);
//   }

//   const contextValue = { currentUser };

//   return (
//     <CurrentUserContext.Provider value={contextValue}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={handleCardLike}
//           onCardDelete={handleDeleteClick}
//           popup={popup}
//           onOpenPopup={handleOpenPopup}
//           onClosePopup={closeAllPopups}
//           openImagePopup={handleImageOpen}
//           selectedCard={selectedCard}
//           onEditProfileClick={handleEditProfileClick}
//           onEditAvatarClick={handleEditAvatarClick}
//           onAddPlaceClick={handleAddPlaceClick}
//         />

//         {/* CONFIRMAÇÃO */}
//         <PopupWithConfirmation
//           isOpen={isConfirmPopupOpen}
//           onClose={closeAllPopups}
//           onConfirm={() => handleCardDelete(cardToDelete)}
//           isLoading={isLoading}
//         />

//         {/* POPUP DINÂMICO */}
//         {popup && (
//           <ImagePopup
//             isOpen={true}
//             title={popup.title}
//             onClose={closeAllPopups}
//           >
//             {popup.render && popup.render()}
//           </ImagePopup>
//         )}

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;

// // src/components/App.jsx
// import { useEffect, useState } from "react";
// import { Header } from "./Header/Header";
// import { Main } from "./Main/Main";
// import { Footer } from "./Footer/Footer";
// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation";

// function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);
//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   // NEW — estados do popup de confirmação
//   const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   // loading states
//   const [isSavingProfile, setIsSavingProfile] = useState(false);
//   const [isSavingAvatar, setIsSavingAvatar] = useState(false);
//   const [isAddingCard, setIsAddingCard] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // FETCH INITIAL DATA
//   useEffect(() => {
//     (async () => {
//       try {
//         const [userData, cardsData] = await Promise.all([
//           api.getUserInfo(),
//           api.getCardList(),
//         ]);
//         setCurrentUser(userData);
//         setCards(cardsData);
//       } catch (err) {
//         console.error("Erro ao buscar dados iniciais:", err);
//       }
//     })();
//   }, []);

//   // POPUPS open/close helpers
//   function handleOpenPopup(popupObject) {
//     setPopup(popupObject);
//   }

//   function closeAllPopups() {
//     setPopup(null);
//     setSelectedCard(null);
//     setIsConfirmPopupOpen(false); // <-- importante
//   }

//   // abrir popups específicos
//   function handleEditProfileClick() {
//     handleOpenPopup({
//       title: "Editar perfil",
//       children: (
//         <EditProfile
//           isOpen={true}
//           onClose={closeAllPopups}
//           onUpdateUser={handleUpdateUser}
//           isLoading={isSavingProfile}
//           currentUser={currentUser}
//         />
//       ),
//     });
//   }

//   function handleEditAvatarClick() {
//     handleOpenPopup({
//       title: "Alterar avatar",
//       children: (
//         <EditAvatar
//           isOpen={true}
//           onClose={closeAllPopups}
//           onUpdateAvatar={handleUpdateAvatar}
//           isLoading={isSavingAvatar}
//         />
//       ),
//     });
//   }

//   function handleAddPlaceClick() {
//     handleOpenPopup({
//       title: "Novo Local",
//       children: (
//         <NewCard onAddPlace={handleAddPlaceSubmit} isLoading={isAddingCard} />
//       ),
//     });
//   }

//   function handleImageOpen(card) {
//     setSelectedCard(card);
//     handleOpenPopup({ title: "", children: null });
//   }

//   // UPDATE USER
//   async function handleUpdateUser(data) {
//     try {
//       setIsSavingProfile(true);
//       const updated = await api.setUserInfo(data);
//       setCurrentUser(updated);
//       closeAllPopups();
//     } catch (err) {
//       console.error("Erro update user:", err);
//     } finally {
//       setIsSavingProfile(false);
//     }
//   }

//   async function handleUpdateAvatar({ avatar }) {
//     try {
//       setIsSavingAvatar(true);
//       const updated = await api.setUserAvatar({ avatar });
//       setCurrentUser(updated);
//       closeAllPopups();
//     } catch (err) {
//       console.error("Erro update avatar:", err);
//     } finally {
//       setIsSavingAvatar(false);
//     }
//   }

//   // ADD CARD
//   async function handleAddPlaceSubmit({ name, link }) {
//     try {
//       setIsAddingCard(true);
//       const newCard = await api.addCard({ name, link });
//       setCards((prev) => [newCard, ...prev]);
//       closeAllPopups();
//     } catch (err) {
//       console.error("Erro add card:", err);
//     } finally {
//       setIsAddingCard(false);
//     }
//   }

//   // LIKE / UNLIKE
//   function handleCardLike(card) {
//     const isLiked = card.likes?.includes(currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((updated) => {
//         const normalized = {
//           ...card,
//           likes:
//             updated.likes ??
//             (updated.isLiked
//               ? [...new Set([...(card.likes || []), currentUser._id])]
//               : (card.likes || []).filter((id) => id !== currentUser._id)),
//         };

//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? normalized : c))
//         );
//       })
//       .catch((err) => console.error("Erro ao alterar like:", err));
//   }

//   // DELETE CARD com LOADING
//   async function handleCardDelete(card) {
//     try {
//       setIsLoading(true);
//       await api.deleteCard(card._id);

//       setCards((state) => state.filter((c) => c._id !== card._id));

//       if (selectedCard?._id === card._id) {
//         setSelectedCard(null);
//       }

//       closeAllPopups();
//     } catch (err) {
//       console.error("Erro ao deletar card:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // Abrir popup de confirmação
//   function handleDeleteClick(card) {
//     setCardToDelete(card);
//     setIsConfirmPopupOpen(true);
//   }

//   const contextValue = {
//     currentUser,
//   };

//   return (
//     <CurrentUserContext.Provider value={contextValue}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={handleCardLike}
//           onCardDelete={handleDeleteClick}
//           popup={popup}
//           onOpenPopup={handleOpenPopup}
//           onClosePopup={closeAllPopups}
//           openImagePopup={handleImageOpen}
//           selectedCard={selectedCard}
//           onEditProfileClick={handleEditProfileClick}
//           onEditAvatarClick={handleEditAvatarClick}
//           onAddPlaceClick={handleAddPlaceClick}
//         />

//         {/* Popup de confirmação FIXO e FUNCIONAL */}
//         <PopupWithConfirmation
//           isOpen={isConfirmPopupOpen}
//           onClose={closeAllPopups}
//           onConfirm={() => handleCardDelete(cardToDelete)}
//           isLoading={isLoading}
//         />

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;

// import { useEffect, useState } from "react";
// import { Header } from "./Header/Header";
// import { Main } from "./Main/Main";
// import { Footer } from "./Footer/Footer";
// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile";
// import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar";
// import NewCard from "./Main/components/Popup/components/NewCard/NewCard";
// import ImagePopup from "./Main/components/Popup/components/ImagePopup/ImagePopup";
// import PopupWithConfirmation from "./Main/components/Popup/components/PopupWithConfirmation/PopupWithConfirmation";

// function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);
//   const [popup, setPopup] = useState(null); // { title, children }
//   const [selectedCard, setSelectedCard] = useState(null);

//   // loading states
//   const [isSavingProfile, setIsSavingProfile] = useState(false);
//   const [isSavingAvatar, setIsSavingAvatar] = useState(false);
//   const [isAddingCard, setIsAddingCard] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // --------------------------
//   // FETCH INITIAL DATA
//   // --------------------------
//   useEffect(() => {
//     (async () => {
//       try {
//         const [userData, cardsData] = await Promise.all([
//           api.getUserInfo(),
//           api.getCardList(),
//         ]);
//         setCurrentUser(userData);
//         setCards(cardsData);
//       } catch (err) {
//         console.error("Erro ao buscar dados iniciais:", err);
//       }
//     })();
//   }, []);

//   // --------------------------
//   // POPUPS open/close helpers
//   // --------------------------
//   function handleOpenPopup(popupObject) {
//     setPopup(popupObject);
//   }

//   function handleClosePopup() {
//     setPopup(null);
//     setSelectedCard(null);
//   }

//   // helpers para abrir popups específicos (são passadas para o Main)
//   function handleEditProfileClick() {
//     handleOpenPopup({
//       title: "Editar perfil",
//       children: (
//         <EditProfile
//           isOpen={true}
//           onClose={handleClosePopup}
//           onUpdateUser={handleUpdateUser}
//           isLoading={isSavingProfile}
//           currentUser={currentUser}
//         />
//       ),
//     });
//   }

//   function handleEditAvatarClick() {
//     handleOpenPopup({
//       title: "Alterar avatar",
//       children: (
//         <EditAvatar
//           isOpen={true}
//           onClose={handleClosePopup}
//           onUpdateAvatar={handleUpdateAvatar}
//           isLoading={isSavingAvatar}
//         />
//       ),
//     });
//   }

//   function handleAddPlaceClick() {
//     handleOpenPopup({
//       title: "Novo Local",
//       children: (
//         <NewCard onAddPlace={handleAddPlaceSubmit} isLoading={isAddingCard} />
//       ),
//     });
//   }

//   // image popup
//   function handleImageOpen(card) {
//     setSelectedCard(card);
//     handleOpenPopup({
//       title: "",
//       children: null, // Main/Popup will render ImagePopup based on title === ""
//     });
//   }

//   // --------------------------
//   // USER UPDATE
//   // --------------------------
//   async function handleUpdateUser(data) {
//     try {
//       setIsSavingProfile(true);
//       const updated = await api.setUserInfo(data);
//       setCurrentUser(updated);
//       handleClosePopup();
//     } catch (err) {
//       console.error("Erro update user:", err);
//     } finally {
//       setIsSavingProfile(false);
//     }
//   }

//   async function handleUpdateAvatar({ avatar }) {
//     try {
//       setIsSavingAvatar(true);
//       const updated = await api.setUserAvatar({ avatar });
//       setCurrentUser(updated);
//       handleClosePopup();
//     } catch (err) {
//       console.error("Erro update avatar:", err);
//     } finally {
//       setIsSavingAvatar(false);
//     }
//   }

//   // --------------------------
//   // ADD CARD
//   // --------------------------
//   async function handleAddPlaceSubmit({ name, link }) {
//     try {
//       setIsAddingCard(true);
//       const newCard = await api.addCard({ name, link });
//       setCards((prev) => [newCard, ...prev]);
//       handleClosePopup();
//     } catch (err) {
//       console.error("Erro add card:", err);
//     } finally {
//       setIsAddingCard(false);
//     }
//   }

//   // --------------------------
//   // LIKE / UNLIKE CARD
//   // --------------------------
//   function handleCardLike(card) {
//     const isLiked = card.likes?.includes(currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((updated) => {
//         // NORMALIZADOR: API returns { isLiked: true/false } sometimes
//         const normalized = {
//           ...card,
//           likes:
//             updated.likes ??
//             (updated.isLiked
//               ? [...new Set([...(card.likes || []), currentUser._id])]
//               : (card.likes || []).filter((id) => id !== currentUser._id)),
//         };

//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? normalized : c))
//         );
//       })
//       .catch((err) => console.error("Erro ao alterar like:", err));
//   }

//   // // --------------------------
//   // // DELETE CARD
//   // // --------------------------
//   // async function handleCardDelete(card) {
//   //   try {
//   //     await api.deleteCard(card._id);
//   //     setCards((state) => state.filter((c) => c._id !== card._id));
//   //     if (selectedCard && selectedCard._id === card._id) setSelectedCard(null);
//   //   } catch (err) {
//   //     console.error("Erro delete card:", err);
//   //   }
//   // }

//   // --------------------------
//   // DELETE CARD (COM CONFIRMAÇÃO)
//   // --------------------------
//   // function handleCardDelete(card) {
//   //   setPopup({
//   //     title: "confirm",
//   //     children: (
//   //       <PopupWithConfirmation
//   //         onConfirm={async () => {
//   //           try {
//   //             await api.deleteCard(card._id);

//   //             setCards((prev) => prev.filter((c) => c._id !== card._id));
//   //           } catch (err) {
//   //             console.error("Erro ao deletar card:", err);
//   //           } finally {
//   //             handleClosePopup();
//   //           }
//   //         }}
//   //       />
//   //     ),
//   //   });
//   // }

//   function handleCardDelete(card) {
//     setIsLoading(true);

//     api
//       .deleteCard(card._id)
//       .then(() => {
//         setCards((state) => state.filter((c) => c._id !== card._id));
//         closeAllPopups(); // fecha a popup
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setIsLoading(false));
//   }

//   // --------------------------
//   // Abrir Popup de confirmação
//   // --------------------------

//   function handleDeleteClick(card) {
//     setCardToDelete(card);
//     setIsConfirmPopupOpen(true);
//   }

//   // Renderizando a PopupWithConfirmation
//   <PopupWithConfirmation
//     isOpen={isConfirmPopupOpen}
//     onClose={closeAllPopups}
//     onConfirm={() => handleCardDelete(cardToDelete)}
//     isLoading={isLoading}
//   />;

//   // --------------------------
//   // Provide context + render
//   // --------------------------
//   const contextValue = {
//     currentUser,
//     handleUpdateUser,
//     handleUpdateAvatar,
//   };

//   return (
//     <CurrentUserContext.Provider value={contextValue}>
//       <div className="page">
//         <Header />

//         <Main
//           cards={cards}
//           onCardLike={handleCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={handleOpenPopup} // still available if needed
//           onClosePopup={handleClosePopup}
//           popup={popup}
//           openImagePopup={handleImageOpen}
//           selectedCard={selectedCard}
//           onEditProfileClick={handleEditProfileClick}
//           onEditAvatarClick={handleEditAvatarClick}
//           onAddPlaceClick={handleAddPlaceClick}
//         />

//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;

// import { useEffect, useState } from "react";
// import { Header } from "./Header/Header";
// import { Main } from "./Main/Main";
// import { Footer } from "./Footer/Footer";
// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);
//   const [popup, setPopup] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);

//   // --------------------------
//   // FETCH INITIAL DATA
//   // --------------------------
//   useEffect(() => {
//     (async () => {
//       try {
//         const [userData, cardsData] = await Promise.all([
//           api.getUserInfo(),
//           api.getCardList(),
//         ]);
//         setCurrentUser(userData);
//         setCards(cardsData);
//       } catch (err) {
//         console.error("Erro ao buscar dados iniciais:", err);
//       }
//     })();
//   }, []);

//   // --------------------------
//   // POPUPS
//   // --------------------------
//   function handleOpenPopup(popupObject) {
//     setPopup(popupObject);
//   }

//   function handleClosePopup() {
//     setPopup(null);
//     setSelectedCard(null);
//   }

//   // --------------------------
//   // USER UPDATE
//   // --------------------------
//   async function handleUpdateUser(data) {
//     try {
//       const updated = await api.setUserInfo(data);
//       setCurrentUser(updated);
//       handleClosePopup();
//     } catch (err) {
//       console.error("Erro update user:", err);
//     }
//   }

//   async function handleUpdateAvatar({ avatar }) {
//     try {
//       const updated = await api.setUserAvatar({ avatar });
//       setCurrentUser(updated);
//       handleClosePopup();
//     } catch (err) {
//       console.error("Erro update avatar:", err);
//     }
//   }

//   // --------------------------
//   // ADD CARD
//   // --------------------------
//   async function handleAddPlaceSubmit({ name, link }) {
//     try {
//       const newCard = await api.addCard({ name, link });
//       setCards((prev) => [newCard, ...prev]);
//       handleClosePopup();
//     } catch (err) {
//       console.error("Erro add card:", err);
//     }
//   }

//   // --------------------------
//   // LIKE / UNLIKE CARD
//   // --------------------------
//   function handleCardLike(card) {
//     const isLiked = card.likes?.includes(currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((updated) => {
//         console.log("API retornou:", updated);

//         // NORMALIZADOR 100% confiável
//         const normalized = {
//           ...card,
//           likes: updated.isLiked
//             ? [...new Set([...(card.likes || []), currentUser._id])]
//             : (card.likes || []).filter((id) => id !== currentUser._id),
//         };

//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? normalized : c))
//         );
//       })
//       .catch((err) => console.error("Erro ao alterar like:", err));
//   }

//   // --------------------------
//   // DELETE CARD
//   // --------------------------
//   async function handleCardDelete(card) {
//     try {
//       await api.deleteCard(card._id);
//       setCards((state) => state.filter((c) => c._id !== card._id));

//       if (selectedCard && selectedCard._id === card._id) {
//         setSelectedCard(null);
//       }
//     } catch (err) {
//       console.error("Erro delete card:", err);
//     }
//   }

//   // --------------------------
//   // OPEN IMAGE POPUP
//   // --------------------------
//   function handleCardClick(card) {
//     setSelectedCard(card);
//     handleOpenPopup({ title: "", children: null });
//   }

//   // CONTEXT VALUES
//   const contextValue = {
//     currentUser,
//     handleUpdateUser,
//     handleUpdateAvatar,
//   };

//   return (
//     <CurrentUserContext.Provider value={contextValue}>
//       <div className="page">
//         <Header />
//         <Main
//           cards={cards}
//           onCardLike={handleCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={handleOpenPopup}
//           onClosePopup={handleClosePopup}
//           popup={popup}
//           openImagePopup={handleCardClick}
//           selectedCard={selectedCard}
//           onAddPlace={handleAddPlaceSubmit}
//         />
//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;

// function handleCardLike(card) {
//   const likes = Array.isArray(card.likes) ? card.likes : [];

//   const isLiked = likes.includes(currentUser._id);

//   api
//     .changeLikeCardStatus(card._id, !isLiked)
//     .then((updatedCard) => {
//       console.log(updatedCard);
//       setCards((state) =>
//         state.map((c) => (c._id === card._id ? updatedCard : c))
//       );
//     })
//     .catch((err) => console.error("Erro ao alterar like:", err));
// }

// function handleCardLike(card) {
//   if (!card.likes) card.likes = []; // garante que existe

//   const isLiked = card.likes.includes(currentUser._id);

//   api
//     .changeLikeCardStatus(card._id, !isLiked)
//     .then((updatedCard) => {
//       setCards((state) =>
//         state.map((c) => (c._id === card._id ? updatedCard : c))
//       );
//     })
//     .catch((err) => {
//       console.error("Erro ao alterar like:", err);
//     });
// }

// function handleCardLike(card) {
//   const isLiked = card.likes.some((like) =>
//     typeof like === "string"
//       ? like === currentUser._id
//       : like._id === currentUser._id
//   );

//   api
//     .changeLikeCardStatus(card._id, !isLiked)
//     .then((updatedCard) => {
//       setCards((state) =>
//         state.map((c) => (c._id === card._id ? updatedCard : c))
//       );
//     })
//     .catch((err) => {
//       console.error("Erro ao alterar like:", err);
//     });
// }

// ======================================== // =======================================

// import { useEffect, useState } from "react";
// import { Header } from "./Header/Header";
// import { Main } from "./Main/Main";
// import { Footer } from "./Footer/Footer";
// import CurrentUserContext from "../contexts/CurrentUserContext";
// import api from "../utils/api";

// function App() {
//   // current user
//   const [currentUser, setCurrentUser] = useState({});
//   // cards
//   const [cards, setCards] = useState([]);
//   // popup control: popup is object or null (ex: { title, children })
//   const [popup, setPopup] = useState(null);
//   // selected card for image popup
//   const [selectedCard, setSelectedCard] = useState(null);

//   // --- fetch user and cards once on mount ---
//   useEffect(() => {
//     (async () => {
//       try {
//         const [userData, cardsData] = await Promise.all([
//           api.getUserInfo(),
//           api.getCardList(),
//         ]);
//         setCurrentUser(userData);
//         setCards(cardsData);
//       } catch (err) {
//         console.error("Erro ao buscar dados iniciais:", err);
//       }
//     })();
//   }, []);

//   // open/close popups
//   function handleOpenPopup(popupObject) {
//     setPopup(popupObject);
//   }

//   function handleClosePopup() {
//     setPopup(null);
//     setSelectedCard(null);
//   }

//   // update user
//   async function handleUpdateUser(data) {
//     try {
//       const updated = await api.setUserInfo(data);
//       setCurrentUser(updated);
//       handleClosePopup();
//     } catch (err) {
//       console.error("Erro update user:", err);
//     }
//   }

//   // update avatar
//   async function handleUpdateAvatar({ avatar }) {
//     try {
//       const updated = await api.setUserAvatar({ avatar });
//       setCurrentUser(updated);
//       handleClosePopup();
//     } catch (err) {
//       console.error("Erro update avatar:", err);
//     }
//   }

//   // add new card
//   async function handleAddPlaceSubmit({ name, link }) {
//     try {
//       const newCard = await api.addCard({ name, link });
//       setCards((prev) => [newCard, ...prev]);
//       handleClosePopup();
//     } catch (err) {
//       console.error("Erro add card:", err);
//     }
//   }

//   // card like/unlike
//   function handleCardLike(card) {
//     const isLiked = card.likes.includes(currentUser._id);

//     api
//       .changeLikeCardStatus(card._id, !isLiked) // PUT se não curtiu / DELETE se já curtiu
//       .then((updatedCard) => {
//         setCards((state) =>
//           state.map((c) => (c._id === card._id ? updatedCard : c))
//         );
//       })
//       .catch((err) => {
//         console.error("Erro ao alterar like:", err);
//       });
//   }

//   // async function handleCardLike(card) {
//   //   try {
//   //     const isLiked =
//   //       card.likes && card.likes.some((u) => u._id === currentUser._id);
//   //     const updatedCard = await api.changeLikeCardStatus(card._id, !isLiked);
//   //     setCards((state) =>
//   //       state.map((c) => (c._id === card._id ? updatedCard : c))
//   //     );
//   //   } catch (err) {
//   //     console.error("Erro like/unlike:", err);
//   //   }
//   // }

//   // delete card
//   async function handleCardDelete(card) {
//     try {
//       await api.deleteCard(card._id);
//       setCards((state) => state.filter((c) => c._id !== card._id));
//       // if image popup open for that card, close
//       if (selectedCard && selectedCard._id === card._id) setSelectedCard(null);
//     } catch (err) {
//       console.error("Erro delete card:", err);
//     }
//   }

//   // open image popup
//   function handleCardClick(card) {
//     setSelectedCard(card);
//     handleOpenPopup({ title: "", children: null }); // children handled inside Main/ImagePopup
//   }

//   // Provide handlers via context (we provide only currentUser + update funcs; cards and card handlers passed as props)
//   const contextValue = {
//     currentUser,
//     handleUpdateUser,
//     handleUpdateAvatar,
//   };

//   return (
//     <CurrentUserContext.Provider value={contextValue}>
//       <div className="page">
//         <Header />
//         <Main
//           cards={cards}
//           onCardLike={handleCardLike}
//           onCardDelete={handleCardDelete}
//           onOpenPopup={handleOpenPopup}
//           onClosePopup={handleClosePopup}
//           popup={popup}
//           openImagePopup={(card) => {
//             setSelectedCard(card);
//             handleOpenPopup({ title: "", children: null });
//           }}
//           selectedCard={selectedCard}
//           onAddPlace={handleAddPlaceSubmit}
//         />
//         <Footer />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;

// import { useState } from "react";
// import { Header } from "./Header/Header";
// import { Main } from "./Main/Main";
// import { Footer } from "./Footer/Footer";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div className="page">
//         <Header />
//         <Main />
//         <Footer />
//       </div>
//     </>
//   );
// }

// export default App;
