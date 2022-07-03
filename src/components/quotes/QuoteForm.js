import { Fragment } from "react";
import { useRef, useState } from "react";

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

    props.onAddQuote({
      author: enteredAuthor,
      text: enteredText,
      like: 0,
      view: 0,
      comments: 0,
    });
  };

  const authorBlurHandler = (event) => {
    if (event.target.value.trim().length !== 0) {
      setAuthorValid(true);
    }
  };

  const textBlurHandler = (event) => {
    if (event.target.value.trim().length !== 0) {
      setTextValid(true);
    }
  };

  return (
    <Fragment>
      <form className={`card ${classes.form}`} onSubmit={submitFormHandler}>
        <div
          className={`${classes.control} ${authorValid ? "" : classes.invalid}`}
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
          className={`${classes.control} ${textValid ? "" : classes.invalid}`}
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
