import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import AuthForm from './AuthForm';


function Login({ onLogin, onInfoToolTipWithError }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  const resetForm = useCallback(() => {
    setPassword('');
    setEmail('');
  }, []);

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({ password, email })
      .then(resetForm)
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        onInfoToolTipWithError();
        console.log(`Ошибка: ${err}`);
      })
  };


  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <AuthForm
          onSubmit={handleSubmit}
          onPasswordChange={handlePasswordChange}
          onEmailChange={handleEmailChange}
          password={password}
          email={email}
          button="Войти"
        />
    </div>
  );
}

export default Login;