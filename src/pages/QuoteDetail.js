import { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuotes,
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
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuotes.text) {
    return (
      <p className="centered" style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Quote empty
      </p>
    );
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <Routes>
        <Route
          path={"/comments"}
          element={createPortal(
            <Fragment>
              <div
                className="backdrop"
                onClick={() => {
                  navigate("");
                }}
              ></div>
              <Comments />
            </Fragment>,
            document.getElementById("overlays")
          )}
        />
      </Routes>
    </Fragment>
  );
};

export default QuoteDetail;
