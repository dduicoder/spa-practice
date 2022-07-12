import { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Backdrop from "../components/UI/Backdrop";

const QuoteDetail = () => {
  const [showComment, setShowComment] = useState(false);

  const params = useParams();

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p className="centered">Quote Empty</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote
        quote={loadedQuote}
        open={() => {
          setShowComment(true);
        }}
      />
      <Backdrop
        show={showComment}
        close={() => {
          setShowComment(false);
        }}
      />
      {createPortal(
        <Comments
          show={showComment}
          close={() => {
            setShowComment(false);
          }}
        />,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};

export default QuoteDetail;
