import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AuthContext from "../store/auth-context";

import AuthForm from "../components/auth/AuthForm";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [login, setLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const authSubmitHandler = (email, password) => {
    setIsLoading(true);

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:${
        login ? "signInWithPassword" : "signUp"
      }?key=AIzaSyDwcWLg1dyNAFokhuFyPXQfHB2_ZDqkwSQ`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
        navigate(location.key === "default" ? "../" : -1);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <AuthForm
      onSubmit={authSubmitHandler}
      login={login}
      setLogin={setLogin}
      isLoading={isLoading}
    />
  );
};

export default Auth;
