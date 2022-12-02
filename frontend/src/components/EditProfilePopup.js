import { useState, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description
    });
  };

  useEffect(()=> {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);


  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <div className="popup__field">
        <input className="popup__input popup__input_profile_name"
          id="profile-name"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="profile-name-error popup__error" />
      </div>
      <div className="popup__field">
        <input
          className="popup__input popup__input_profile_job"
          id="profile-job"
          type="text"
          name="job"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Введите описание"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="profile-job-error popup__error" />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;