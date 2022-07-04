import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regHeart } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

import useHttp from "../../hooks/use-http";
import { addView, setLike } from "../../lib/api";
import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  const quote = props.quote;

  const [click, setClick] = useState(false);
  const [likes, setLikes] = useState(quote.like);

  const { sendRequest: sendView } = useHttp(addView);
  const { sendRequest: sendLike } = useHttp(setLike);

  useEffect(() => {
    sendView({ quoteId: quote.id, view: quote.view });
  }, [sendView, quote]);

  const likeHandler = () => {
    if (!click) {
      sendLike({ quoteId: quote.id, like: quote.like + 1 });
      setLikes(quote.like + 1);
    } else {
      sendLike({ quoteId: quote.id, like: quote.like });
      setLikes(quote.like);
    }
    setClick(!click);
  };

  return (
    <section className={classes.quote}>
      <div className={classes.select}>
        <p>"</p>
        <p className={classes.text}>{quote.text}</p>
        <p>"</p>
      </div>
      <p className={classes.author}>- {quote.author} -</p>
      <div className={classes.control}>
        <FontAwesomeIcon
          onClick={() =>
            navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`)
          }
          icon={faClipboard}
        />
        <span onClick={likeHandler}>
          {likes}{" "}
          {click ? (
            <FontAwesomeIcon icon={faHeart} />
          ) : (
            <FontAwesomeIcon icon={regHeart} />
          )}
        </span>
        <span>
          {quote.view + 1} <FontAwesomeIcon icon={faEye} />
        </span>
      </div>
      <Link className="btn" to="comments">
        Comments ({quote.comments})
      </Link>
    </section>
  );
};

export default HighlightedQuote;
