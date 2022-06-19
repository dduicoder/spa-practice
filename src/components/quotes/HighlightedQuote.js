import classes from "./HighlightedQuote.module.css";
import copy from "./copy.png";
import { useState } from "react";

const HighlightedQuote = (props) => {
  const [click, setClick] = useState(false);

  const copyHandler = () => {
    setClick(true);
    navigator.clipboard.writeText(`${props.text} - ${props.author}`);
    setTimeout(() => {
      setClick(false);
    }, 200);
  };

  return (
    <figure className={classes.quote}>
      <p>"</p>
      <p className={classes.text}>{props.text}</p>
      <p>"</p>
      <figcaption>- {props.author} -</figcaption>
      <img
        className={`${classes.copy} ${click ? classes.click : undefined}`}
        src={copy}
        alt="copy"
        width="24"
        height="24"
        onClick={copyHandler}
      />
    </figure>
  );
};

export default HighlightedQuote;
