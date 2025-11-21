export default function NewCard() {
  return (
    <form className="popup__form" id="new-card-form">
      <input
        type="text"
        className="popup__input popup__input_type_card-name"
        id="title"
        name="title"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error" id="title-error"></span>
      <input
        type="url"
        className="popup__input popup__input_type_url"
        id="url"
        name="url"
        placeholder="Link de imagem"
        required
      />
      <span className="popup__input-error" id="url-error"></span>
      <button type="submit" className="popup__button">
        Criar
      </button>
    </form>
  );
}
