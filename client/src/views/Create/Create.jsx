import style from "./Create.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, createVideoGame } from "../../redux/actions";

const Create = () => {
  let platforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "GameCube",
    "Game Boy",
    "SNES",
    "NES",
    "Commodore",
    "Atari",
    "Genesis",
    "SEGA",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
    "PS5",
    "PS4",
    "PS3",
    "PS2",
    "PS1",
  ];

  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    background_image: "",
    description: "",
    rating: 0,
    released: "",
    genre: [],
    platforms: [],
  });

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  const [error, setErrors] = useState({
    name: "",
    background_image: "",
    description: "",
    released: "",
    rating: 0,
    genre: [],
    platforms: [],
  });

  // Validaciones

  const validate = (data) => {
    let errors = {};

    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else if (data.name.length > 35) {
      errors.name = "Cannot exceed 35 characters";
    } else errors.name = "";

    if (!data.background_image.trim()) {
      errors.background_image = "Image URL is required";
    } else errors.background_image = "";

    if (!data.description.trim()) {
      errors.description = "Description is required";
    } else if (data.description.length > 280) {
      errors.description = "Too many characters";
    } else errors.description = "";

    if (data.rating === 0) {
      errors.rating = "Rating up to 0 is required";
    } else errors.rating = "";

    if (!data.released.trim()) {
      errors.released = "Released data is required";
    } else errors.released = "";

    if (!data.genre.length) {
      errors.genre = "At least one genre is required";
    } else errors.genre = "";

    if (!data.platforms.length) {
      errors.platforms = "At least one platform is required";
    }
    errors.platforms = "";

    return errors;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      !error.name &&
      !error.background_image &&
      !error.description &&
      !error.rating &&
      !error.released &&
      !error.genre &&
      !error.platforms
    ) {
      dispatch(createVideoGame(form));
      alert("Videogame created successfully");

      setForm({
        name: "",
        background_image: "",
        description: "",
        released: "",
        rating: 0,
        genre: [],
        platforms: [],
      });
    }
  };

  //Funcion que modifica el estado
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  //Platforms
  const platformsHandler = (event) => {
    event.preventDefault();
    if (
      event.target.value &&
      event.target.value !==
        form.platforms.find((platform) => platform === event.target.value)
    ) {
      setForm({ ...form, platforms: [...form.platforms, event.target.value] });
    }
  };

  //Click de platforms
  const clickPlatformsHandler = (event) => {
    event.preventDefault();
    const platformsClick = form.platforms.filter(
      (platform) => platform !== event.target.value
    );
    setForm({ ...form, platforms: platformsClick });
  };

  //Genres
  const genresCheckHandler = (event) => {
    const genreValue = event.target.value;
    if (event.target.checked) {
      setForm({ ...form, genre: [...form.genre, genreValue] });
    } else {
      setForm({
        ...form,
        genre: form.genre.filter((genre) => genre !== genreValue),
      });
    }
  };

  //Rating
  const ratingHandler = (event) => {
    const value = parseFloat(event.target.value);
    setForm({ ...form, rating: value });
  };

  return (
    <div>
      <div className={style.create}>
        <Link to="/home">
          <button className={style.button}>Home</button>
        </Link>
      </div>

      <div className={style.form}>
        <form onSubmit={submitHandler}>
          <h1>Create your own Videogame</h1>
          <div>
            <label>Name: </label>
            <input
              type="text"
              className={style.inputs}
              value={form.name}
              onChange={changeHandler}
              name="name"
            />
            {error.name && <span className={style.error}>{error.name}</span>}
          </div>
          <div>
            <label>Image URL: </label>
            <input
              type="text"
              className={style.inputs}
              value={form.background_image}
              onChange={changeHandler}
              name="background_image"
            />
            {error.background_image && (
              <span className={style.error}>{error.background_image}</span>
            )}
          </div>
          <div>
            <label>Description: </label>
            <input
              type="text"
              className={style.inputs}
              value={form.description}
              onChange={changeHandler}
              name="description"
            />
            {error.description && (
              <span className={style.error}>{error.description}</span>
            )}
          </div>
          <div>
            <label>Rating: </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={ratingHandler}
              name="rating"
            />
            {error.rating && (
              <span className={style.error}>{error.rating}</span>
            )}
          </div>
          <div>
            <label>Released Date:</label>
            <input
              type="date"
              onChange={changeHandler}
              value={form.released}
              name="released"
            />
            {error.released && (
              <span className={style.error}>{error.released}</span>
            )}
          </div>
          <div>
            <label>Genres: </label>
            {error.genre && <span className={style.error}>{error.genre}</span>}
            <div className={style.genresContainer}>
              {genres.map((element) => {
                return (
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      onChange={genresCheckHandler}
                      value={element}
                      name="genres"
                    />
                    {element}{" "}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <select defaultValue="0" onChange={platformsHandler}>
              <option disabled value="0">
                Platforms
              </option>
              {platforms.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
            {error.platforms && (
              <span className={style.error}>{error.platforms}</span>
            )}
            <div className={style.patforms}>
              {form.platforms.map((element, index) => {
                return (
                  <button
                    className={style.button}
                    key={index}
                    value={element}
                    onClick={clickPlatformsHandler}
                  >
                    {element}
                  </button>
                );
              })}
            </div>
          </div>
          <button className={style.createButton} type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
