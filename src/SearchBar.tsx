import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/store';
import { searchMovies } from '../api/movieApi';
import MovieCard from './Moviecardind';
import data from './data.json';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  original_title: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [arraymovies, setArrayMovies] = useState<Movie[]>([]);
  const [cursor, setCursor] = useState(false);
  const [placeholder, setPlaceHolder] = useState('Movies');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const authInfo = useAppSelector(state => state.auth.authInfo);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const searchResults = await searchMovies(query);
      setArrayMovies(searchResults);
      setSelectedMovie(null); // Reset the selected movie
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleClick = (movie: Movie) => {
    setSelectedMovie(movie);

    // Reset the search results
    setArrayMovies([]);
    setQuery('');
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex w-full max-w-sm items-center space-x-">
        <input
          type="text"
          placeholder={selectedMovie ? selectedMovie.original_title : placeholder}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <form onSubmit={handleSearch}>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-col" style={{ maxHeight: "350px", overflowY: "scroll" }}>
        {arraymovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => handleClick(movie)} // Pass the reference to the handleClick function
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
