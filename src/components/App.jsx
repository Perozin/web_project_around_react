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

  // --- Like Card ---
  async function handleCardLike(card) {
    try {
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
