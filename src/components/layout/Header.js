import { useState, useContext, Fragment } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideNavigation from "./SideNavigation";
import AuthContext from "../../store/auth-context";
import classes from "./Header.module.css";

const MainHeader = () => {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [showSide, setShowSide] = useState(false);

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
      {showSide &&
        createPortal(
          <Fragment>
            <div
              className="backdrop"
              onClick={() => {
                setShowSide(false);
              }}
            />
            <SideNavigation
              onClick={() => {
                setShowSide(false);
              }}
            />
          </Fragment>,
          document.getElementById("overlays")
        )}
      <h1>Quotes</h1>
      <FontAwesomeIcon
        icon={faBars}
        className={classes.hamberger}
        onClick={() => {
          setShowSide(true);
        }}
      />
      <nav>
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
      </nav>
    </header>
  );
};

export default MainHeader;
