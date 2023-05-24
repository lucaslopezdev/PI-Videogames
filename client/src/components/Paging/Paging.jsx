import style from "./Paging.module.css";

export const Paging = ({
  videogamesPerPages,
  videogames,
  paging,
  next,
  prev,
  currentPage,
}) => {
  const numberPage = [];

  for (let i = 0; i <= Math.floor(videogames / videogamesPerPages); i++) {
    numberPage.push(i + 1);
  }

  return (
    <nav>
      <div className={style.paging}>
        <button
          onClick={() => {
            prev();
          }}
          className={style.button}
        >
          Prev
        </button>
        {numberPage &&
          numberPage.map((number) => {
            return (
              <div className={style.div} key={number}>
                <button
                  onClick={() => paging(number)}
                  className={`${style.prueba} ${
                    currentPage === number
                      ? style.currentPage
                      : style.notCurrent
                  }`}
                >
                  {number}
                </button>
              </div>
            );
          })}
        <button
          onClick={() => {
            next();
          }}
          className={style.button}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Paging;
