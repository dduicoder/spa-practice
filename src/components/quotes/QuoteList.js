import { Fragment, useEffect, useState, useRef } from "react";
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
  const [showSelect, setShowSelect] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSelect(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef();
  useOutsideAlerter(wrapperRef);

  const sortAsc = new URLSearchParams(location.search).get("sort") === "asc";
  const page = Number(new URLSearchParams(location.search).get("page"));
  const limit = Number(new URLSearchParams(location.search).get("limit"));

  const sortedQuotes = sortQuotes(props.quotes, sortAsc);
  const offset = (page - 1) * limit;

  useEffect(() => {
    if (location.search === "") {
      navigate({
        pathname: location.pathname,
        search: "page=1&limit=10&sort=asc",
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

  if (props.quotes.length < offset || page === 0 || limit === 0) {
    return (
      <div
        className="centered"
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        Wrong Page
        <button
          className="btn"
          onClick={() => {
            navigate({
              pathname: location.pathname,
              search: "page=1&limit=10&sort=asc",
            });
          }}
        >
          Page 1
        </button>
      </div>
    );
  }

  const limits = [5, 10, 25, 50];

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler} className="btn">
          Sort {sortAsc ? "Decending" : "Ascending"}
        </button>
        <div ref={wrapperRef} className={classes.select}>
          <button className="btn" onClick={() => setShowSelect(!showSelect)}>
            Quotes per page : {limit}
          </button>
          {showSelect && (
            <ul>
              {limits.map((val) => (
                <li
                  key={val}
                  value={val}
                  onClick={() => {
                    setLimit(val);
                    setShowSelect(false);
                  }}
                >
                  {val}
                </li>
              ))}
            </ul>
          )}
        </div>
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
