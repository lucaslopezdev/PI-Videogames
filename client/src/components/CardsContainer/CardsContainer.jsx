import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = ({ videogames }) => {
  return (
    <div className={style.container}>
      {videogames.map(({ name, genres, background_image, id, rating }) => {
        return (
          <Card
            key={id}
            background_image={background_image}
            name={name}
            genres={genres}
            id={id}
            rating={rating}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
