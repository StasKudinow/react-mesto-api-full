function ImagePopup(props) {
  return (
    <div className={`popup popup_show ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__show-container">
        <button className="popup__close-button" type="button" onClick={props.onClose} />
        <img className="popup__show-image" src={props.card.link} alt={props.card.name} />
        <p className="popup__show-title">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;