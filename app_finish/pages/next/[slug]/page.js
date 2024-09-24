import DetailedMovie from "../../../components/DetailedMovie";

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
    <DetailedMovie banner={movieDetails.poster_path} title={movieDetails.title} date={formatDate(movieDetails.release_date)} overview={movieDetails.overview} vote_average={movieDetails.vote_average} />
  );
}
