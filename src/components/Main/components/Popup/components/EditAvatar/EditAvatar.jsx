export default function EditAvatar() {
  return (
    <form className="popup__form" name="form-avatar" noValidate>
      <input
        type="url"
        id="avatar"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Link da imagem do avatar"
        required
      />
      <span className="popup__input-error" id="avatar-error"></span>

      <button type="submit" className="popup__button">
        Salvar
      </button>
    </form>
  );
}
