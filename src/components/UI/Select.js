import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./Select.module.css";

const Select = (props) => {
  const [showSelect, setShowSelect] = useState(false);
  const wrapperRef = useRef();

  document.addEventListener("mousedown", (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowSelect(false);
    }
  });

  return (
    <div ref={wrapperRef} className={classes.select}>
      <button className="btn" onClick={() => setShowSelect(!showSelect)}>
        {props.text} {props.value}
      </button>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showSelect}
        timeout={{ enter: 250, exit: 250 }}
        classNames={{
          enterActive: classes.open,
          exitActive: classes.close,
        }}
      >
        <ul>
          {props.list.map((value) => (
            <li
              className={value === props.value ? classes.current : ""}
              key={value}
              onClick={() => {
                props.setValue(value);
                setShowSelect(false);
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};

export default Select;
