import logo from '../images/logo.svg';
import { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';


function HeaderMobile(props) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  };

  const headerInfoClassName = (
    `header__info ${isClicked ? '' : 'header__info_hidden'}`
  );

  const headerButtonClassName = (
    `${isClicked ? 'header__close-button' : 'header__menu-button'}`
  );


  return (
      <Switch>
        <Route path="/signin">
          <header className="header">
            <div className="header__logo" src={logo} alt="Логотип" />
            <Link to="/signup" className="header__link">Регистрация</Link>
          </header>
        </Route>
        <Route path="/signup">
          <header className="header">
            <div className="header__logo" src={logo} alt="Логотип" />
            <Link to="/signin" className="header__link">Войти</Link>
          </header>
        </Route>
        <Route path="/">
          <div className={headerInfoClassName}>
            <p className="header__email">{props.email}</p>
            <Link to="/signin" className="header__link" onClick={props.onLogout}>Выйти</Link>
          </div>
          <header className="header">
            <div className="header__logo" src={logo} alt="Логотип" />
            <button className={headerButtonClassName} type="button" onClick={handleClick}/>
          </header>
        </Route>
      </Switch>
  );
}

export default HeaderMobile;