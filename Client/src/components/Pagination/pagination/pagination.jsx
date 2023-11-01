import styles from "./pagination.module.css";

export const Pagination = ({
  gamesForPage,
  currentPage,
  setCurrentPage,
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
  // const onSpecificPage = (n) => {
  //   setCurrentPage(n) 
  // }

  return (
    <nav
      className={styles.conteiner}
      role="navigation"
      aria-label="pagination"
    >
      <button className={styles.previus} onClick={onPreviusPage}>
        Previous
      </button>
      <button className={styles.next} onClick={onNextPage}>
        Next page
      </button>
      {/* <ul className={styles.ul}>
        {pageNumbers.map((noPage) => (
          <li key={noPage}>
            <a
              className={`"pagination-link" ${
                noPage === currentPage ? "is-current" : ""
              }}`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </a>
          </li>
        ))}
      </ul> */}
    </nav>
  );
};
