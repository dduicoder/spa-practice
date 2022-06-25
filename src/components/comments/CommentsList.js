import { Fragment, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "./CommentsList.module.css";
import CommentItem from "./CommentItem";
import Pagination from "../layout/Pagination";

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

  return (
    <Fragment>
      <ul className={classes.comments}>
        {props.comments.slice(offset, offset + limit).map((comment) => (
          <CommentItem key={comment.id} text={comment.text} />
        ))}
      </ul>
      <Pagination
        total={props.comments.length}
        limit={limit}
        page={page}
        setPage={(newPage) =>
          navigate({
            pathname: location.pathname,
            search: `page=${newPage}`,
          })
        }
      />
    </Fragment>
  );
};

export default CommentsList;
