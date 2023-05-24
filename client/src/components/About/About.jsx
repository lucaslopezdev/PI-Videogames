import { Link } from "react-router-dom";
import style from "./About.module.css";
import Lucas from "./img/LucasLopez.jpg";
import linkedin from "./img/linkedin.png";
import github from "./img/github.png";
import instagram from "./img/instagram.png";

const About = () => {
  return (
    <div className={style.about}>
      <Link to="/home">
        <button className={style.button}>Home</button>
      </Link>
      <div className={style.container}>
        <h1 className={style.title}>About the Creator: </h1>
        <h2 className={style.subtitle}>Full Stack Developer in progress</h2>
        <div className={style.imagenContainer}>
          <a
            className="icon"
            href="https://www.github.com/lucaslopezdev/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={style.img}
              src={Lucas}
              alt="imagen de Lucas Lopez"
            />
          </a>
        </div>
        <div className={style.links}>
          <a
            className="icon"
            href="https://www.linkedin.com/in/lucaslopezdev/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.icon} src={linkedin} alt="linkedin"></img>
          </a>
          <a
            className="icon"
            href="https://github.com/lucaslopezdev/PI-Videogames"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.icon} src={github} alt="GitHub"></img>
          </a>
          <a
            className="icon"
            href="https://www.instagram.com/lucaslopez7_/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.icon} src={instagram} alt="Instagram"></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
