import { useState, useRef } from "react";
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
      {showSelect && (
        <ul>
          {props.list.map((value) => (
            <li
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
      )}
    </div>
  );
};

export default Select;
