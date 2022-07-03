import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import classes from "./Comments.module.css";

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
    setIsAddingComment(false);
  }, [sendRequest, quoteId]);

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
      <h2>User Comments ({props.comments})</h2>
      {comments}
      {isAddingComment ? (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addCommentHandler}
          comments={loadedComments.length}
        />
      ) : (
        <button className="btn" onClick={() => setIsAddingComment(true)}>
          Add Comment
        </button>
      )}
    </section>
  );
};

export default Comments;
