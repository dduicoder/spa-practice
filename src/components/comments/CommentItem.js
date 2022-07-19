import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { setCommentLike, setCommentDislike } from "../../lib/api";
import AuthContext from "../../store/auth-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown as emptyDisLike } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as emptyLike } from "@fortawesome/free-regular-svg-icons";

import Prompt from "../UI/Prompt";
import classes from "./CommentItem.module.css";

const CommentItem = ({ comment, quoteId }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likes, setLikes] = useState(comment.like);
  const [dislikes, setDislikes] = useState(comment.dislike);
  const [showMore, setShowMore] = useState(comment.text.length > 150);
  const [showPrompt, setShowPrompt] = useState(false);

  const authCtx = useContext(AuthContext);

  const { sendRequest: sendLike } = useHttp(setCommentLike);
  const { sendRequest: sendDislike } = useHttp(setCommentDislike);

  const likeHandler = () => {
    if (!authCtx.loggedIn) {
      setShowPrompt(true);
      return;
    }

    const newLike = like ? comment.like : comment.like + 1;

    sendLike({ quoteId, commentId: comment.id, like: newLike });
    setLikes(newLike);
    setLike(!like);
  };

  const dislikeHandler = () => {
    if (!authCtx.loggedIn) {
      setShowPrompt(true);
      return;
    }

    const newDislike = dislike ? comment.dislike : comment.dislike + 1;

    sendDislike({ quoteId, commentId: comment.id, dislike: newDislike });
    setDislikes(newDislike);
    setDislike(!dislike);
  };

  return (
    <li className={classes.item}>
      <Prompt
        show={showPrompt}
        close={() => {
          setShowPrompt(false);
        }}
      >
        Please log in to rate a comment <Link to="../auth">Log in</Link>
      </Prompt>
      {showMore ? comment.text.substr(0, 150) + "..." : comment.text}
      {comment.text.length > 150 && (
        <button onClick={() => setShowMore(!showMore)} className={classes.see}>
          see {showMore ? "more" : "less"}
        </button>
      )}
      <div className={classes.control}>
        <span onClick={likeHandler}>
          {likes}
          <FontAwesomeIcon icon={like ? faThumbsUp : emptyLike} />
        </span>
        <span onClick={dislikeHandler}>
          {dislikes}
          <FontAwesomeIcon icon={dislike ? faThumbsDown : emptyDisLike} />
        </span>
      </div>
    </li>
  );
};

export default CommentItem;
