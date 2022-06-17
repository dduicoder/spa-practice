import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  return (
    <figure className={classes.quote}>
      <p>"</p>
      <p className={classes.text}>{props.text}</p>
      <p>"</p>
      <figcaption>- {props.author} -</figcaption>
    </figure>
  );
};

export default HighlightedQuote;
