import { Link } from "react-router-dom";
import classes from "./QuoteItem.module.css";

const QuoteItem = (props) => {
  return (
    <li className={`card ${classes.item}`}>
      <figure>
        <blockquote>
          {props.text.length > 150
            ? props.text.substr(0, 150) + "..."
            : props.text}
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
