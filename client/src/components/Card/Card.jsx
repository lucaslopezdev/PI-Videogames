import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ name, genres, background_image, id, rating }) => {
  return (
    <Link className={style.link} to={`/detail/${id}`}>
      <div className={style.card}>
        <div className={style.poster}>
          <img className={style.img} src={background_image} alt={name} />
        </div>
        <div className={style.details}>
          <div className={style.box}>
            <h2 className={style.name}>{name}</h2>
          </div>
          <h2>GENRES: {genres.join(", ")}</h2>
          <h2>RATING: {rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Card;
