"use client";
import { getSingleMovie } from '@/api/movieApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  overview: string;
  homepage: string;
  imdb_id: string;
  poster_path: string;
  backdrop_path: string;
  production_companies: { id: number; name: string; logo_path: string | null; origin_country: string }[];
}

interface paramsProps {
  movieId: string;
}

const MovieDetailsPage: React.FC<paramsProps> = ({params}) => {

  const movieId = params.movieId;

  const [movie, setMovie] = useState<Movie | null>(null);

  const getMovieDetails = async (id: string) => {
    try {
      const data = await getSingleMovie(id);
      setMovie(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    if (movieId) {
      getMovieDetails(movieId as string);
    }
  }, [movieId]);

  return (
    <div className="movie-details-page">
      {movie && (
        <>
          <div className="banner">
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
            <div className="overlay"></div>
          </div>

          <div className="content">
            <div className="poster">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="details">
              <h1 className="title">{movie.title}</h1>
              <div className="metadata">
                <div className="metadata-item">
                  <i className="fas fa-calendar-alt"></i>
                  <span>{movie.release_date}</span>
                </div>
                <div className="metadata-item">
                  <i className="fas fa-star"></i>
                  <span>{movie.vote_average}</span>
                </div>
                <div className="metadata-item">
                  <i className="fas fa-film"></i>
                  <span>{movie.genres.map((genre) => genre.name).join(', ')}</span>
                </div>
              </div>
              <p className="overview">{movie.overview}</p>
              <div className="links">
                <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                  Visit Homepage
                </a>
                <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">
                  View on IMDb
                </a>
              </div>
            </div>
          </div>

          <div className="production-companies">
            {movie.production_companies.map((company) => (
              <div className="company" key={company.id}>
                {company.logo_path ? (
                  <img src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} alt={company.name} />
                ) : (
                  <span>{company.name}</span>
                )}
              </div>
            ))}
          </div>

          {/* Add trailer link here */}
          {/* <div className="trailer">
            <a href={`https://www.youtube.com/watch?v=${movie.trailer_id}`} target="_blank" rel="noopener noreferrer">
              Watch Trailer
            </a>
          </div> */}
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
