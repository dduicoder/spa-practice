import { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Backdrop from "../components/UI/Backdrop";

const QuoteDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

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
      <HighlightedQuote quote={loadedQuote} />
      <Routes>
        <Route
          path="/comments"
          element={
            <Fragment>
              <Backdrop
                show={true}
                close={() => {
                  navigate("");
                }}
              />
              {createPortal(<Comments />, document.getElementById("overlays"))}
            </Fragment>
          }
        />
      </Routes>
    </Fragment>
  );
};

export default QuoteDetail;
