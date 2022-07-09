import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const authCtx = useContext(AuthContext);

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

    setIsLoading(true);

    let url;

    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwcWLg1dyNAFokhuFyPXQfHB2_ZDqkwSQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwcWLg1dyNAFokhuFyPXQfHB2_ZDqkwSQ";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(() => {
            throw new Error("Authentication failed");
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        navigate({
          pathname: "../",
        });
      })
      .catch((err) => {
        alert(err.message);
      });

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
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
