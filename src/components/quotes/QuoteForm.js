import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import Prompt from "../UI/Prompt";
import classes from "./QuoteForm.module.css";

const QuoteForm = ({ onAddQuote }) => {
  const [authorValid, setAuthorValid] = useState(true);
  const [textValid, setTextValid] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    setAuthorValid(enteredAuthor.trim().length !== 0);
    setTextValid(enteredText.trim().length !== 0);

    if (!authCtx.loggedIn) {
      setShowPrompt(true);
      return;
    }

    if (enteredAuthor.trim().length === 0 || enteredText.trim().length === 0) {
      return;
    }

    onAddQuote({
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
    <form className={`card ${classes.form}`} onSubmit={submitFormHandler}>
      <Prompt
        show={showPrompt}
        close={() => {
          setShowPrompt(false);
        }}
      >
        Please log in to post a quote <Link to="../auth">Log in</Link>
      </Prompt>
      <label htmlFor="author">Author</label>
      <input
        className={authorValid ? "" : classes.invalid}
        type="text"
        id="author"
        ref={authorInputRef}
        onBlur={authorBlurHandler}
      />
      <label htmlFor="text">Text</label>
      <textarea
        className={textValid ? "" : classes.invalid}
        id="text"
        rows="5"
        ref={textInputRef}
        onBlur={textBlurHandler}
      ></textarea>
      <div className={classes.actions}>
        <button className="btn">Add Quote</button>
      </div>
    </form>
  );
};

export default QuoteForm;
