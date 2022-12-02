import '../App.css';
import success from '../images/success.png';
import error from '../images/error.png';

import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import api from "../utils/api";
import * as auth from '../utils/auth';

import Header from './Header';
import HeaderMobile from './HeaderMobile';
import Main from './Main';
import Footer from './Footer';
import Popup from './Popup';
import EditProfilePopup from './EditProfilePopup';
import AddCardPopup from './AddCardPopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setisImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isInfoToolTipWithError, setIsInfoToolTipWithError] = useState(false);
  const [isInfoToolTipWithSuccess, setIsInfoToolTipWithSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const history = useHistory();

  const isMobile = useMediaQuery({ query: '(max-width: 619px)' });

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
    setisImagePopupOpen(true);
  };

  function handleConfirmDeleteClick(selectedCard) {
    setSelectedCard(selectedCard);
    setIsConfirmDeletePopupOpen(true);
  };

  function handleInfoToolTipWithError() {
    setIsInfoToolTipWithError(true);
  };

  function handleInfoToolTipWithSuccess() {
    setIsInfoToolTipWithSuccess(true);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoToolTipWithError(false);
    setIsInfoToolTipWithSuccess(false);
    setSelectedCard({});
  };

  // API
  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleUpdateAvatar(data) {
    api.setAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleAddCardSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function onRegister({ password, email }) {
    return auth.register(password, email)
      .then((res) => {
        return res;
      })
  };

  function onLogin({ password, email }) {
    return auth.authorize(password, email)
      .then((res) => {
        if(res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setEmail(email);
        }
      })
  };

  function onLogout() {
    localStorage.removeItem('jwt');
  };

  function checkToken(jwt) {
    return auth.getContent(jwt)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setEmail(res.data.email);
        }
      })
      .catch((err) => {
        console.log(`Ошибка аутентификации: ${err}`);
      })
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      checkToken(jwt);
    }
  }, []);

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
        history.push('/');
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    }
  }, [loggedIn]);


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        {isMobile ?
          <HeaderMobile email={email} onLogout={onLogout}/>
          :
          <Header email={email} onLogout={onLogout}/>
        }

        <Switch>

          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddCardClick}
            onCardDelete={handleConfirmDeleteClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
          />

          <Route path="/signin">
            <Login
              onLogin={onLogin}
              onInfoToolTipWithError={handleInfoToolTipWithError}
            />
          </Route>

          <Route path="/signup">
            <Register
              onRegister={onRegister}
              onInfoToolTipWithError={handleInfoToolTipWithError}
              onInfoToolTipWithSuccess={handleInfoToolTipWithSuccess}
            />
          </Route>

          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="signin" />}
          </Route>

        </Switch>

        <Footer />

        <Popup onEscClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddCardPopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCardSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isInfoToolTipWithError}
          onClose={closeAllPopups}
          image={error}
          text="Что-то пошло не так! Попробуйте ещё раз."
        />

        <InfoTooltip
          isOpen={isInfoToolTipWithSuccess}
          onClose={closeAllPopups}
          image={success}
          text="Вы успешно зарегистрировались!"
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;