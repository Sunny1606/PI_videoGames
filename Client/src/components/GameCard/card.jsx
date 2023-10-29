import styles from "./card.module.css"; // Asegúrate de importar los estilos

const Card = (props) => {
  const { id, name, description, platform, image, date, rating, onClose } =
    props;
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Platform: {platform}</p>
        <p>Date: {date}</p>
        <p>Rating: {rating}</p>
        <button onClick={() => onClose(id)}>Close</button>
      </div>
    </div>
  );
};

export default Card;
