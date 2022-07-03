import { useEffect } from "react";
import { Link } from "react-router-dom";

import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return (
      <div className="centered" style={{ flexDirection: "column" }}>
        <p>No Quotes Found</p>
        <Link className="btn" to="/new-quote">
          Add a Quote
        </Link>
      </div>
    );
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
