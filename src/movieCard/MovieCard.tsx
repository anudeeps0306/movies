import React, { useState } from 'react';

const MovieCard: React.FC<{ movie: any }> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getZoomedStyles = () => {
    if (isHovered) {
      return {
        transform: 'scale(1.1)',
        zIndex: 1,
        height: '100%',
      };
    }
    return {};
  };

  return (
    <div
      key={movie.id}
      style={{
        flex: '0 0 auto',
        width: '150px',
        margin: '0 10px',
        position: 'relative',
        ...getZoomedStyles(),
        height: '200px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            maxHeight: '100%',
          }}
        />
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '150px',
              padding: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              zIndex: 2,
            }}
          >
            <h3
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginBottom: '5px',
                fontSize: '12px',
              }}
            >
              {movie.title}
            </h3>
            <p style={{ marginBottom: '5px' }}>
              Original Language: {movie.original_language}
            </p>
            <p style={{ marginBottom: '5px' }}>
              Vote Average: {movie.vote_average}
            </p>
            <p style={{ marginBottom: '5px' }}>
              Vote Count: {movie.vote_count}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
