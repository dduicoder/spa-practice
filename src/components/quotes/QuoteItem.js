import { Link } from "react-router-dom";
import classes from "./QuoteItem.module.css";

const QuoteItem = (props) => {
  return (
    <li className={`card ${classes.item}`}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link className="btn" to={`/quotes/${props.id}`}>
        View
      </Link>
    </li>
  );
};

export default QuoteItem;
