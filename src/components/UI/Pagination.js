import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import classes from "./Pagination.module.css";

const Pagination = ({ total, limit, page, setPage }) => {
  if (total === 0 || limit === 0) {
    return;
  }

  const numPages = Math.ceil(total / limit);

  return (
    <footer className={`centered ${classes.footer}`}>
      {page !== 1 && (
        <FontAwesomeIcon onClick={() => setPage(page - 1)} icon={faArrowLeft} />
      )}
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "" : classes.incurrent}
          >
            {i + 1}
          </button>
        ))}
      {page !== numPages && (
        <FontAwesomeIcon
          onClick={() => setPage(page + 1)}
          icon={faArrowRight}
        />
      )}
    </footer>
  );
};

export default Pagination;
