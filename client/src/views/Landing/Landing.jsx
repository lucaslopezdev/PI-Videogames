import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={`${style.landing} ${style["full-screen-bg"]}`}>
      <Link to="/home">
        <button className={style.button}>PRESS START</button>
      </Link>
    </div>
  );
};

export default Landing;
