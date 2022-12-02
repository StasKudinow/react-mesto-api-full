function PopupWithForm(props) {
  return (
      <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button className="popup__close-button" type="button" onClick={props.onClose} />
          <h2 className="popup__title">{props.title}</h2>
          <form className="popup__form" name={`${props.name}-form`} onSubmit={props.onSubmit}>
            {props.children}
            <button className="popup__button" type="submit" >{props.button}</button>
          </form>
        </div>
      </div>
  );
}

export default PopupWithForm;