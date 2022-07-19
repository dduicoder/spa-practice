import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./Select.module.css";

const Select = ({ value, setValue, list, text }) => {
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
        {text} {value}
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
          {list.map((val) => (
            <li
              className={val === value ? classes.current : ""}
              key={val}
              onClick={() => {
                setValue(val);
                setShowSelect(false);
              }}
            >
              {val}
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};

export default Select;
