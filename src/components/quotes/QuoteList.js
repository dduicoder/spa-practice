import { Fragment, useState } from "react";

import QuoteItem from "./QuoteItem";
import Pagination from "../UI/Pagination";
import Select from "../UI/Select";
import classes from "./QuoteList.module.css";

const QuoteList = ({ quotes }) => {
  const [sort, setSort] = useState("view");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const offset = (page - 1) * limit;

  let sortedQuotes;

  if (sort === "new") {
    sortedQuotes = quotes.sort((quoteA, quoteB) => {
      return quoteA.id < quoteB.id ? 1 : -1;
    });
  } else if (sort === "view") {
    sortedQuotes = quotes.sort((quoteA, quoteB) => {
      if (quoteA.view === quoteB.view) {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
      return quoteA.view < quoteB.view ? 1 : -1;
    });
  } else if (sort === "like") {
    sortedQuotes = quotes.sort((quoteA, quoteB) => {
      if (quoteA.like === quoteB.like) {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
      return quoteA.like < quoteB.like ? 1 : -1;
    });
  }

  const total = sortedQuotes.length;

  if (total < offset) {
    sortedQuotes = (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>Wrong Page</p>
    );
  } else {
    sortedQuotes = sortedQuotes
      .slice(offset, offset + limit)
      .map((quote) => <QuoteItem key={quote.id} quote={quote} />);
  }

  const limits = [5, 10, 25, 50];
  const sorts = ["view", "like", "new"];

  return (
    <Fragment>
      <div className={classes.control}>
        <Select value={sort} setValue={setSort} list={sorts} text="Sort" />
        <Select
          value={limit}
          setValue={setLimit}
          list={limits}
          text="Quotes per page:"
        />
      </div>
      <ul className={classes.list}>{sortedQuotes}</ul>
      <Pagination total={total} limit={limit} page={page} setPage={setPage} />
    </Fragment>
  );
};

export default QuoteList;
