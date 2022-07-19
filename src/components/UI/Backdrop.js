import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./Backdrop.module.css";

const Backdrop = ({ show, close }) => {
  return createPortal(
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={{ enter: 250, exit: 250 }}
      classNames={{
        enterActive: classes.open,
        exitActive: classes.close,
      }}
    >
      <div className={classes.backdrop} onClick={close} />
    </CSSTransition>,
    document.getElementById("overlays")
  );
};

export default Backdrop;
