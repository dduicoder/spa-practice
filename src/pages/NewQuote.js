import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuotes = () => {
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

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuotehandler} />
  );
};

export default NewQuotes;
