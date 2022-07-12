import { Fragment, useState } from "react";

import CommentItem from "./CommentItem";
import Pagination from "../UI/Pagination";
import classes from "./CommentsList.module.css";

const CommentsList = (props) => {
  const [page, setPage] = useState(1);

  const limit = 10;

  const offset = (page - 1) * limit;

  let sortedComments;

  if (props.sort === "new") {
    sortedComments = props.comments.sort((commentA, commentB) => {
      return commentA.id < commentB.id ? 1 : -1;
    });
  } else if (props.sort === "old") {
    sortedComments = props.comments.sort((commentA, commentB) => {
      return commentA.id > commentB.id ? 1 : -1;
    });
  } else if (props.sort === "like") {
    sortedComments = props.comments.sort((commentA, commentB) => {
      if (commentA.like === commentB.like) {
        return commentA.id < commentB.id ? 1 : -1;
      }
      return commentA.like < commentB.like ? 1 : -1;
    });
  }

  return (
    <Fragment>
      <ul className={classes.comments}>
        {sortedComments.slice(offset, offset + limit).map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            quoteId={props.quoteId}
          />
        ))}
      </ul>
      <Pagination
        total={props.comments.length}
        limit={limit}
        page={page}
        setPage={(newPage) => {
          setPage(newPage);
        }}
      />
    </Fragment>
  );
};

export default CommentsList;
