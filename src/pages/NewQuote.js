import { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuotes = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("quotes");
    }
  }, [status, history]);

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
