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
    <div>
      <button
        className={`pagination-previus ${
          currentPage === 1 ? "is-disabled" : ""
        }`}
        onClick={onPreviusPage}
      >
        Previous
      </button>
      <button
        className={`pagination-next ${
          currentPage >= pageNumbers.length ? "is-disabled" : ""
        }`}
        onClick={onNextPage}
      >
        Next page
      </button>
      <div className={styles.numbers}>
        {pageNumbers.map((noPage) => (
          <div key={noPage}>
            <button
              className={`"pagination-link" ${
                noPage === currentPage ? "is-current" : ""
              }}`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </button>
          </div>
        ))}
        
      </div>
    </div>
  );
};
