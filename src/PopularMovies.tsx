import React, { useEffect, useState, useRef } from 'react';

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const fetchMovies = async () => {
    try {
      const apiKey = '551ff69fc7ffe6c4365e735d758cd550'; // Replace with your actual API key
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleScrollToNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += containerRef.current.offsetWidth;
    }
  };

  const handleScrollToPrevious = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
    }
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      <div style={{ position: 'relative', height: '300px' }}>
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            overflowX: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {movies.map((movie: any) => (
            <div
              key={movie.id}
              style={{ flex: '0 0 auto', width: '200px', margin: '0 10px', position: 'relative' }}
            >
              <h3
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginBottom: '5px',
                }}
              >
                {movie.title}
              </h3>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
              <p style={{ marginTop: '5px', fontSize: '14px' }}>{movie.release_date}</p>
            </div>
          ))}
        </div>

        <button
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.3)',
            border: 'none',
            borderRadius: '50%',
            color: '#fff',
            padding: '15px', // Increased button size
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onClick={handleScrollToPrevious}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
          }}
        >
          &lt;
        </button>

        <button
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.3)',
            border: 'none',
            borderRadius: '50%',
            color: '#fff',
            padding: '15px', // Increased button size
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onClick={handleScrollToNext}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PopularMovies;
