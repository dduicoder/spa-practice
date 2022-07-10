import { Fragment, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import CommentItem from "./CommentItem";
import Pagination from "../UI/Pagination";
import classes from "./CommentsList.module.css";

const CommentsList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const limit = 10;

  const page = Number(new URLSearchParams(location.search).get("page"));
  const offset = (page - 1) * limit;

  useEffect(() => {
    if (location.search === "") {
      navigate({
        pathname: location.pathname,
        search: "page=1",
      });
    }
  }, [location, navigate]);

  const setNewPage = (newPage) => {
    navigate({
      pathname: location.pathname,
      search: `page=${newPage}`,
    });
  };

  return (
    <Fragment>
      {props.comments.length < offset ||
        (page === 0 && <p className="centered">Wrong Page</p>)}
      <ul className={classes.comments}>
        {props.comments.slice(offset, offset + limit).map((comment) => (
          <CommentItem key={comment.id} text={comment.text} />
        ))}
      </ul>
      <Pagination
        total={props.comments.length}
        limit={limit}
        page={page}
        setPage={setNewPage}
      />
    </Fragment>
  );
};

export default CommentsList;
