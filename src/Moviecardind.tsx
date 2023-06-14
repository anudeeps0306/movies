import React from 'react';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  original_title: string;
}

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <button onClick={onClick}>
     <div className="flex flex-row items-center justify-center px-4 py-2 gap-1 w-auto">
      <img className="w-6 h-6 mr-2" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
      <div className="flex font-bold text-xs mb-1">{movie.original_title}</div>
      <p className="flex flex-end justify-end items-end text-gray-700 text-sm">{movie.release_date}</p>
    </div>


    </button>
  );
};

export default MovieCard;
