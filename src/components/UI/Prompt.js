import { createPortal } from "react-dom";
import CSSTransition from "react-transition-group/CSSTransition";

import classes from "./Prompt.module.css";

const Prompt = ({ show, close, children }) => {
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
      <div className={classes.prompt} onClick={close}>
        {children}
      </div>
    </CSSTransition>,
    document.getElementById("overlays")
  );
};

export default Prompt;
