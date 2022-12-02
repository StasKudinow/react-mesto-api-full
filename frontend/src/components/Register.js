import { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthForm from './AuthForm';


function Register({ onRegister, onInfoToolTipWithError, onInfoToolTipWithSuccess }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  const resetForm = useCallback(() => {
    setPassword('');
    setEmail('');
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ password, email })
      .then(resetForm)
      .then(() => {
        history.push('/signin');
        onInfoToolTipWithSuccess();
        console.log('Success!');
      })
      .catch((err) => {
        onInfoToolTipWithError();
        console.log(`Ошибка: ${err}`);
      })
  };


  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
        <AuthForm
          onSubmit={handleSubmit}
          onPasswordChange={handlePasswordChange}
          onEmailChange={handleEmailChange}
          password={password}
          email={email}
          button="Зарегистрироваться"
        />
      <div className="auth__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="signin" className="auth__signin-link"> Войти</Link>
      </div>
    </div>
  );
}

export default Register;