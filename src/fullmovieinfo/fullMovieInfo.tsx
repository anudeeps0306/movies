import { getSingleMovie } from '@/api/movieApi';
import React, { useEffect, useState } from 'react';

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
}

const [data, setData] = useState<Movie | null>(null);

const getMovieDetails = async (movieId: string) => {
    try {
        const data = await getSingleMovie(movieId);
        setData(data);
        console.log(data);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

const MovieDetailsPage: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {

    getMovieDetails("385687");
  }, []);

  const handleButton = () => {
    getMovieDetails("385687");
    console.log("data",data);
  };


  return (
    <div>
        Home
        <button onClick={handleButton}>Get</button>

        <div>
            <h1>home</h1>
        </div>

    </div>

    
    // <div className="movie-details-page">
    //   <div className="content">
    //     <div className="poster">
    //       <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    //     </div>
    //     <div className="details">
    //       <h1 className="title">{movie.title}</h1>
    //       <div className="metadata">
    //         <div className="metadata-item">
    //           <i className="fas fa-calendar-alt"></i>
    //           <span>{movie.release_date}</span>
    //         </div>
    //         <div className="metadata-item">
    //           <i className="fas fa-star"></i>
    //           <span>{movie.vote_average}</span>
    //         </div>
    //         <div className="metadata-item">
    //           <i className="fas fa-film"></i>
    //           <span>{movie.genres.map((genre) => genre.name).join(', ')}</span>
    //         </div>
    //       </div>
    //       <p className="overview">{movie.overview}</p>
    //       <div className="links">
    //         <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
    //           Visit Homepage
    //         </a>
    //         <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">
    //           View on IMDb
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default MovieDetailsPage;
