import QuoteList from "../components/quotes/QuoteList";

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

const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
