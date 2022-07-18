import { useRef, useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";

import classes from "./CommentForm.module.css";

const CommentForm = (props) => {
  const [textValid, setTextValid] = useState(true);

  const commentInputRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const text = commentInputRef.current.value;

    if (text.trim().length === 0) {
      setTextValid(false);
      return;
    }

    sendRequest({
      commentData: { text, like: 0, dislike: 0 },
      quoteId: props.quoteId,
      comments: props.comments,
    });

    commentInputRef.current.value = "";
  };

  const textBlurHandler = (event) => {
    if (event.target.value.trim().length !== 0) {
      setTextValid(true);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="5"
          ref={commentInputRef}
          className={textValid ? "" : classes.invalid}
          onBlur={textBlurHandler}
        ></textarea>
      </div>
      {status === "pending" ? (
        "Sending..."
      ) : (
        <button className="btn">Leave Comment</button>
      )}
    </form>
  );
};

export default CommentForm;
