import logo from '../images/logo.svg';
import { Route, Switch, Link } from 'react-router-dom';


function Header(props) {
  return (
    <header className="header">
      <div className="header__logo" src={logo} alt="Логотип" />
      <Switch>
        <Route path="/signin">
          <Link to="/signup" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/signup">
          <Link to="/signin" className="header__link">Войти</Link>
        </Route>
        <Route path="/">
          <div className="header__info">
            <p className="header__email">{props.email}</p>
            <Link to="/signin" className="header__link" onClick={props.onLogout}>Выйти</Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;