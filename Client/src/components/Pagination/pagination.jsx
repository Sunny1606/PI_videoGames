import styles from "./paginado.module.css";

// eslint-disable-next-line react/prop-types
function Paginado({ gamesPerPage, fullGames, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(fullGames / gamesPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className={styles.conteinerPag}>
        {pageNumber?.map((number) => {
          return (
            <li className="number" key={number}>
              <a onClick={() => paginado(number)} href="#">
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Paginado;
