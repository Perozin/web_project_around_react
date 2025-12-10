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
