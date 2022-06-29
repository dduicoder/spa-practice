import classes from "./HighlightedQuote.module.css";
import copy from "./copy.png";
import { useState } from "react";
import { Link } from "react-router-dom";

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
      <div className={`${classes.copy} ${click ? classes.click : ""}`}>
        <img src={copy} alt="copy" onClick={copyHandler} />
      </div>
      <Link className="btn" to="comments">
        Comments
      </Link>
    </figure>
  );
};

export default HighlightedQuote;
