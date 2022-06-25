import classes from "./Pagination.module.css";

const Pagination = ({ total, limit, page, setPage }) => {
  if (total === 0 || limit === 0) {
    return;
  }

  const numPages = Math.ceil(total / limit);

  return (
    <footer className={`centered ${classes.footer}`}>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? classes.current : classes.incurrent}
          >
            {i + 1}
          </button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </footer>
  );
};

export default Pagination;
