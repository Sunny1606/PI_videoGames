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
  const onSpecificPage = (n) => {
    setCurrentPage(n) 
  }

  return (
    <nav
      className="pagination is-centered mg-6"
      role="navigation"
      aria-label="pagination"
    >
      <a className="pagination-previous" onClick={onPreviusPage}>
        Previous
      </a>
      <a className="pagination-next" onClick={onNextPage}>
        Next page
      </a>
      <ul className="pagination-list">
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
      </ul>
    </nav>
  );
};
