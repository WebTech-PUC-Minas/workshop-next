import Image from "next/image";
import styles from "./DetailedMovie.module.css";

function DetailedMovie({ banner, title, date, overview, vote_average }) {
  return (
    <div className="container">
      {banner || title || date || overview || vote_average ? (
        <div className={styles.wrapper}>
          {banner && (
            <Image className={styles.image}
              src={`https://image.tmdb.org/t/p/w500${banner}`}
              alt={title}
              width={200}
              height={300}
            />
          )}

          <div className={styles.details}>
            <h1 className={styles.title}>{title}</h1>
            <div>
              <div className={styles.releaseDate}>
                Data de Lançamento: {date}
              </div>
              <div className={styles.voteAverage}>
                Avaliação: {vote_average}
              </div>
              <p className={styles.overview}>Descrição: <br /> {overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Detalhes do filme não encontrados.</p>
      )}
    </div>
  );
}

export default DetailedMovie;
