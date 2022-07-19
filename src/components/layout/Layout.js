import { Fragment } from "react";

import Header from "./Header";
import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main className={classes.main}>{children}</main>
    </Fragment>
  );
};

export default Layout;
