import { Fragment } from "react";
import { Route, useParams, Link } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "Dalai Lama",
    text: "The purpose of our lives is to be happy.",
  },
  {
    id: "q2",
    author: "John Lennon",
    text: "Life is what happens when you’re busy making other plans.",
  },
  {
    id: "q3",
    author: "Stephen King",
    text: "Get busy living or get busy dying.",
  },
  {
    id: "q4",
    author: "Mae West",
    text: "You only live once, but if you do it right, once is enough.",
  },
  {
    id: "q5",
    author: "Thomas A. Edison",
    text: "Many of life’s failures are people who did not realize how close they were to success when they gave up.",
  },
];

const QuoteDetail = () => {
  const params = useParams();

  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if (!quote) {
    return <p>No</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link className="btn" to={`/quotes/${params.quoteId}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
