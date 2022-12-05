function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  };

  function handleLikeClick() {
    props.onCardLike(props.card);
  };

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  };

  const isOwn = props.card.owner === props.id;
  const cardDeleteButtonClassName = (
    `elements__trash ${isOwn ? '' : 'elements__trash_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i._id === props.id);
  const cardLikeButtonClassName = (
    `elements__button ${isLiked ? 'elements__button_active' : ''}`
  );


  return (
      <div className="elements__card" key={props.card._id}>
        <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
        <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
        <div className="elements__title">
          <h2 className="elements__name elements__name_text-hidden">{props.card.name}</h2>
          <div className="elements__likes">
            <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
            <p className="elements__counter">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
  );
}

export default Card;