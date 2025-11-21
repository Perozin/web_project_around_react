import { useState } from "react";
import avatar from "../../images/Avatar.png";
import avatarVetor from "../../images/Avatar_vector.png";
import editButton from "../../images/Edit-Button-Vector.png";
import addButton from "../../images/Vector-add-button.png";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
import Card from "./components/Card/Card.jsx";

export function Main() {
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      _id: 1,
      name: "Vale de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
      _id: 2,
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
    {
      _id: 3,
      name: "Montanhas Carecas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    },
    {
      _id: 4,
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    },
    {
      _id: 5,
      name: "Parque Nacional da Vanoise ",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
      _id: 6,
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
  ];

  function handleOpenPopup(popupObject) {
    setPopup(popupObject);
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
  }

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Alterar avatar",
    children: <EditAvatar />,
  };

  const newCardPopup = {
    title: "Novo Local",
    children: <NewCard />,
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    handleOpenPopup({
      title: "", // sem título para aplicar popup de imagem
      // children: <ImagePopup card={card} />,
      children: <ImagePopup card={card} />,
    });
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image">
          <img src={avatar} className="profile__elipse" alt="Avatar" />

          <button
            type="button"
            className="profile__edit-button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img
              src={avatarVetor}
              className="profile__edit-vector"
              alt="ícone em formato de lápis"
            />
          </button>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">Jack Costeau</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          >
            <img
              src={editButton}
              alt="barra inclinada, funcionando como um botão vetorizado"
              className="profile__edit-button-vector"
            />
          </button>
          <h2 className="profile__profession">Explorador</h2>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img
            src={addButton}
            alt="sinal de adição, representando o botão adicionar"
            className="profile__add-button-vector"
          />
        </button>
      </section>

      <section className="elements page__section">
        <ul className="elements__cards">
          {cards.map((card) => (
            <Card key={card._id} card={card} onImageClick={handleCardClick} />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title} isOpen={!!popup}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
