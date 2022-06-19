import { Fragment } from "react";
import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [authorValid, setAuthorValid] = useState(true);
  const [textValid, setTextValid] = useState(true);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    setAuthorValid(enteredAuthor.trim().length !== 0);
    setTextValid(enteredText.trim().length !== 0);

    if (enteredAuthor.trim().length === 0 || enteredText.trim().length === 0) {
      return;
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formFocusHandler = () => {
    setIsEntering(true);
  };

  const btnClickHandler = () => {
    setIsEntering(false);
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
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All your entered data will be lost."
        }
      />
      <form
        onFocus={formFocusHandler}
        className={`card ${classes.form}`}
        onSubmit={submitFormHandler}
      >
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
          <button onClick={btnClickHandler} className="btn">
            Add Quote
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default QuoteForm;
