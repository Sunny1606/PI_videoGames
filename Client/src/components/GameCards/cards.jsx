import styles from "./cards.module.css"; 
import Card from "../GameCard/card";

export default function Cards({ videogames, onClose }) {
  return (
    <div className={styles.container}>
      {videogames.map((videogame) => (
        <Card
          key={videogame.id}
          id={videogame.id}
          name={videogame.name}
          description={videogame.description}
          platform={videogame.platform}
          image={videogame.image}
          date={videogame.date}
          rating={videogame.rating}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
