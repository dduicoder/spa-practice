import { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";

import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import Prompt from "../UI/Prompt";
import CommentsList from "./CommentsList";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import classes from "./Comments.module.css";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
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
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">- No Comments -</p>;
  }

  return (
    <section className={`card ${classes.comments}`}>
      {showPrompt && (
        <Prompt
          onClick={() => {
            setShowPrompt(false);
          }}
        >
          Please log in to right a comment
        </Prompt>
      )}
      <h2>Comments ({loadedComments ? loadedComments.length : 0})</h2>
      {comments}
      {isAddingComment ? (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addCommentHandler}
          comments={loadedComments ? loadedComments.length : 0}
        />
      ) : (
        <button className="btn" onClick={setCommentFormHandler}>
          Add Comment
        </button>
      )}
    </section>
  );
};

export default Comments;
