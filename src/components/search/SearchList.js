import { Fragment, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

import QuoteItem from "../quotes/QuoteItem";
import Select from "../UI/Select";
import Pagination from "../UI/Pagination";

import classes from "./SearchList.module.css";

const SearchList = (props) => {
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("text");
  const [page, setPage] = useState(1);

  const limit = 10;

  const offset = (page - 1) * limit;

  const options = ["text", "author"];

  let sortedQuotes;

  if (searchOption === "text") {
    sortedQuotes = props.quotes.filter((quote) => {
      if (search === "") {
        return quote;
      } else if (quote.text.toLowerCase().includes(search.toLowerCase())) {
        return quote;
      }
      return null;
    });
  } else if (searchOption === "author") {
    sortedQuotes = props.quotes.filter((quote) => {
      if (search === "") {
        return quote;
      } else if (quote.author.toLowerCase().includes(search.toLowerCase())) {
        return quote;
      }
      return null;
    });
  } else {
    sortedQuotes = props.quotes;
  }

  const total = sortedQuotes.length;

  if (sortedQuotes.length === 0) {
    sortedQuotes = [
      <p key="p" style={{ textAlign: "center", margin: "1rem 0 0 0" }}>
        No Result
      </p>,
    ];
  } else {
    sortedQuotes = sortedQuotes
      .slice(offset, offset + limit)
      .map((quote) => <QuoteItem quote={quote} key={quote.id} />);
  }

  return (
    <Fragment>
      <div className={classes.control}>
        <input
          placeholder="Search..."
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select
          value={searchOption}
          setValue={setSearchOption}
          list={options}
          text={<FontAwesomeIcon icon={faSort} />}
        />
      </div>
      <ul className={classes.list}>{sortedQuotes}</ul>
      <Pagination total={total} limit={limit} page={page} setPage={setPage} />
    </Fragment>
  );
};

export default SearchList;
