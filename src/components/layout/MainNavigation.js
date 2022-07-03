import { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

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
      <h1 className={classes.logo}>Quotes</h1>
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
      </div>
    </header>
  );
};

export default MainNavigation;
