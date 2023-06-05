import React, { useState } from 'react';
import { useAppSelector } from '../redux/store';
import { searchMovies } from '../api/movies';
import MovieCard from './Moviecardind';
import data from './data.json'

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  original_title: string;
}

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [arraymovies, setArrayMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); 
  
    const authInfo = useAppSelector(state => state.auth.authInfo);
  
    const handleSearch = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
       
        const searchResults = data;
        setArrayMovies(data);
  
        console.log(data);
        setPage(1); 
      } catch (error) {
        console.error('Error searching movies:', error);
        setMovies([]);
        setTotalPages(0);
        setPage(1);
      }
    };
  
   
  
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Movies"
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
        
        <div className="flex flex-col" style={{ maxHeight: "500px", overflowY: "scroll" }}>
          {arraymovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

      
      </div>
    );
  };
  
export default SearchBar;
  