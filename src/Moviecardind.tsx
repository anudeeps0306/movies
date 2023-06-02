"use client";

import React, { useState, useEffect } from 'react';
interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
}


interface MovieCardProps {
    movie: Movie;
  }
  
  const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
  
    useEffect(() => {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.src = movie.poster_path;
    }, [movie.poster_path]);
  
    return (
      <div className="max-w-xs rounded overflow-hidden shadow-lg">
        <div className="relative h-48">
          {imageLoaded ? (
            <img className="object-cover w-full h-full" src={movie.poster_path} alt={movie.title} />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <span>Loading...</span>
            </div>
          )}
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{movie.title}</div>
          <p className="text-gray-700 text-base">{movie.release_date}</p>
          <p className="text-gray-700 text-base">{movie.overview}</p>
        </div>
      </div>
    );
  };

export default MovieCard;
  