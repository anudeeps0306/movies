import React, { useEffect, useState, useRef } from 'react';
import Skeleton from './Skeleton';
import { fetchMovies } from '../../api/movieApi';
import MovieCard from '../movieCard/MovieCard';

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [movieIds, setMovieIds] = useState(new Set<number>());
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const getListOfMovies = async () => {
    try {
      const data = await fetchMovies(currentPage);
      console.log(data);
      if (data.results.length > 0) {
        const filteredMovies = data.results.filter(
          (movie: any) => !movieIds.has(movie.id)
        );
        setMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
        filteredMovies.forEach((movie: any) => movieIds.add(movie.id));
        setCurrentPage((prevPage) => prevPage + 1);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    getListOfMovies();
  }, []);

  const handleLoadMore = () => {
    getListOfMovies();
  };

  return (
    <div>
      <div className='flex flex-row justify-between'>
  <h1 className='flex'>Popular Movies</h1>
  <button className='flex' onClick={handleLoadMore}>Load More</button>
</div>

      <div
        style={{
          position: 'relative',
          height: '400px',
          overflow: 'hidden',
        }}
        ref={containerRef}
      >
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
              overflowX: 'auto',
              position: 'absolute',
              height: '100%',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                style={{
                  flex: '0 0 auto',
                  width: '200px',
                  margin: '0 10px',
                  position: 'relative',
                }}
              >
                <Skeleton />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
              overflowX: 'auto',
              position: 'absolute',
              height: '100%',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            overflowX: 'auto',
            position: 'absolute',
            height: '100%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
            {movies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}

            </div>
          </div>
        )}
        <style>{`
          ::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PopularMovies;
