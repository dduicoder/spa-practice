import { Fragment } from "react";
import { useRef, useState } from "react";

import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [authorValid, setAuthorValid] = useState(true);
  const [textValid, setTextValid] = useState(true);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    setAuthorValid(enteredAuthor.trim().length !== 0);
    setTextValid(enteredText.trim().length !== 0);

    if (enteredAuthor.trim().length === 0 || enteredText.trim().length === 0) {
      return;
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  };

  const authorBlurHandler = (event) => {
    if (event.target.value.trim().length === 0) {
      setAuthorValid(false);
    } else {
      setAuthorValid(true);
    }
  };

  const textBlurHandler = (event) => {
    if (event.target.value.trim().length === 0) {
      setTextValid(false);
    } else {
      setTextValid(true);
    }
  };

  return (
    <Fragment>
      <form className={`card ${classes.form}`} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
        <div
          className={`${classes.control} ${
            authorValid ? undefined : classes.invalid
          }`}
        >
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            ref={authorInputRef}
            onBlur={authorBlurHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            textValid ? undefined : classes.invalid
          }`}
        >
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            rows="5"
            ref={textInputRef}
            onBlur={textBlurHandler}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button className="btn">Add Quote</button>
        </div>
      </form>
    </Fragment>
  );
};

export default QuoteForm;
