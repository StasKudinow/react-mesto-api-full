import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    avatarRef.current.value = '';
  };


  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <div className="popup__field">
        <input
          className="popup__input popup__input_avatar_link"
          id="avatar-link"
          type="url"
          name="link"
          placeholder="Ссылка на новый аватар"
          ref={avatarRef}
          required
        />
        <span className="avatar-link-error popup__error" />
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;