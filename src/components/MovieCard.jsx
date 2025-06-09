import React, { useState } from 'react'

const MovieCard = ({movie: {title , vote_average, poster_path, release_date, original_language, overview}}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      className='movie-card group relative overflow-hidden'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} 
        alt={title} 
        className={`transition duration-300 w-full h-auto rounded-lg ${hovered ? 'blur-sm scale-105' : ''}`}
      />
      {/* Description overlay */}
      <div 
        className={`absolute inset-0 flex items-center justify-center bg-black/70 px-4 text-white text-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <p className="line-clamp-5 text-sm md:text-base">{overview || 'No description available.'}</p>
      </div>
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard