import { useRef, useState, useEffect } from "react";

import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import classes from "./NewCommentForm.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const [textValid, setTextValid] = useState(true);

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const text = commentTextRef.current.value;

    if (text.trim().length === 0) {
      setTextValid(false);
      return;
    }

    sendRequest({
      commentData: { text },
      quoteId: props.quoteId,
      comments: props.comments,
    });

    commentTextRef.current.value = "";
  };

  const textBlurHandler = (event) => {
    if (event.target.value.trim().length !== 0) {
      setTextValid(true);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="5"
          ref={commentTextRef}
          className={textValid ? "" : classes.invalid}
          onBlur={textBlurHandler}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
