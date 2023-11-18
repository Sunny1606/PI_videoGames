import styles from "./pagination.module.css";

export const Pagination = ({
  // eslint-disable-next-line react/prop-types
  gamesForPage,
  // eslint-disable-next-line react/prop-types
  currentPage,
  // eslint-disable-next-line react/prop-types
  setCurrentPage,
  // eslint-disable-next-line react/prop-types
  totalGames,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesForPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviusPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const onSpecificPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <div className={styles.paginationButtons}>
      <button
        className={`${styles.paginationButton} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={onPreviusPage}
      >
        Previous
      </button>

      <div className={styles.numbers}>
        {pageNumbers.map((noPage) => (
          <div key={noPage}>
            <button
              className={`${styles.paginationLink} ${
                noPage === currentPage ? styles.current : ""
              }`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </button>
          </div>
        ))}
      </div>
      <button
        className={`${styles.paginationButton} ${
          currentPage >= pageNumbers.length ? styles.disabled : ""
        }`}
        onClick={onNextPage}
      >
        Next
      </button>
    </div>
  );
};
