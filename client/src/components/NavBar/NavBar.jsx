import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import style from "./NavBar.module.css";
import {
  filterByOrigin,
  filterByGenre,
  filterByOrder,
  filterByRating,
} from "../../redux/actions";

const NavBar = () => {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  const handleFilterOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };

  const handleFilterGenres = (event) => {
    event.preventDefault();
    dispatch(filterByGenre(event.target.value));
  };

  const handlerByOrder = (event) => {
    event.preventDefault();
    dispatch(filterByOrder(event.target.value));
  };

  const handlerOrderRating = (event) => {
    event.preventDefault();
    dispatch(filterByRating(event.target.value));
  };

  return (
    <nav className={style.nav}>
      <div className={style.mainContainer}>
        <Link to="/">
          <button className={style.buttonLink}>LOGOUT</button>
        </Link>
        <Link to="/create">
          <button className={style.buttonLink}>CREATE VIDEOGAME</button>
        </Link>
        <Link to="/about">
          <button className={style.buttonLink}>ABOUT</button>
        </Link>

        <div>
          <button
            className={style.buttonLink}
            onClick={() => {
              window.location.reload();
            }}
          >
            RESET
          </button>

          <select
            defaultValue="0"
            name=""
            id="orderByOrigin"
            className={style.select}
            onChange={(event) => {
              handleFilterOrigin(event);
            }}
          >
            <option disabled value="0">
              Order by Origin
            </option>
            <option value="all">All Videogames</option>
            <option value="created">Created Videogames</option>
            <option value="api">API Videogames</option>
          </select>

          <select
            onChange={handleFilterGenres}
            defaultValue="0"
            className={style.select}
            id="2"
          >
            <option disabled value="0">
              FILTER BY GENRES
            </option>

            {genres.map((genre, index) => {
              return (
                <option key={index} value={genre}>
                  {genre}
                </option>
              );
            })}
          </select>

          <select
            onChange={(event) => {
              handlerByOrder(event);
            }}
            defaultValue="0"
            className={style.select}
            id="3"
          >
            <option disabled value="0">
              ORDER BY NAME
            </option>
            <option value="a-z">Name (A-Z)</option>t
            <option value="z-a">Name (Z-A)</option>t
          </select>

          <select
            onChange={(event) => {
              handlerOrderRating(event);
            }}
            defaultValue="0"
            className={style.select}
            id="4"
          >
            <option disabled value="0">
              ORDER BY RATING
            </option>
            <option value="9-1">Highest Rating</option>
            <option value="1-9">Lowest Rating</option>
          </select>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
