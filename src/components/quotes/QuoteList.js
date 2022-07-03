import { Fragment, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import Pagination from "../layout/Pagination";
import Select from "../layout/Select";
import classes from "./QuoteList.module.css";

const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.search === "") {
      navigate({
        pathname: location.pathname,
        search: "page=1&limit=10&sort=view",
      });
    }
  }, [location, navigate]);

  const sort = new URLSearchParams(location.search).get("sort");
  const page = Number(new URLSearchParams(location.search).get("page"));
  const limit = Number(new URLSearchParams(location.search).get("limit"));

  let sortedQuotes;
  const offset = (page - 1) * limit;

  if (sort === "new") {
    sortedQuotes = props.quotes.sort((quoteA, quoteB) => {
      return quoteA.id < quoteB.id ? 1 : -1;
    });
  } else if (sort === "view") {
    sortedQuotes = props.quotes.sort((quoteA, quoteB) => {
      if (quoteA.view === quoteB.view) {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
      return quoteA.view < quoteB.view ? 1 : -1;
    });
  } else if (sort === "like") {
    sortedQuotes = props.quotes.sort((quoteA, quoteB) => {
      if (quoteA.like === quoteB.like) {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
      return quoteA.like < quoteB.like ? 1 : -1;
    });
  } else {
    return <p className="centered">Wrong Page</p>;
  }

  const setPage = (newPage) => {
    navigate({
      pathname: location.pathname,
      search: `page=${newPage}&limit=${limit}&sort=${sort}`,
    });
  };

  const setSort = (newSort) => {
    navigate({
      pathname: location.pathname,
      search: `page=${page}&limit=${limit}&sort=${newSort}`,
    });
  };

  const setLimit = (newLimit) => {
    navigate({
      pathname: location.pathname,
      search: `page=${page}&limit=${newLimit}&sort=${sort}`,
    });
  };

  if (props.quotes.length < offset || page === 0 || limit === 0) {
    return <p className="centered">Wrong Page</p>;
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
          text="Quotes per page :"
        />
      </div>
      <ul className={classes.list}>
        {sortedQuotes.slice(offset, offset + limit).map((quote) => (
          <QuoteItem key={quote.id} quote={quote} />
        ))}
      </ul>
      <Pagination
        total={sortedQuotes.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </Fragment>
  );
};

export default QuoteList;
