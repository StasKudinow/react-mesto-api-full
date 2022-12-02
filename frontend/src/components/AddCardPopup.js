import { useState } from 'react';
import PopupWithForm from "./PopupWithForm";


function AddCardPopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleLinkChange(e) {
    setLink(e.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCard({
      name: name,
      link: link
    });
    setName('');
    setLink('');
  };


  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      button="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <div className="popup__field">
        <input
          className="popup__input popup__input_cards_name"
          id="cards-name"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="cards-name-error popup__error" />
      </div>
      <div className="popup__field">
        <input
          className="popup__input popup__input_cards_link"
          id="cards-link"
          type="url"
          name="link"
          value={link}
          onChange={handleLinkChange}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="cards-link-error popup__error" />
      </div>
    </PopupWithForm>
  );
}

export default AddCardPopup;