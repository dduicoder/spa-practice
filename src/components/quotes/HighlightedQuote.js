import classes from "./HighlightedQuote.module.css";
import copy from "./copy.png";
import { useState } from "react";

const HighlightedQuote = (props) => {
  const [click, setClick] = useState(false);

  const copyHandler = () => {
    setClick(true);
    navigator.clipboard.writeText(`"${props.text}" - ${props.author}`);
    setTimeout(() => {
      setClick(false);
    }, 500);
  };

  return (
    <figure className={classes.quote}>
      <p>"</p>
      <p className={classes.text}>{props.text}</p>
      <p>"</p>
      <figcaption>- {props.author} -</figcaption>
      <div className={`${classes.copy} ${click ? classes.click : undefined}`}>
        <img
          src={copy}
          alt="copy"
          width="30"
          height="30"
          onClick={copyHandler}
        />
      </div>
    </figure>
  );
};

export default HighlightedQuote;
