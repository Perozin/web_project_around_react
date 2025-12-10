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
