import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchByName } from "../../redux/actions";

const SearchBar = () => {
  const [game, setGame] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setGame(event.target.value);
  };

  const dispatchGame = (event) => {
    event.preventDefault();
    dispatch(searchByName(game));
    setGame('');
  };

  return (
    <div className={style.container}>
      <form>
        <input
          type="text"
          placeholder="Name videogame"
          onChange={handleChange}
          value={game}
          className={style.input}
        />
        <button
          className={style.button}
          onClick={(event) => dispatchGame(event)}
        >
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
