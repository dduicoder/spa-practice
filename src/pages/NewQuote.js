import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      navigate("../quotes");
    }
  }, [status, navigate]);

  const addQuotehandler = useCallback(
    (quoteData) => {
      sendRequest(quoteData);
    },
    [sendRequest]
  );

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return <QuoteForm onAddQuote={addQuotehandler} />;
};

export default NewQuote;
