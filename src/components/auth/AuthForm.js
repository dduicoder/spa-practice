import { useRef, useState } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = ({ onSubmit, login, setLogin, isLoading }) => {
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    setEmailValid(email.trim().length !== 0);
    setPasswordValid(password.trim().length > 7);

    if (email.trim().length === 0 || password.trim().length < 8) {
      return;
    }

    onSubmit(email, password);
  };

  const emailBlurHandler = (event) => {
    if (event.target.value.trim().length !== 0) {
      setEmailValid(true);
    }
  };

  const passwordBlurHandler = (event) => {
    if (event.target.value.trim().length !== 0) {
      setPasswordValid(true);
    }
  };

  return (
    <form className={`card ${classes.form}`} onSubmit={submitFormHandler}>
      <h3>{login ? "Login" : "Sign Up"}</h3>
      <label htmlFor="email">Email</label>
      <input
        className={emailValid ? "" : classes.invalid}
        ref={emailInputRef}
        onBlur={emailBlurHandler}
        type="text"
        id="email"
      />
      <label htmlFor="password">Password</label>
      <input
        className={passwordValid ? "" : classes.invalid}
        ref={passwordInputRef}
        onBlur={passwordBlurHandler}
        type="password"
        id="password"
      />
      <div className={classes.action}>
        <span onClick={() => setLogin(!login)}>
          {login ? "Create new account" : "Login with existing account"}
        </span>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <button className="btn">{login ? "Login" : "Create Account"}</button>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
