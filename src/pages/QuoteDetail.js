import { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const history = useHistory();

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

  const backdropClickHandler = () => {
    history.push(match.url);
  };

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <div className="centered">
        <Link className="btn" to={`${match.url}/comments`}>
          Load Comments
        </Link>
      </div>
      <Route path={`${match.path}/comments`}>
        {createPortal(
          <Fragment>
            <div className="backdrop" onClick={backdropClickHandler}></div>
            <Comments />
          </Fragment>,
          document.getElementById("overlays")
        )}
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
