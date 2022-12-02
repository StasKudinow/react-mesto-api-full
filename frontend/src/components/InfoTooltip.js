function InfoTooltip(props) {
  return (
    <div className={`popup popup_tooltip ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose} />
        <img className="popup__tooltip-image" src={props.image} alt="Подсказка" />
        <h2 className="popup__tooltip-text">{props.text}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;