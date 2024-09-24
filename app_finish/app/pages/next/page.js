"use client";

import { useEffect, useState } from "react";
import Card from "../../components/Card";

export default function NextPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=pt-BR&page=1`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiKey]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            banner={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            date={formatDate(movie.release_date)}
          />
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}
