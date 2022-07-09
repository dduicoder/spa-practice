import { createPortal } from "react-dom";

import classes from "./Prompt.module.css";

const Prompt = (props) => {
  return createPortal(
    <div className={classes.prompt} onClick={props.onClick}>
      {props.children}
    </div>,
    document.getElementById("overlays")
  );
};

export default Prompt;
