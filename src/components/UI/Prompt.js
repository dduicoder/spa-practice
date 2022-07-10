import { createPortal } from "react-dom";
import CSSTransition from "react-transition-group/CSSTransition";

import classes from "./Prompt.module.css";

const Prompt = (props) => {
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
      <div className={classes.prompt} onClick={props.close}>
        {props.children}
      </div>
    </CSSTransition>,
    document.getElementById("overlays")
  );
};

export default Prompt;
