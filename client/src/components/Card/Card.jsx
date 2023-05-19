import style from './Card.module.css';
import { Link } from 'react-router-dom';

// Debe mostrar la info de cada usuario mapeado, pero ademas,
// darnos un link para ir al detalle del usuario en cuestion

const Card = ({name, genres, background_image, id, rating}) => {
 return(
  <div>
    <Link className={style.link} to={`/detail/${id}`}>
      <div className={style.container}>
        <img className={style.img} src={background_image} alt={name} />
        <h2>{name}</h2>
        <p><b>Genres:</b> {genres.join(", ")}</p>
        <p><b>Rating:</b> {rating}</p>
      </div>
    </Link>
  </div>
 ) 
}

export default Card;