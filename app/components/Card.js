import style from "./Card.module.css";

function Card({ banner, title, date }) {
  return (
    <div className={style.card}>
      <figure>
        <img src={banner} alt={title} />
      </figure>
      <article>
        <h1>{title}</h1>
        <div>
          <time>{date}</time>
          <img className={style.icon} src="icons/heart-solid.svg" alt="favorite icon" />
        </div>
      </article>
    </div>
  );
}

export default Card;