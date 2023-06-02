import React, { useState } from 'react';
import { useAppSelector } from '../redux/store';
import { searchMovies } from '../api/movies';
import MovieCard from './Moviecardind';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  // Add more fields as needed
}

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(0); // Track total number of pages
  
    const authInfo = useAppSelector(state => state.auth.authInfo);
  
    const handleSearch = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        const searchResults = await searchMovies(query);
        setMovies(searchResults.results);
        setTotalPages(searchResults.total_pages);
        setPage(1); // Reset page to 1 after each search
      } catch (error) {
        console.error('Error searching movies:', error);
        setMovies([]);
        setTotalPages(0);
        setPage(1);
      }
    };
  
    const handleNextPage = () => {
      if (page < totalPages) {
        setPage(prevPage => prevPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (page > 1) {
        setPage(prevPage => prevPage - 1);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))} */}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
export default SearchBar;
  