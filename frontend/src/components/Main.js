import { useContext } from "react";
import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main(props) {
  const currentUser = useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
            <button className="profile__avatar-button" onClick={props.onEditAvatar}>
              <div className="profile__avatar-edit" />
            </button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name profile__name_text-hidden">{currentUser.name}</h1>
            <p className="profile__job profile__job_text-hidden">{currentUser.about}</p>
            <button className="profile__edit-button" onClick={props.onEditProfile} />
          </div>
        </div>
        <button className="profile__add-button" onClick={props.onAddCard} />
      </section>

      <section className="elements">
        {props.cards.map((data) => {
          return <Card
            key={data._id}
            card={data}
            id={currentUser._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        })}
      </section>
    </main>
  );
}

export default Main;