import { Fragment, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import Pagination from "../layout/Pagination";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sortAsc = new URLSearchParams(location.search).get("sort") === "asc";
  const page = Number(new URLSearchParams(location.search).get("page"));
  const limit = Number(new URLSearchParams(location.search).get("limit"));

  const sortedQuotes = sortQuotes(props.quotes, sortAsc);
  const offset = (page - 1) * limit;

  useEffect(() => {
    if (location.search === "") {
      navigate({
        pathname: location.pathname,
        search: "page=1&limit=5&sort=asc",
      });
    }
  }, [location, navigate]);

  const changeSortHandler = () => {
    navigate({
      pathname: location.pathname,
      search: `page=${page}&limit=${limit}&sort=${sortAsc ? "desc" : "asc"}`,
    });
  };

  const setPage = (newPage) => {
    navigate({
      pathname: location.pathname,
      search: `page=${newPage}&limit=${limit}&sort=${sortAsc ? "asc" : "desc"}`,
    });
  };

  const setLimit = (newLimit) => {
    navigate({
      pathname: location.pathname,
      search: `page=${page}&limit=${newLimit}&sort=${sortAsc ? "asc" : "desc"}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler} className="btn">
          Sort {sortAsc ? "Decending" : "Ascending"}
        </button>
        <label className={classes.select}>
          Quotes per page : &nbsp;
          <select
            type="number"
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.slice(offset, offset + limit).map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
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
