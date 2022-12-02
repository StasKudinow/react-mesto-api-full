function AuthForm(props) {
  return (
    <form className="auth__form" onSubmit={props.onSubmit}>
      <input
        className="auth__input auth__input_email"
        type="email"
        name="email"
        value={props.email}
        onChange={props.onEmailChange}
        placeholder="Email"
        required
      />
      <input
        className="auth__input auth__input_password"
        type="password"
        name="password"
        value={props.password}
        onChange={props.onPasswordChange}
        placeholder="Password"
        minLength="7"
        maxLength="30"
        required
      />
      <button className="auth__button" type="submit">{props.button}</button>
    </form>
  );
}

export default AuthForm;