export default function EditProfile() {
  return (
    <form className="popup__form" name="edit-profile-form" noValidate>
      <input
        type="text"
        className="popup__input popup__input_type_name"
        id="name"
        name="name"
        placeholder="Nome"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error" id="name-error"></span>

      <input
        type="text"
        className="popup__input popup__input_type_activity"
        id="activity"
        name="activity"
        placeholder="Sobre"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error" id="activity-error"></span>

      <button type="submit" className="popup__button">
        Salvar
      </button>
    </form>
  );
}
