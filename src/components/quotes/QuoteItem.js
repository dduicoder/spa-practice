import { Link } from "react-router-dom";
import classes from "./QuoteItem.module.css";

const QuoteItem = (props) => {
  const quote = props.quote;

  return (
    <li className={`card ${classes.item}`}>
      <figure>
        <blockquote>
          {quote.text.length > 150
            ? quote.text.substr(0, 150) + "..."
            : quote.text}
        </blockquote>
        <figcaption>{quote.author}</figcaption>
        <span>
          ❤️{quote.like} • 👁️‍🗨️{quote.view} • 💬{quote.comments}
        </span>
      </figure>
      <Link className="btn" to={`/quotes/${quote.id}`}>
        View
      </Link>
    </li>
  );
};

export default QuoteItem;
