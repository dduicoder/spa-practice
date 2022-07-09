import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const authCtx = useContext(AuthContext);

  window.onscroll = () => {
    if (document.documentElement.scrollTop > lastScroll) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScroll(document.documentElement.scrollTop);
  };

  return (
    <header className={classes.header} style={{ top: show ? "0" : "-4rem" }}>
      <h1>Quotes</h1>
      <div>
        <NavLink
          to="quotes"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          All Quotes
        </NavLink>
        <NavLink
          to="new-quote"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          Add Quote
        </NavLink>
        {authCtx.loggedIn ? (
          <button
            className={classes.btn}
            onClick={() => {
              authCtx.logout();
            }}
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="auth"
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default MainNavigation;
