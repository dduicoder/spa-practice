import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

import classes from "./QuoteItem.module.css";

const QuoteItem = ({ quote }) => {
  return (
    <li className={`card ${classes.item}`}>
      <figure>
        <blockquote>
          {quote.text.length > 125
            ? quote.text.substr(0, 125) + "..."
            : quote.text}
        </blockquote>
        <figcaption>{quote.author}</figcaption>
        <span>
          <FontAwesomeIcon icon={faThumbsUp} /> {quote.like} •{" "}
          <FontAwesomeIcon icon={faEye} /> {quote.view} •{" "}
          <FontAwesomeIcon icon={faComment} /> {quote.comments}
        </span>
      </figure>
      <Link className="btn" to={`../quotes/${quote.id}`}>
        View
      </Link>
    </li>
  );
};

export default QuoteItem;
