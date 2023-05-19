import Card from '../Card/Card';

// Este componente debe tomar un array de usuarios, y por cada usuario
// renderizar un componente Card

const CardsContainer = ({videogames}) => {
  return(
    <div>
      {videogames.map(({name, genres, background_image, id, rating})=> {
        return(
          <Card 
            id = {id}
            background_image = {background_image}
            name = {name}
            genres = {genres}
            rating = {rating}
          />
        )
      } )}
    </div>
  )
}

export default CardsContainer;