import { useHistory } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";

const NewQuotes = () => {
  const history = useHistory();

  const addQuotehandler = (QuoteData) => {
    console.log(QuoteData);

    history.push("/quotes");
  };

  return <QuoteForm onAddQuote={addQuotehandler} />;
};

export default NewQuotes;
