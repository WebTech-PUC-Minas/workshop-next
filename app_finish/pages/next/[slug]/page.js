import Image from 'next/image';
import styles from './page.module.css';

export default async function MovieDetailsPage({ params }) {
  const movieId = params.slug;
  const apiKey = process.env.TMDB_API_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`
  );

  if (!res.ok) {
    throw new Error('Falha ao buscar os filmes');
  }

  const data = await res.json();
  const movieDetails = data;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container">
      {movieDetails.poster_path || movieDetails.title || movieDetails.date || movieDetails.overview || movieDetails.vote_average ? (
        <div className={styles.wrapper}>
          {movieDetails.poster_path && (
            <Image className={styles.image}
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              width={200}
              height={300}
            />
          )}

          <div className={styles.details}>
            <h1 className={styles.title}>{movieDetails.title}</h1>
            <div>
              <div className={styles.releaseDate}>
                Data de Lançamento: {formatDate(movieDetails.date)}
              </div>
              <div className={styles.voteAverage}>
                Avaliação: {movieDetails.vote_average}
              </div>
              <p className={styles.overview}>Descrição: <br /> {movieDetails.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Detalhes do filme não encontrados.</p>
      )}
    </div>
  );
}
