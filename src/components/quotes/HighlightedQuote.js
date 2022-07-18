import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addQuoteView, setQuoteLike } from "../../lib/api";
import AuthContext from "../../store/auth-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as emptyLike } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

import Prompt from "../UI/Prompt";
import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  const { quote } = props;

  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(quote.like);
  const [showPrompt, setShowPrompt] = useState(false);

  const authCtx = useContext(AuthContext);

  const { sendRequest: sendView } = useHttp(addQuoteView);
  const { sendRequest: sendLike } = useHttp(setQuoteLike);

  useEffect(() => {
    sendView({ quoteId: quote.id, view: quote.view });
  }, [sendView, quote]);

  const likeHandler = () => {
    if (!authCtx.loggedIn) {
      setShowPrompt(true);
      return;
    }

    const newLike = like ? quote.like : quote.like + 1;

    sendLike({ quoteId: quote.id, like: newLike });
    setLikes(newLike);
    setLike(!like);
  };

  return (
    <section className={classes.quote}>
      <Prompt
        show={showPrompt}
        close={() => {
          setShowPrompt(false);
        }}
      >
        Please log in to like a quote <Link to="../auth">Log in</Link>
      </Prompt>
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
          {like ? (
            <FontAwesomeIcon icon={faThumbsUp} />
          ) : (
            <FontAwesomeIcon icon={emptyLike} />
          )}
        </span>
        <span>
          {quote.view + 1} <FontAwesomeIcon icon={faEye} />
        </span>
      </div>
      <button className="btn" onClick={props.open}>
        Comments
      </button>
    </section>
  );
};

export default HighlightedQuote;
