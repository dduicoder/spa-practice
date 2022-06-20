import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>Quotes</h1>
      <div>
        <NavLink
          to="/quotes"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          All Quotes
        </NavLink>

        <NavLink
          to="/new-quote"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          Add A Quote
        </NavLink>
      </div>
    </header>
  );
};

export default MainNavigation;
