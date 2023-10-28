import styles from "./cards.module.css"; 
import Card from "../GameCard/card";

export default function Cards({ videogames, onClose }) {
    return (
      <div className={styles.container}>
        {videogames.map((videogames) => {
          console.log(videogames);
          return (
            <Card
              key={videogames.id}
              id={videogames.id}
              name={videogames.name}
              description={videogames.description}
              platform={videogames.platform}
              image={videogames.image}
              date={videogames.date}
              rating={videogames.rating}
              onClose={onClose}
            />
          );
        })}
      </div>
    );
  }