export default function Card({ card, onImageClick }) {
  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={() => onImageClick(card)}
      />

      <button
        type="button"
        aria-label="Delete card"
        className="element__delete-button"
      />

      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <button
          type="button"
          aria-label="Like card"
          className="element__like-button"
        />
      </div>
    </li>
  );
}
