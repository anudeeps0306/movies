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
  onClick: () => void; // Click event handler
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <button onClick={onClick}>
      <div className="flex flex-row items-center justify-center px-6 py-4 gap-2 w-auto">
        <div className="flex font-bold text-m mb-2">{movie.original_title}</div>
        <p className="flex flex-end justify-end items-end text-gray-700 text-base">{movie.release_date}</p>
      </div>
    </button>
  );
};

export default MovieCard;
