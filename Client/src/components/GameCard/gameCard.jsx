
// //solo renderiza un juego individual y proporciona un enlace a la ruta /detail 


// import { Link } from 'react-router-dom';
// import PATHROUTES from '../Helpers/pathRoutes';
// import styles from './gameCard.module.css';

// // eslint-disable-next-line react/prop-types
// const GameCard = ({ games }) => {
//   return (
//     <div className={styles.card} key={games?.id}>
//       <div className={styles.imageBox}>
//         <Link to={PATHROUTES.DETAIL}>
//           <img src={games?.image} alt={games?.name} className={styles.image} />
//         </Link>
//       </div>
//       <div className={styles.container2}>
//         <h2>{games?.name}</h2>
//         <p>{games?.genres.join(', ')}</p>
//       </div>
//     </div>
//   );
// };

// export default GameCard;
