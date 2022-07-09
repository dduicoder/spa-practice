import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../store/auth-context";
import classes from "./SideNavigation.module.css";

const SideNavigation = (props) => {
  const authCtx = useContext(AuthContext);

  const close = () => {
    props.onClick();
  };

  return (
    <nav className={classes.nav}>
      <p>Navigate</p>
      <NavLink
        to="quotes"
        className={({ isActive }) => (isActive ? classes.active : "")}
        onClick={close}
      >
        All Quotes
        <FontAwesomeIcon icon={faQuoteRight} />
      </NavLink>
      <NavLink
        to="new-quote"
        className={({ isActive }) => (isActive ? classes.active : "")}
        onClick={close}
      >
        Add Quote
        <FontAwesomeIcon icon={faPen} />
      </NavLink>
      {authCtx.loggedIn ? (
        <button
          onClick={() => {
            authCtx.logout();
            props.onClick();
          }}
        >
          Logout
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      ) : (
        <NavLink
          to="auth"
          className={({ isActive }) => (isActive ? classes.active : "")}
          onClick={close}
        >
          Login
          <FontAwesomeIcon icon={faArrowRightToBracket} />
        </NavLink>
      )}
    </nav>
  );
};

export default SideNavigation;
