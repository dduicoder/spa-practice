import { useContext } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import AuthContext from "../../store/auth-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import classes from "./SideNavigation.module.css";

const SideNavigation = (props) => {
  const authCtx = useContext(AuthContext);

  const { close } = props;

  return createPortal(
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={{ enter: 250, exit: 250 }}
      classNames={{
        enterActive: classes.open,
        exitActive: classes.close,
      }}
    >
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
              close();
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
    </CSSTransition>,
    document.getElementById("overlays")
  );
};

export default SideNavigation;
