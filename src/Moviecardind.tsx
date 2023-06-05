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
  }
  
  const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  
    return (
      <div className="max-w-xs rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{movie.original_title}</div>
          <p className="text-gray-700 text-base">{movie.release_date}</p>
        </div>
      </div>
    );
  };

export default MovieCard;
  