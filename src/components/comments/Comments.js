import { useState, useEffect, useCallback, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { getAllComments } from "../../lib/api";
import AuthContext from "../../store/auth-context";

import NewCommentForm from "./CommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import Prompt from "../UI/Prompt";
import Select from "../UI/Select";
import CommentsList from "./CommentsList";
import useHttp from "../../hooks/use-http";
import classes from "./Comments.module.css";

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [sort, setSort] = useState("like");
  const params = useParams();

  const AuthCtx = useContext(AuthContext);

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
    setIsAddingComment(false);
  }, [sendRequest, quoteId]);

  const setCommentFormHandler = () => {
    if (!AuthCtx.loggedIn) {
      setShowPrompt(true);
      return;
    }
    setIsAddingComment(true);
  };

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  } else if (
    status === "completed" &&
    loadedComments &&
    loadedComments.length > 0
  ) {
    comments = (
      <CommentsList comments={loadedComments} quoteId={quoteId} sort={sort} />
    );
  } else if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">- No Comments -</p>;
  }

  const sorts = ["like", "new", "old"];

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={{ enter: 250, exit: 250 }}
      classNames={{
        enterActive: classes.open,
        exitActive: classes.close,
      }}
    >
      <section className={`card ${classes.comments}`}>
        <Prompt
          show={showPrompt}
          close={() => {
            setShowPrompt(false);
          }}
        >
          Please log in to leave a comment <Link to="../../auth">Log in</Link>
        </Prompt>
        <div className={classes.control}>
          <Select
            value={sort}
            setValue={(newSort) => setSort(newSort)}
            list={sorts}
            text="Sort"
          />
          <h2 className={classes.title}>
            Comments ({loadedComments ? loadedComments.length : 0})
          </h2>
          <h2 onClick={props.close}>X</h2>
        </div>
        {comments}
        {isAddingComment ? (
          <NewCommentForm
            quoteId={quoteId}
            onAddedComment={addCommentHandler}
            comments={loadedComments ? loadedComments.length : 0}
          />
        ) : (
          <button className="btn" onClick={setCommentFormHandler}>
            Leave Comment
          </button>
        )}
      </section>
    </CSSTransition>
  );
};

export default Comments;
